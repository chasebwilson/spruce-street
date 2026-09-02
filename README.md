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
- Founder portraits are monochrome because the two source photos have clashing
  backgrounds (near-black vs light grey). Colour versions do not cohere.

## Known issue

`images/chase-wilson.jpg` derives from a 314×310 LinkedIn-sized copy, not the original.
Only ~187 real pixels survive the crop, so it is softer than Ty's 24MP studio file and
caps the portraits at 138px. Replacing it with the full-resolution original is a
drop-in swap — same filename, square crop, monochrome treatment — and would allow
larger portraits.
