#!/usr/bin/env python3
"""Structural checks for published files, routes and bilingual paper data."""
import json,re,sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.refs=[];self.routes=[];self.assets=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if 'id' in d:self.ids.append(d['id'])
        if 'data-open' in d:self.routes.append(d['data-open'])
        if 'data-news' in d:self.routes.append(d['data-news'])
        for attr in ['src','href','data-icon']:
            if d.get(attr):self.refs.append(d[attr])
        if tag=='img' and 'alt' not in d:raise AssertionError('Image without alt')
p=Page();p.feed((ROOT/'index.html').read_text())
assert len(p.ids)==len(set(p.ids)), 'Duplicate IDs'
assert all(r in p.ids for r in p.routes), 'Broken window/news target'
routes={'profile','research','publications','activities','cv','contact'}
for ref in p.refs:
    if ref.startswith('#'):assert unquote(ref[1:]) in set(p.ids)|routes, ref
    elif not urlsplit(ref).scheme:
        assert (ROOT/unquote(urlsplit(ref).path)).is_file(), ref
for css in (ROOT/'assets').rglob('*.css'):
    for ref in re.findall(r'url\([\"\']?([^\)\"\']+)',css.read_text()):
        if not ref.startswith(('data:','http')):assert (css.parent/ref).is_file(),ref
papers=json.loads((ROOT/'data/publications.json').read_text())
assert len({p['doi'].lower() for p in papers})==len(papers)
for paper in papers:
    assert paper['title_zh']!=paper['title'] and paper['summary_zh']!=paper['summary'],paper['id']+' missing translation'
    assert paper['authors'] and 'Jiaying Peng' in paper['authors'],paper['id']
    assert ('doi = {'+paper['doi']+'}') in (ROOT/'citations'/f"{paper['id']}.bib").read_text()
assert 'https://raw.githubusercontent.com' not in (ROOT/'index.html').read_text()
print(f'PASS: {len(p.ids)} unique IDs, {len(papers)} bilingual papers, local resources and routes.')
