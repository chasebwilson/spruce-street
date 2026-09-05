# Spruce Street

Marketing site for Spruce Street — a proposed twelve-month structured sober living
program for men ages 24–35 in the Philadelphia area. Audience is clinicians and
referral partners, not prospective residents.

**Live:** https://sprucestreetrecovery.com

Static, dependency-free: one `index.html`, one stylesheet, one small script. No build
step. Open `index.html` directly, or `python3 -m http.server` from this directory to
preview with correct paths.

## Layout

```
index.html          the whole page
css/styles.css      all styles; fonts self-hosted from fonts/
js/main.js          sticky header, mobile menu, scroll reveals, nav highlighting
docs/               Program Overview PDF + its cover image
images/             founder portraits
fonts/              Libre Caslon Display/Text, Chivo, Space Mono (woff2)
CNAME               pins the custom domain for GitHub Pages
.nojekyll           stops GitHub from running Jekyll over the files
```

## Deploying

GitHub Pages serves `main` from the repo root. Push to `main` and it deploys.

DNS lives at Hostinger (hPanel → Domains → DNS). The apex has four A records to
GitHub Pages (`185.199.108–111.153`); `www` CNAMEs to `chasebwilson.github.io`.

**Do not delete records or reset the DNS zone.** `chase@` and `ty@sprucestreetrecovery.com`
are live mailboxes on this domain. The MX, SPF, DKIM, `_dmarc`, `autodiscover`, and
`autoconfig` records run that email and must be left alone.

## Editorial rules

Recorded so they don't get silently undone:

- **The tone is restrained on purpose.** The audience is clinical. Understatement reads
  as competence to them; superlatives read as marketing. No adjectives that tell the
  reader how to feel.
- **"step down" is a fixed clinical term** and carries a non-breaking space in the Why
  heading so it can never split across lines.
- **The disclaimer appears exactly three times** — hero status line, the note under the
  conversation CTA, and the footer legal block. It was four; that read as anxious.
- **The Why heading runs at a smaller size than other section headings** (54px vs 61px)
  because it is much longer. Its column is also wider. Both are deliberate; the five-beat
  sequence does not fit the standard column.
- **Sage, dark green, and tan sections all vertically centre their left column.** Keep
  them consistent.
- **Each part has a divider page and an opening page, and both pairs match.** PDF page 2
  divides Part One and page 11 divides Part Two; they share a layout (tree, copper part
  label at -257.535, grey line at -283.637, title at -338.421, copper rule, italic
  subtitle at -421.141, centred paragraph from -463.464). Neither divider is numbered.
- **The wordmark's "back to top" needs JavaScript, and that is not an oversight.**
  `.site-head` is `position: sticky`, so once it is stuck the `#top` anchor on it is
  already at the top of the viewport and the browser decides no scroll is needed — the
  click does nothing at all. `js/main.js` intercepts the click and calls `scrollTo(0)`.
  Moving the id to an empty element at document top does not help; a zero-area element
  is not a valid scroll target.
- **The founder cards carry no role line.** The small copper "Programming and daily
  operations" / "Business operations and finance" labels were removed; the bios say the
  same thing in their first sentence. The gap they used to provide now lives on the
  `h3` bottom margin, so removing that margin would close the name up against the bio.
- **The two part-opening pages are deliberately identical.** PDF page 3 (Part One) and
  page 12 (Part Two) carry the same masthead in the same positions: one grey small-caps
  line at 714.36, the title at 669.33, the two italic lines at 638.24 and 621.31, the URL
  at 600.50, and body text starting at 578.22. Keep them in step. Page 10 is a different
  thing — a mid-document divider announcing Part Two, and Part One has no counterpart
  because each part now has one.
- **The name is settled. Spruce Street is not a "working name" any more.** That phrasing
  was removed from the footer legal block on both pages, from the pre-opening strips on
  PDF pages 3 and 12, and from the italic disclaimer on PDF pages 10 and 40. The rest of
  that disclaimer — a program in development, not an offer of services — still stands and
  should stay.
- **Ty's title at New Life House was Assistant Program Director**, for four years. Never
  "Program Director" — the claim has to match the job. This appears in the founder card
  in `index.html` and twice in the Program Overview PDF (pages 10 and 35). Note that
  "Director" elsewhere in the PDF — `Director-led assessment`, the staffing plan,
  `Admissions are led by the Director` — refers to Spruce Street's own future role and is
  correct as written.
- **The founder bios exist at three lengths and only two of them match.** The website
  cards and the full overview (PDF pages 35–36) carry the long bios; the condensed
  overview (PDF page 10) keeps its own short version deliberately. Changing one does not
  imply changing the others.
- **"Café Tropical" is spelled without the accent in the PDF only.** The PDF's embedded
  fonts are subsets that contain no `é` and no acute accent to build one from, so the
  glyph cannot be set without embedding a new font. The website has the accent.
- **The overview is 40 pages**, and `index.html` states that count next to the cover.
  Update it if the PDF ever changes length.
- Founder portraits are cropped from measured landmarks so head height and headroom
  occupy the same fraction of each frame (head = 54.9% of the square, 4.5% above the
  hair). Ty's photo is already at its widest possible square crop, so that 54.9% is
  fixed and Chase's crop is derived from it. Re-crop by eye and they stop matching.

## The Program Overview PDF

**There is no LaTeX source for `docs/Spruce-Street-Program-Overview.pdf`.** It was
produced with LaTeX (TeX Gyre Pagella, `xdvipdfmx`) somewhere that no longer exists, and
no `.tex` file is on any machine here. It cannot be rebuilt by recompiling.

Edits are therefore made by re-typesetting inside the PDF itself: the text is recovered
from the glyph runs, re-broken with TeX hyphenation patterns and the document's own
spacing rules, and written back into the content stream. The file supplies most of what
that needs — its own hyphenation choices, its kern pairs, and its justification range
(stretch 0.68–1.88, median 1.11) are all recoverable from the existing TJ arrays, so new
text can be set to match. Keep replacements inside that range.

Two constraints are easy to trip over:

- **The embedded fonts are subsets.** They contain only the glyphs LaTeX actually used.
  There is no `é`, and no accent to compose one from. Any new character has to be checked
  against the subset before it can be set.
- **Page numbers are drawn text, and the contents page lists them.** Adding or removing a
  page means rewriting the footer number on every page after it and updating the affected
  contents entry. The digits are tabular (all 556 units), so the number's x position does
  not change.

## Contact form

`contact.html` holds the "Talk with the founders" form. GitHub Pages is static, so the
form POSTs to Formspree (`https://formspree.io/f/xrpgklbe`), which emails the submission
to the address owning that Formspree account. Free tier is 50 submissions/month.

Formspree delivers to one address. To reach both founders, point it at a shared
`hello@sprucestreetrecovery.com` alias that forwards to both, rather than trying to add a
second recipient.

If the endpoint is ever reset to a placeholder, the form validates and then refuses to
send, saying so plainly. It cannot fail silently.

`js/main.js` submits over `fetch` and swaps in a thank-you message in place. With
JavaScript off the form falls back to a normal POST and the service's own confirmation
page. The `_gotcha` field is a honeypot; leave it hidden and unlabelled.

**The no-PHI note under the form is deliberate.** The audience is clinicians, and a
contact form invites them to describe a case. It is ordinary email, not a HIPAA-covered
channel. Do not remove that line.

## Social preview card

`images/og-image.png` (1200×630) is what appears when the link is texted or posted.
It is the inverted treatment — cream tree, wordmark and rule on the spruce ground —
chosen because message threads are full of light cards and a dark one stands out.
It was drawn to a canvas in the browser using the site's own woff2 faces — Libre Caslon
Display for the wordmark, Space Mono for the status line — with the tree drawn from the
same path data as the inline SVG symbol. Remake it that way rather than mocking it up
elsewhere, or the type will not match.

`og:image` and `twitter:image` **must stay absolute URLs.** Relative paths are ignored by
most scrapers, so a link would preview with no image at all.

Platforms cache previews aggressively. After changing the card, re-scrape with
Facebook's Sharing Debugger or by appending a query string to the shared URL.

## Known issue

`images/chase-wilson.jpg` derives from a 314×310 LinkedIn-sized copy, not the original.
Only ~219 real pixels survive the crop, so it is softer than Ty's 24MP studio file and
caps the portraits at 138px. Replacing it with the full-resolution original is a
drop-in swap — same filename, square crop, monochrome treatment — and would allow
larger portraits.
