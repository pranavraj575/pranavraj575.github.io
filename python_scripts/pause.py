"""
generate .tex file from resume
"""
import os
import json

DIR = os.path.dirname(os.path.dirname(__file__))
output_dir = os.path.join(DIR, '.output', 'pause')
cvdir = os.path.join(DIR, 'assets', 'json', 'resume.json')
if not os.path.exists(cvdir):
    quit(69)
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
f = open(cvdir, encoding="utf8")
cv = json.load(f)
f.close()


def dateing(date):
    dt = date.split('-')
    if len(dt) == 2:
        y, m = dt
        d = None
    elif len(dt) == 3:
        y, m, d = dt
    else:
        raise NotImplementedError
    return '\\mydate' + ('' if d is None else '[' + d + ']') + '{' + m + '}{' + y + '}'


def tolatex(fn):
    f = open(fn)
    stuff = f.read()
    f.close()
    while '</b>' in stuff:
        i = stuff.index('<b>')
        j = stuff.index('</b>')
        stuff = stuff[:i] + '\\textbf{' + stuff[i + 3:j] + '}' + stuff[j + 4:]
    while '</a>' in stuff:
        i = stuff.index('<a href=')

        j = stuff.index('</a>')
        k = len('<a href=') + 1
        url = ''
        while stuff[i + k] != stuff[i + len('<a href=')]:
            # skip the link
            url += stuff[i + k]
            k += 1
        while stuff[i + k] != '>':
            k += 1
        k += 1
        stuff = stuff[:i] + '\\href{' + url + '}{' + stuff[i + k:j] + '}' + stuff[j + 4:]
    escapes=[]
    esc=False
    math_mode=False
    href_mode=False
    for i,c in enumerate(stuff):
        if c=='\\':
            esc=not esc

        if not esc and c=='$':
            if i>0 and stuff[i-1]!='$':
                math_mode=not math_mode
        if esc and stuff[i:].startswith('\\href{'):
            href_mode=True
        if href_mode and not esc and c=='}':
            href_mode=False

        if c=='_' and not href_mode and not math_mode and not esc:
            escapes.append(i)

        if esc and c!='\\': # turn off esc mode
            esc = False
    for i  in escapes[::-1]:
        stuff=stuff[:i]+'\\'+stuff[i:]
    f = open(fn, 'w')
    f.write(stuff)
    f.close()


# projects
if 'projects' in cv:
    fn = os.path.join(output_dir, 'projects.tex')
    f = open(fn, 'w')
    f.write('\\cvsection{Research Projects} % ordered by end date\n\n')
    f.write('\\begin{cventries}')
    projects = cv['projects']
    projects.sort(key=lambda project: project.get('startDate', '') + project.get('endDate', ''),
                  reverse=True)

    for project in projects:
        f.write('  \\cventry\n')
        tab = '    '
        f.write(tab + '{\\textbf{')
        if 'subaffiliation' in project:
            f.write(project['subaffiliation'] + ', ')
        f.write(project['affiliation'])
        f.write('}')
        if 'pi' in project:
            f.write(' - PI: ' + project['pi'])
        f.write('} % affiliation\n')

        f.write(tab + '{' + project['name'] + '} % project\n')

        f.write(tab + '{' + project.get('location', '') + '} % location\n')

        f.write(tab + '{')
        if 'startDate' in project:
            f.write(dateing(project['startDate']))
            f.write(' - ')
            f.write(dateing(project['endDate']) if 'endDate' in project else 'Present')
        f.write('} % date\n')

        f.write(tab + '{\n')
        f.write(tab + '\\begin{cvitems}\n')
        for desc in project.get('highlights', []):
            f.write(tab + '  \\item{' + desc + '}\n')
        f.write(tab + '\\end{cvitems}\n')
        f.write(tab + '} % description bullet points\n')

        print(project)
        f.write('\n\n')
    f.write('\\end{cventries}\n')
    f.close()
    tolatex(fn)
else:
    print('projects not in cv')
