from pathlib import Path
root=Path('public/images')
root.mkdir(parents=True,exist_ok=True)
shapes={
 'ring-sculpture': '<ellipse cx="500" cy="570" rx="206" ry="260" transform="rotate(-28 500 570)" fill="none" stroke="url(#metal)" stroke-width="47"/><ellipse cx="506" cy="563" rx="185" ry="240" transform="rotate(-28 506 563)" fill="none" stroke="#e9e9e5" stroke-width="2"/><path d="M358 360Q404 305 456 315" stroke="#fff" stroke-width="7" fill="none" opacity=".6"/>',
 'necklace-studio': '<path d="M225 0Q195 690 500 770Q805 690 775 0" stroke="url(#metal)" stroke-width="7" fill="none"/><circle cx="500" cy="797" r="66" stroke="url(#metal)" stroke-width="18" fill="none"/><circle cx="500" cy="797" r="54" stroke="#fff" stroke-width="2" fill="none"/>',
 'earrings-study': '<path d="M355 390C235 425 260 735 375 745C500 735 470 425 355 390Z" stroke="url(#metal)" stroke-width="29" fill="none"/><path d="M625 430C510 450 515 735 635 760C745 740 745 450 625 430Z" stroke="url(#metal)" stroke-width="29" fill="none"/>',
 'necklace-detail':'<path d="M250 0L500 610L750 0" stroke="url(#metal)" stroke-width="6" fill="none"/><rect x="425" y="600" width="150" height="195" rx="10" stroke="url(#metal)" stroke-width="17" fill="none" transform="rotate(16 500 700)"/><path d="M450 645L545 750M430 680L550 700" stroke="#a5a6a1" stroke-width="2"/>',
 'silver-bracelet':'<ellipse cx="500" cy="590" rx="270" ry="175" transform="rotate(-26 500 590)" stroke="url(#metal)" stroke-width="44" fill="none"/><ellipse cx="500" cy="581" rx="270" ry="175" transform="rotate(-26 500 581)" stroke="#f8f8f5" stroke-width="3" fill="none"/>',
 'jewelry-editorial':'<circle cx="405" cy="520" r="135" stroke="url(#metal)" stroke-width="49" fill="none" transform="rotate(-24 405 520)"/><ellipse cx="610" cy="720" rx="130" ry="110" stroke="url(#metal)" stroke-width="42" fill="none" transform="rotate(20 610 720)"/>',
 'atelier-study':'<ellipse cx="480" cy="610" rx="170" ry="226" transform="rotate(30 480 610)" stroke="url(#metal)" stroke-width="64" fill="none"/><path d="M354 395Q478 305 590 438" stroke="#eee" stroke-width="3" fill="none"/>',
 'pendant-detail':'<path d="M240 0Q210 680 500 660Q790 680 760 0" stroke="url(#metal)" stroke-width="6" fill="none"/><circle cx="500" cy="737" r="86" stroke="url(#metal)" stroke-width="27" fill="none"/><path d="M480 650L480 625Q500 610 520 625L520 650" stroke="url(#metal)" stroke-width="7" fill="none"/>'
}
for name,shape in shapes.items():
 dark=name=='ring-sculpture'
 bg='#292b2c' if dark else '#e9e9e5'
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1250" viewBox="0 0 1000 1250"><defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2=".6"><stop stop-color="#858781"/><stop offset=".22" stop-color="#f5f5f0"/><stop offset=".43" stop-color="#a0a39b"/><stop offset=".63" stop-color="#f8f8f4"/><stop offset=".87" stop-color="#8c8f87"/><stop offset="1" stop-color="#c8cac2"/></linearGradient><radialGradient id="light"><stop stop-color="{'#555958' if dark else '#f5f5f0'}"/><stop offset="1" stop-color="{bg}"/></radialGradient></defs><rect width="1000" height="1250" fill="url(#light)"/><ellipse cx="510" cy="940" rx="210" ry="22" fill="{'#000' if dark else '#8b8e87'}" opacity=".1"/>{shape}</svg>'''
 (root/f'{name}.svg').write_text(svg)
for f in root.glob('*.jpg'): f.unlink()
Path('docs/IMAGE-SOURCES.md').write_text('# Visual assets\n\nAll current catalog and editorial visuals are locally created SVG placeholders. They use neutral jewelry silhouettes for layout review and do not represent an approved product catalog. Replace them with WFC product photography before production. No external photographs are currently used.\n')
