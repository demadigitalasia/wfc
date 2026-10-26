from urllib.request import Request,urlopen
from pathlib import Path
import re
url='https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Instrument+Serif:ital@0;1&display=swap'
css=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}),timeout=30).read().decode()
root=Path('public/fonts');root.mkdir(exist_ok=True)
for i,remote in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)',css))):
 name=f'wfc-font-{i}.woff2';(root/name).write_bytes(urlopen(remote,timeout=30).read());css=css.replace(remote,f'/fonts/{name}')
Path('src/app/fonts.css').write_text(css)
p=Path('src/app/globals.css');s=p.read_text();s=s[s.index('\n')+1:];p.write_text('@import "./fonts.css";\n'+s)
print('Local font files:',len(list(root.glob('*'))))
