import requests
import os
import yaml

DIR=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(DIR,'_data','repositories.yml'),'r') as f:
    data=yaml.safe_load(f)
repo_html="""
<div class="card mt-3 p-3">
    <table class="table table-cv table-sm table-borderless table-responsive table-cv-map table-dark"> 
        <tbody>
            <tr> <td class="p-1 pl-2 font-weight-bold"><b> TITLE </b></td> </tr> 
            <tr> <td class="p-1 pl-2 text"> DESCRIPTION </td> </tr>
            <tr> <td class="p-1 pl-2 text"> LANGUAGES </td> </tr>
        </tbody>
    </table> 
</div>"""
generated_stuff=''
for repo in data['github_repos']:
    print(repo)
    url = f'https://github.com/{repo}'
    response = requests.get(url)

    s=response.text
    meta_tags=[]
    while '<meta' in s:
        s=s[s.index('<meta'):]
        meta_tags.append(s[:1+s.index('>')])
        s=s[1+s.index('>'):]

    description=None
    for item in meta_tags:
        if 'name="description"' in item:
            description=item[item.index('content="')+9:]
            description=description[:description.index(f' - {repo}"')]


    # pattern is <div ...> <h2 class="h4 tmp-mb-3">Languages</h2> .... </div>
    temp=response.text[response.text.index('<h2 class="h4 tmp-mb-3">Languages</h2>'):]
    i=0
    while temp[:i].count('</div')<=temp[:i].count('<div'):
        i+=1
    languages_html_og= temp[:i]
    languages_html_og= languages_html_og[languages_html_og.index('<ul'):languages_html_og.index('</ul>') + 5]
    fill= languages_html_og[languages_html_og.index('style="color:') + len('style="color:'):]
    fill=fill[:fill.index(';')]
    languages_html_og=languages_html_og.replace('></path>', f' fill="{fill}"></path>')

    temp=languages_html_og
    languages=[]
    while '<li class="d-inline">' in temp:
        temp=temp[temp.index('<li class="d-inline">')+len('<li class="d-inline">'):]
        temp=temp[:temp.index('</li>')].strip()
        # remove <a> tag
        temp=temp[temp[1:].index('>')+2:temp.index('</a>')].strip()
        languages.append(temp)
    print(languages_html_og)
    for item in languages:
        print(item)
    languages_html='<table><tbody><tr><td>'+'</td><td>'.join(languages)+'</td></tr></tbody></table>'

    full_thing=repo_html.replace("TITLE",repo).replace("DESCRIPTION",description).replace("LANGUAGES",languages_html)
    full_thing=f'<div class="list-group col-md-6"><a href="{url}">{full_thing}</a></div>\n'
    print(description)
    generated_stuff+=full_thing
print("GENERATING")
generated_stuff=(f'<div class="repositories d-flex flex-wrap flex-md-row '
                 f'flex-column justify-content-between align-items-center '
                 f'silly-permute-children list-groups" '
                 f'silly-permute-repeat-after="6969">\n{generated_stuff}\n</div>')
print(generated_stuff)

page="""---
layout: page
permalink: /repos/
title: repositories
description: github repositories # Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.
nav: true
nav_order: 3
og_image: /assets/img/cool_bunny.jpg
remove_dead_pixel: false
---
## github repositories
"""+generated_stuff
with open(os.path.join(DIR,"_pages","my_repos.md"),'w',encoding='utf-8') as f:
    f.write(page)


