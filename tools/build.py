#!/usr/bin/env python3
"""Render committed static pages from verified publication data. No network access."""
from pathlib import Path
import html, json, re, sys
ROOT = Path(__file__).resolve().parents[1]
def esc(x): return html.escape(str(x), quote=True)
def local(en, zh, tag='span', attrs=''):
    return f'<{tag} data-en="{esc(en)}" data-zh="{esc(zh)}" {attrs}>{esc(en)}</{tag}>'
def render():
    papers=json.loads((ROOT/'data/publications.json').read_text())
    output={}; featured=[p for p in papers if p['featured']]
    roles={'FIRST AUTHOR':'第一作者','CO-FIRST AUTHOR':'共同第一作者','CO-AUTHOR':'合作作者'}
    def title(p, tag='span'): return local(p['title'],p['title_zh'],tag)
    def summary(p): return local(p['summary'],p['summary_zh'],'p')
    def meta(p):
        parts=[str(p['year'])]
        if p['volume']: parts.append(p['volume']+(f"({p['issue']})" if p['issue'] else ''))
        if p['pages']:parts.append(p['pages'])
        return f'<em>{esc(p["journal_short"])}</em> · '+', '.join(parts)
    def links(p):return f'<div class="paper-actions"><a href="https://doi.org/{esc(p["doi"])}" target="_blank" rel="noopener">DOI ↗</a><a href="citations/{p["id"]}.bib" download>BibTeX ↓</a><a href="#{p["id"]}">{local("Permalink","直达链接")}</a></div>'
    def bib(p):
        m=json.loads((ROOT/('data/crossref-'+p['doi'].split('/')[-1]+'.json')).read_text())
        fields={'title':'{'+p['title']+'}','author':' and '.join(a['family']+', '+a.get('given','') for a in m['author']),'journal':p['journal'],'year':str(p['year']),'doi':p['doi'],'url':'https://doi.org/'+p['doi']}
        for k,v in [('volume',p['volume']),('number',p['issue']),('pages',p['pages'])]:
            if v: fields[k]=v.replace('-','--') if k=='pages' else v
        return '@article{Peng'+str(p['year'])+p['id'].replace('pub-','')+',\n'+',\n'.join('  '+k+' = {'+v+'}' for k,v in fields.items())+'\n}\n'
    for p in papers:output['citations/'+p['id']+'.bib']=bib(p)
    output['citations/publications.bib']='\n'.join(bib(p) for p in papers)
    groups=[]
    for group, label, role in [('lead-author-papers','Lead-author Papers',False),('collaborative-papers','Collaborative Papers',True)]:
        groups.append(f'<div class="output-group" id="{group}"><img src="assets/icons/folder-open-16x16.svg" alt=""><strong>{label}</strong></div>')
        for p in papers:
            if (p['role']=='CO-AUTHOR') != role:continue
            author=', '.join(p['authors'])
            groups.append(f'''<article class="publication-file paper-record" id="{p['id']}" tabindex="-1" role="listitem">
              <div class="file-copy"><h3><a href="https://doi.org/{p['doi']}" target="_blank" rel="noopener">{title(p)}</a></h3>
              <p class="paper-meta">{meta(p)} {local(p['role'],roles[p['role']],'b','class="output-badge"')} {local('COVER ARTICLE','封面论文','b','class="output-badge cover"') if p['cover'] else ''}</p>
              <details><summary>{local('Authors & citation','作者与引用')}</summary><p class="paper-authors">{esc(author)}</p><p>{esc(p['journal'])}. {p['year']}. DOI: {esc(p['doi'])}</p></details>
              {summary(p)}{links(p)}</div></article>''')
    topics={'pub-2026':('Multi-channel ion transport','多通道离子传输'),'pub-2025':('Sustainable zinc electrolytes','可持续锌电解质'),'pub-2024':('Nanofibers for solid-state batteries','用于固态电池的纳米纤维')}
    highlights='<section class="research-highlights"><h2>'+local('Selected research','代表研究')+'</h2><div class="highlight-grid">'
    for p in featured:
        en,zh=topics[p['id']]
        highlights+=f'''<article class="highlight-card"><a href="#{p['id']}"><img src="assets/figures/{p['id']}.svg" alt="" width="300" height="126"><span class="highlight-journal">{esc(p['journal_short'])} · {p['year']}</span>{local(en,zh,'h3')}</a>{local('First author','第一作者','small')}</article>'''
    highlights+='</div>'+local('Concept illustrations · not experimental data','概念示意图 · 非实验数据','p','class="figure-note"')+'</section>'
    updates=''.join(f'<article class="home-update"><time datetime="{p["year"]}">{p["year"]}</time><div><strong>{esc(p["journal_short"])}</strong>{summary(p)}<a href="#{p["id"]}">{local("Read this study →","查看研究 →")}</a></div></article>' for p in featured[:1])
    news_buttons=''.join(f'<button class="news-item {"is-selected" if i==0 else ""}" type="button" data-news="news-{p["id"]}" aria-pressed="{str(i==0).lower()}"><span>{p["year"]} · {esc(p["journal_short"])}</span><strong>{title(p)}</strong></button>' for i,p in enumerate(featured))
    news_panels=''.join(f'<div id="news-{p["id"]}" class="news-panel {"is-active" if i==0 else ""}">{title(p,"h2")}<p class="news-meta">{meta(p)}</p>{summary(p)}{links(p)}</div>' for i,p in enumerate(featured))
    cv=''.join(f'<li><strong>{esc(p["journal_short"])}</strong> ({p["year"]}). {title(p)} {local(p["role"],roles[p["role"]])}. <a href="https://doi.org/{p["doi"]}">DOI ↗</a></li>' for p in papers if p['role']!='CO-AUTHOR')
    structured={'@context':'https://schema.org','@type':'ProfilePage','url':'https://jiaying.minions.cyou/','mainEntity':{'@type':'Person','name':'Jiaying Peng','url':'https://jiaying.minions.cyou/','sameAs':['https://orcid.org/0009-0003-4482-2145','https://scholar.google.com/citations?user=eQFT3u4AAAAJ']}}
    replacements={'HIGHLIGHTS':highlights,'HOME_UPDATES':updates,'PUBLICATIONS':'\n'.join(groups),'NEWS_BUTTONS':news_buttons,'NEWS_PANELS':news_panels,'CV_PUBLICATIONS':cv,'OUTPUT_COUNT':str(len(papers)+2),'LEAD_COUNT':str(sum(p['role']!='CO-AUTHOR' for p in papers)),'STRUCTURED_DATA':'<script type="application/ld+json">'+json.dumps(structured,ensure_ascii=False).replace('<','\\u003c')+'</script>'}
    s=(ROOT/'templates/index.html').read_text()
    for key,value in replacements.items():s=s.replace('{{'+key+'}}',value)
    assert not re.search(r'\{\{[A-Z_]+\}\}',s)
    output['index.html']=s
    output['assets/js/publications-i18n.js']='// Generated by tools/build.py\nwindow.publicationTranslations = '+json.dumps({f'{len(papers)+2} selected object(s)':f'已选择 {len(papers)+2} 个对象',f'{sum(p["role"]!="CO-AUTHOR" for p in papers)} selected':f'已选择 {sum(p["role"]!="CO-AUTHOR" for p in papers)} 项'},ensure_ascii=False)+';\n'
    output['robots.txt']='User-agent: *\nAllow: /\nSitemap: https://jiaying.minions.cyou/sitemap.xml\n'
    output['sitemap.xml']='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://jiaying.minions.cyou/</loc></url></urlset>\n'
    return output
if __name__=='__main__':
    stale=[]
    for file,content in render().items():
        path=ROOT/file
        if '--check' in sys.argv:
            if not path.exists() or path.read_text()!=content:stale.append(file)
        else:path.parent.mkdir(parents=True,exist_ok=True);path.write_text(content)
    if stale:raise SystemExit('Generated files out of date: '+', '.join(stale))
    print('Generated content verified.' if '--check' in sys.argv else 'Static site generated.')
