"""
generate .tex file from resume
"""

import os
import json
import argparse

DIR = os.path.dirname(os.path.dirname(__file__))

PARSER = argparse.ArgumentParser()
PARSER.add_argument(
    "--output",
    action="store",
    required=False,
    default=os.path.join(DIR, ".output", "pause"),
    help="directory to store output files",
)
PARSER.add_argument(
    "--resume",
    action="store",
    required=False,
    default=os.path.join(DIR, "assets", "json", "resume.json"),
    help="directory to find json file",
)
args = PARSER.parse_args()

output_dir = args.output
pause = args.resume
if not os.path.exists(pause):
    quit(69)
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
f = open(pause, encoding="utf8")
cv = json.load(f)
f.close()


def dateing(date):
    dt = date.split("-")
    if len(dt) == 2:
        y, m = dt
        d = None
    elif len(dt) == 3:
        y, m, d = dt
    else:
        raise NotImplementedError
    return "\\mydate" + ("" if d is None else "[" + d + "]") + "{" + m + "}{" + y + "}"


def tolatex(fn):
    f = open(fn)
    stuff = f.read()
    f.close()
    while "</b>" in stuff:
        i = stuff.index("<b>")
        j = stuff.index("</b>")
        stuff = stuff[:i] + "\\textbf{" + stuff[i + 3 : j] + "}" + stuff[j + 4 :]
    while "</a>" in stuff:
        i = stuff.index("<a href=")

        j = stuff.index("</a>")
        k = len("<a href=") + 1
        url = ""
        while stuff[i + k] != stuff[i + len("<a href=")]:
            # skip the link
            url += stuff[i + k]
            k += 1
        while stuff[i + k] != ">":
            k += 1
        k += 1
        stuff = stuff[:i] + "\\href{" + url + "}{" + stuff[i + k : j] + "}" + stuff[j + 4 :]
    escapes = []
    esc = False
    math_mode = False
    href_mode = False
    for i, c in enumerate(stuff):
        if c == "\\":
            esc = not esc

        if not esc and c == "$":
            if i > 0 and stuff[i - 1] != "$":
                math_mode = not math_mode
        if esc and stuff[i:].startswith("\\href{"):
            href_mode = True
        if href_mode and not esc and c == "}":
            href_mode = False

        if c == "_" and not href_mode and not math_mode and not esc:
            escapes.append(i)

        if esc and c != "\\":  # turn off esc mode
            esc = False
    for i in escapes[::-1]:
        stuff = stuff[:i] + "\\" + stuff[i:]
    f = open(fn, "w")
    f.write(stuff)
    f.close()


# projects
if "projects" in cv:
    print("writing to projects.tex")
    fn = os.path.join(output_dir, "projects.tex")
    f = open(fn, "w")
    f.write("\\cvsection{Research Projects} % ordered by start date\n\n")
    f.write("\\begin{cventries}\n")
    projects = cv["projects"]
    projects.sort(
        key=lambda project: project.get("startDate", "") + project.get("endDate", ""),
        reverse=True,
    )

    for project in projects:
        f.write("  \\cventry\n")
        tab = "    "
        f.write(tab + "{\\textbf{")
        if "subaffiliation" in project:
            f.write(project["subaffiliation"] + ", ")
        f.write(project["affiliation"])
        f.write("}")
        if "pi" in project:
            f.write(" - PI: " + project["pi"])
        f.write("} % affiliation\n")

        f.write(tab + "{" + project["name"] + "} % project\n")

        f.write(tab + "{" + project.get("location", "") + "} % location\n")

        f.write(tab + "{")
        if "startDate" in project:
            f.write(dateing(project["startDate"]))
            f.write(" - ")
            f.write(dateing(project["endDate"]) if "endDate" in project else "Present")
        f.write("} % date\n")

        f.write(tab + "{\n")
        f.write(tab + "\\begin{cvitems}\n")
        for desc in project.get("highlights", []):
            f.write(tab + "  \\item{" + desc + "}\n")
        f.write(tab + "\\end{cvitems}\n")
        f.write(tab + "} % description bullet points\n")

        f.write("\n\n")
    f.write("\\end{cventries}\n")
    f.close()
    tolatex(fn)
else:
    print("projects not in cv")

# experience
if "experience" in cv:
    print("writing to experience.tex")
    fn = os.path.join(output_dir, "experience.tex")
    f = open(fn, "w")
    f.write("\\cvsection{Experience} % ordered by start date\n\n")
    f.write("\\begin{cventries}\n")
    experiences = cv["experience"]
    experiences = list(
        filter(
            lambda experience: experience.get("in_projects", "false") == "false",
            experiences,
        )
    )

    experiences.sort(
        key=lambda experience: experience.get("startDate", "") + experience.get("endDate", ""),
        reverse=True,
    )

    for experience in experiences:
        f.write("  \\cventry\n")
        tab = "    "
        f.write(tab + "{\\textbf{")
        if "subname" in experience:
            f.write(experience["subname"] + ", ")
        f.write(experience["name"])
        f.write("}} % organization\n")
        f.write(tab + "{" + experience["position"] + "} % job title\n")

        if "mentor" in experience:
            f.write(tab + "% mentor: " + experience["mentor"] + "\n")
        if "hours" in experience:
            f.write(tab + "% " + experience["hours"] + " hours/week\n")

        f.write(tab + "{" + experience.get("location", "") + "} % location\n")

        f.write(tab + "{")

        def write_date(start, end=None):
            f.write(dateing(start))
            f.write(" - ")
            f.write(dateing(end) if end is not None else "Present")

        if "dateList" in experience:
            for rng in experience["dateList"][:-1]:
                write_date(*rng)
                f.write("\\newline\n")
            write_date(*experience["dateList"][-1])
        else:
            if "startDate" in experience:
                write_date(experience["startDate"], experience.get("endDate", None))
        f.write("} % date\n")

        f.write(tab + "{\n")
        if "summary" in experience:
            f.write(tab + "\\textit{" + experience["summary"] + "}\n" + tab + "\\vspace{4.0mm}\n")
        f.write(tab + "\\begin{cvitems}\n")

        for desc in experience.get("highlights", []):
            f.write(tab + "  \\item{" + desc + "}\n")
        f.write(tab + "\\end{cvitems}\n")
        f.write(tab + "} % description bullet points\n")

        f.write("\n\n")
    f.write("\\end{cventries}\n")
    f.close()
    tolatex(fn)
else:
    print("experience not in cv")

# course list
if "education" in cv:
    for education in cv["education"]:
        id = education["studyType"] + " " + education["institution"]
        print(id)
        if "topics" in education:
            for topic in education["topics"]:
                if "silly" not in topic or not topic["silly"]:
                    print("  ", topic.get("name", "unnamed topic"))
                    if "courses" in topic:
                        for course in topic["courses"]:
                            if "silly" not in course or not course["silly"]:
                                print("\t", course)
        else:
            print("topics not in", id)
