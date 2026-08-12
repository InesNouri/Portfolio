# assets

Current CV: `Cv Ines Nouri English.pdf`

It's linked from the two hero buttons in `index.html` as
`assets/Cv%20Ines%20Nouri%20English.pdf` — the `%20` are the spaces in the
filename, URL-encoded. If you replace the CV with a differently-named file,
search `Cv%20Ines` in `index.html` and update both links.

Easier long-term: rename the file to something without spaces or capitals
(`ines-nouri-cv.pdf`) and update the two links to match. GitHub Pages serves
from Linux, where filenames are case-sensitive — spaces and capitals are a
common source of "works locally, 404s in production".

Keep it as a PDF: it opens in the browser on the "View CV" button, which DOCX
cannot do.
