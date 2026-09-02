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
- Founder portraits are cropped from measured landmarks so head height and headroom
  occupy the same fraction of each frame (head = 54.9% of the square, 4.5% above the
  hair). Ty's photo is already at its widest possible square crop, so that 54.9% is
  fixed and Chase's crop is derived from it. Re-crop by eye and they stop matching.

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
