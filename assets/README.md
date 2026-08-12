# assets

The CV PDF linked from the two hero buttons lives here.

Both buttons in `index.html` point at the file by name. If you replace it with
a differently-named file, update those two `href` values to match — and if the
name contains spaces, URL-encode them as `%20`.

Simplest option is a filename with no spaces and no capitals, e.g. `cv.pdf`.
GitHub Pages serves from Linux, where filenames are case-sensitive; spaces and
capitals are a common cause of "works locally, 404s in production".

Keep it as a PDF — it opens in the browser from the "View CV" button, which a
DOCX cannot do.
