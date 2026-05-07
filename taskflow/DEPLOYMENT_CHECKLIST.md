# TaskFlow — Deployment Checklist

## Pre-Deployment
- [x] All features tested and working
- [x] Production build successful (`npm run build`)
- [x] Production build tested locally (`npm run preview`)
- [x] Console.logs removed
- [x] Environment variables configured (.env)
- [x] No sensitive data exposed
- [x] Input validation on all forms
- [x] README updated
- [x] Lighthouse audit completed
- [x] Code committed and pushed to GitHub

## Deployment Steps
- [ ] Create Netlify account
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Deploy site
- [ ] Test live URL
- [ ] Update README with live link

## Post-Deployment
- [ ] Test all pages on live URL
- [ ] Test login/register on live URL
- [ ] Test project creation on live URL
- [ ] Test kanban board on live URL
- [ ] Test on mobile browser
- [ ] Update README with live demo link0