# Release Checklist

## Before Merge

- [ ] Content is fact-checked and spelling is reviewed.
- [ ] All section links and external links work.
- [ ] Contact flow is tested with valid, empty, and malformed values.
- [ ] No secrets or personal form submissions are committed.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Browser and Device QA

- [ ] Chrome desktop and mobile viewport.
- [ ] Safari desktop and iPhone-sized viewport.
- [ ] Firefox desktop.
- [ ] 320px narrow viewport.
- [ ] Keyboard-only navigation.
- [ ] Screen reader smoke test.
- [ ] Reduced motion enabled.
- [ ] Zoom at 200%.

## Production QA

- [ ] Metadata and social preview are correct.
- [ ] Favicon loads.
- [ ] No console errors.
- [ ] Lighthouse checks meet targets.
- [ ] Contact delivery works in production.
- [ ] Analytics events exclude message contents and unnecessary personal data.
- [ ] Rollback path is known.
