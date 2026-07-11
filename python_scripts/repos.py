import requests
import os
import yaml

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(DIR, "_data", "repositories.yml"), "r") as f:
    data = yaml.safe_load(f)
repo_to_img = dict()
for item in data["github_repo_images"]:
    repo_to_img[item["name"]] = item["image"]
# icon='<i class="fa-brands fa-github" style="color:#420dab"></i>'
icon = (
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo mr-1 tmp-mr-1">'
    '<path fill="var(--global-tip-block)" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>'
    "</svg>"
)
repo_html = (
    '<div class="card mt-3 p-3" style="border-radius:1rem;border:1px solid var(--global-text-color);background:var(--global-pure-theme-color);">\n'
    "    MAYBE_IMAGE\n"
    '    <table class="table table-cv table-sm table-borderless table-responsive table-cv-map table-dark">\n'
    "        <tbody>\n"
    '            <tr> <td class="p-1 pl-2 font-weight-bold">' + icon + '&nbsp;<a href="URL"><b>TITLE</b></a></td></tr>\n'
    '            <tr> <td class="p-1 pl-2 text"> DESCRIPTION </td> </tr>\n'
    '            <tr> <td class="p-1 pl-2 text"> LANGUAGES </td> </tr>\n'
    "        </tbody>\n"
    "    </table>\n"
    "</div>"
)

generated_stuff = ""
for repo in data["github_repos"]:
    print("reading", repo)
    url = f"https://github.com/{repo}"
    response = requests.get(url)

    s = response.text
    # get description from description meta tag
    description = "no description provided"
    while "<meta" in s:
        s = s[s.index("<meta") :]
        meta_tag = s[: 1 + s.index(">")]
        s = s[1 + s.index(">") :]
        if 'property="og:title"' in meta_tag:
            st_str = f'content="GitHub - {repo}: '
            if st_str in meta_tag:
                description = meta_tag[meta_tag.index(st_str) + len(st_str) : meta_tag.index('" />')]
    # get languages list from html
    # pattern is <div ...> <h2 class="h4 tmp-mb-3">Languages</h2> .... </div>
    temp = response.text[response.text.index('<h2 class="h4 tmp-mb-3">Languages</h2>') :]
    i = 0
    while temp[:i].count("</div") <= temp[:i].count("<div"):
        i += 1
    languages_html_og = temp[:i]
    languages_html_og = languages_html_og[languages_html_og.index("<ul") : languages_html_og.index("</ul>") + 5]

    languages = []
    # split by list elements
    for item in languages_html_og.split("</li>")[:-1]:
        # start with start of list item, remove this tag
        item = item[item.index("<li") + 3 :]
        while item.index(">") < item.index("<"):
            item = item[1:]

        item = item.replace("<a ", "<span ").replace("</a>", "</span>").strip()
        assert item.startswith("<span ")
        item = item[:6] + 'style="margin-right: 16px;" ' + item[6:]

        fill = item[item.index('style="color:') + len('style="color:') :]
        fill = fill[: fill.index(";")]
        item = item.replace("></path>", f' fill="{fill}"></path>')
        item = item.replace("<svg ", "<span><svg ").replace("</svg>", "</svg></span>")

        # remove line breaks
        item = item.replace("\n", " ")
        # remove double whitespace
        while "  " in item:
            item = item.replace("  ", " ")
        languages.append(item)
    languages_html = '<div class="list-groups">'
    long_languages = ("JavaScript",)
    while languages:
        if len(languages) == 1:
            width = 12
            batch = 1
        elif any(any(l in ll for ll in languages[:3]) for l in long_languages) or len(languages) == 2:
            width = 6
            batch = 2
        else:
            batch = 3
            width = 4

        for _ in range(batch):
            languages_html = (
                languages_html + f' <div class="list-group col-md-{width}" style="margin-bottom:0px">{languages.pop(0)}</div>'
            )
            if not languages:
                break

    languages_html += "</div>"

    full_thing = (
        repo_html.replace("TITLE", repo)
        .replace("DESCRIPTION", description)
        .replace("LANGUAGES", languages_html)
        .replace("URL", url)
    )
    if repo in repo_to_img:
        img_src = repo_to_img[repo]
        thing = (
            "{%"
            " include figure.liquid"
            ' loading="eager"'
            f' path="{img_src}"'
            ' sizes = "200px"'
            ' class="preview z-depth-1"'
            " zoomable=true"
            " avoid_scaling=true"
            f' alt="{img_src}"'
            " %}"
        )
        full_thing = full_thing.replace("MAYBE_IMAGE", thing)
    else:
        full_thing = full_thing.replace("MAYBE_IMAGE", "")
    # clear any empty lines
    while " \n" in full_thing:
        full_thing = full_thing.replace(" \n", "\n")
    full_thing = full_thing.replace("\n\n", "\n")
    full_thing = f'<div class="list-group col-md-6">\n    {full_thing.replace("\n", "\n    ")}\n</div>\n'
    generated_stuff += full_thing
generated_stuff = (
    f'<div class="repositories d-flex flex-wrap flex-md-row '
    f"flex-column justify-content-between align-items-center "
    f'permute-children list-groups">\n    {generated_stuff.replace("\n", "\n    ").strip()}\n</div>\n'
)

page = (
    "---\n"
    "layout: page # DONT EDIT THIS FILE DIRECLTY! this was generated with repos.py, edit that instead\n"
    "permalink: /repos/\n"
    "title: repositories\n"
    "description: github repositories # Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.\n"
    "nav: true\n"
    "nav_order: 3\n"
    "og_image: /assets/img/cool_bunny.jpg\n"
    "remove_dead_pixel: false\n"
    "---\n"
    "## github repositories\n" + generated_stuff
)

with open(os.path.join(DIR, "_pages", "repos.md"), "w", encoding="utf-8") as f:
    f.write(page)
