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
    '<div class="card mt-3 p-3" style="border-radius:1rem;border:1px solid var(--global-text-color);background:var(--global-pure-theme-color);" EXTRA_ATTRIBUTES>\n'
    "    MAYBE_IMAGE\n"
    '    <table class="table table-cv table-sm table-borderless table-responsive table-cv-map table-dark">\n'
    "        <tbody>\n"
    '            <tr> <td class="p-1 pl-2 font-weight-bold">' + icon + '&nbsp;<a href="URL"><b>TITLE</b></a></td></tr>\n'
    '            <tr> <td class="p-1 pl-2 text"> DESCRIPTION </td> </tr>\n'
    '            <tr> <td class="p-1 pl-2 text"> <div class="list-groups"> LANGUAGES </div> </td> </tr> \n'
    "        </tbody>\n"
    "    </table>\n"
    "</div>"
)

generated_stuff = ""
for repo in data["github_repos"]:
    print("reading", repo)
    main_json = requests.get(f"https://api.github.com/repos/{repo}").json()

    # get description from api call
    description = main_json.get("description", "no description provided")
    if description is None:
        description = "no description provided"
    if repo == "pranavraj575/pranavraj575.github.io" and description == "no description provided":
        description = "You're looking at it"
    # get languages list from api call
    mx_nm = 8
    long_languages = ("JavaScript",)
    lang_to_color = {
        "JavaScript": "rgb(241, 224, 90)",
        "Julia": "rgb(162, 112, 186)",
        "Python": "rgb(53, 114, 165)",
        "TypeSpec": "rgb(74, 54, 101)",
        "HTML": "rgb(227, 76, 38)",
        "CSS": "rgb(102, 51, 153)",
        "Other": "rgb(237, 237, 237)",
        "Shell": "rgb(137, 224, 81)",
        "TeX": "rgb(61, 97, 23)",
        "Ruby": "rgb(112, 21, 22)",
        "SCSS": "rgb(198, 83, 140)",
        "Liquid": "rgb(103, 184, 222)",
    }
    languages = requests.get(f"https://api.github.com/repos/{repo}/languages").json()

    languages = {k: v / sum(vp for _, vp in languages.items()) for k, v in languages.items()}
    if len(languages) > mx_nm:
        keys = sorted(languages.keys(), key=lambda lg: -languages[lg])
        languages = {k: languages[k] for k in keys[: mx_nm - 1]}
    sml_langages = {k: v for k, v in languages.items() if v < 0.0005}
    if len(sml_langages) > 1:
        languages = {k: v for k, v in languages.items() if v >= 0.0005}
    if sum(vp for _, vp in languages.items()) < 0.9995:
        languages["Other"] = 1 - sum(vp for _, vp in languages.items())
    languages = {k: round(v * 100, 1) for k, v in languages.items()}
    for lg in sorted(languages.keys(), key=lambda lg: -languages[lg]):
        if round(sum(vp for _, vp in languages.items()), 1) == 100:
            break

        if sum(vp for _, vp in languages.items()) < 100:
            languages[lg] += 0.1
        else:
            languages[lg] -= 0.1

    languages = {k: round(v, 1) for k, v in languages.items()}
    languages_html = ""
    keys = sorted(languages.keys(), key=lambda lg: 69 if lg == "Other" else -languages[lg])
    if any(l in keys for l in long_languages):
        width = 6
    else:
        width = 4
    while keys:
        if len(keys) == 1:
            width = 12

        lg = keys.pop(0)
        col = lang_to_color.get(lg, "#000000")

        inner_stuff = f'<span style="margin-right: 16px;display:inline-flex;" class="d-inline-flex flex-items-center flex-nowrap text-small tmp-mr-3"> <span><svg style="color:{col};" aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-dot-fill mr-2 tmp-mr-2"> <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" fill="{col}"></path> </svg></span> <span class="color-fg-default text-bold mr-1">{lg}</span> <span>{languages[lg]}%</span> </span>'
        languages_html = languages_html + f' <div class="list-group col-md-{width}" style="margin-bottom:0px">{inner_stuff}</div>'
        if not keys:
            break

    full_thing = (
        repo_html.replace("TITLE", repo)
        .replace("DESCRIPTION", description)
        .replace("LANGUAGES", languages_html)
        .replace("URL", f"https://github.com/{repo}")
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
    elif repo == "pranavraj575/pranavraj575.github.io":
        full_thing = full_thing.replace("MAYBE_IMAGE", "")
    else:
        full_thing = full_thing.replace("MAYBE_IMAGE", "")
    if repo == "pranavraj575/asteroids":
        full_thing = full_thing.replace("EXTRA_ATTRIBUTES", 'onclick="Aster();"')
    else:
        full_thing = full_thing.replace("EXTRA_ATTRIBUTES", "")
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
