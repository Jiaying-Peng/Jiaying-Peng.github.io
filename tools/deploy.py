#!/usr/bin/env python3
"""CloudCone: validate a fetched master snapshot, publish atomically, roll back on failure."""
import fcntl, hashlib, os, shutil, subprocess, sys, tarfile, tempfile
from pathlib import Path
BASE=Path('/srv/jiaying-site')
REPO=BASE/'repository'
DOMAIN='jiaying.minions.cyou'
def run(*args, **kwargs):return subprocess.run(args,check=True,**kwargs)
def output(*args):return subprocess.check_output(args,text=True).strip()
def point(target, link):
    temporary=link.with_name(link.name+'.next')
    temporary.unlink(missing_ok=True)
    temporary.symlink_to(target)
    os.replace(temporary,link)
def verify(site):
    page=subprocess.check_output(['curl','--fail','--silent','--show-error','--max-time','20','--resolve',DOMAIN+':443:127.0.0.1','https://'+DOMAIN+'/'])
    if hashlib.sha256(page).digest()!=hashlib.sha256((site/'index.html').read_bytes()).digest():raise RuntimeError('Origin content does not match candidate release')
BASE.mkdir(parents=True,exist_ok=True)
with (BASE/'deploy.lock').open('w') as lock:
    try:fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
    except BlockingIOError:raise SystemExit('Deployment already running')
    run('git','-C',str(REPO),'fetch','--quiet','origin','master')
    commit=output('git','-C',str(REPO),'rev-parse','origin/master')
    release=BASE/'releases'/commit
    current=BASE/'current'
    previous=current.resolve() if current.is_symlink() else None
    if previous==release:
        verify(release);print('Already current:',commit);raise SystemExit(0)
    with tempfile.TemporaryDirectory(prefix='candidate-',dir=BASE) as tmp:
        candidate=Path(tmp)/'source';candidate.mkdir()
        archive=Path(tmp)/'source.tar'
        run('git','-C',str(REPO),'archive','--format=tar','--output='+str(archive),commit)
        with tarfile.open(archive) as tar:
            for member in tar.getmembers():
                if member.issym() or member.islnk() or '..' in Path(member.name).parts or member.name.startswith('/'):raise RuntimeError('Unsupported archive entry')
            tar.extractall(candidate)
        run('python3','tools/build.py','--check',cwd=candidate)
        run('python3','tools/check.py',cwd=candidate)
        public=Path(tmp)/'public';public.mkdir()
        for filename in ['index.html','robots.txt','sitemap.xml','LICENSE']:
            shutil.copy2(candidate/filename,public/filename)
        for directory in ['assets','citations']:
            shutil.copytree(candidate/directory,public/directory)
        (public/'version.txt').write_text(commit+'\n')
        for path in public.rglob('*'):path.chmod(0o755 if path.is_dir() else 0o644)
        public.chmod(0o755)
        release.parent.mkdir(exist_ok=True)
        if not release.exists():os.replace(public,release)
    point(release,current)
    try:
        if '--bootstrap' not in sys.argv:verify(release)
    except Exception:
        if previous:point(previous,current)
        print('Verification failed; restored previous release.',file=sys.stderr)
        raise
    if previous and previous!=release:point(previous,BASE/'previous')
    print('Published:',commit)
