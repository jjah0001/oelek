# Oelek

An English atlas of Indonesian sambal: 241 fully profiled sambals across 35 provinces, each illustrated as a card, with a province map, sambal of the day, dish pairing, a spice primer and a "Which sambal are you?" quiz.

Everything is in one self-contained `index.html` (fonts load from Google Fonts). Open it in a browser, or host it on GitHub Pages by putting `index.html` at the root of a repository and enabling Pages.

## Notes

- **Dish pairing:** inside claude.ai the pairing asks Claude. Anywhere else, the page uses its built-in keyword matcher instead.
- **Quiz results:** saved in the visitor's browser only.
- **Sources:** each sambal links to its source. Heat levels, flavour profiles, illustrations and persona texts are editorial.

## Profile coverage

All 207 formerly Listed entries now use the existing full-profile layout, bringing the atlas to 241 Profiled entries and 0 Listed entries. Each has representative ingredients, suggested pairings, a six-axis editorial flavour profile, a description and source links. Regional recipes vary; supporting seasonings are editorial reconstructions where a source records only a defining ingredient. Province-only records appear in the map panel without invented coordinates. Original catalogue IDs are preserved. The source spelling Picak corrects the old Pikak entry, which remains searchable as an alias. Duo Sale now uses dried small fish, correcting the original mango/coconut data.

## Live website

https://jjah0001.github.io/oelek/

GitHub Actions deploys `index.html` to GitHub Pages on every push to `main`. The website is self-contained, including the ingredient illustrations. Dish pairing uses the built-in matcher on GitHub Pages.
