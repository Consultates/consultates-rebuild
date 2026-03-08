# Contact Form Design

## Overview

Wire up the existing contact page form to send email notifications via Google Apps Script. Spam protection via honeypot (already built), reCAPTCHA v3, and rate limiting.

## Architecture

Static site (GitHub Pages) → POST → Google Apps Script → email to agent@agenttate.com

No database. No Google Sheet. Email only. Future CRM (DenchClaw) will pick up submissions from the email inbox via its agent.

## Google Apps Script (`doPost`)

1. Parse incoming JSON: name, email, company, message, website (honeypot), recaptchaToken
2. Honeypot check — if `website` has a value, return success silently
3. reCAPTCHA v3 — verify token server-side, reject if score < 0.5
4. Rate limiting — PropertiesService tracks submissions by email, max 3 per hour
5. Send email to agent@agenttate.com via MailApp
6. Return JSON `{ success: true }` or `{ success: false, error: "..." }`
7. CORS headers for consultates.com domain

## Contact page update (`contact.astro`)

- Load reCAPTCHA v3 script (`https://www.google.com/recaptcha/api.js?render=SITE_KEY`)
- Replace setTimeout mock with fetch POST to Apps Script URL
- Four states: Idle → Submitting → Success / Error
- Error message below form per PRD spec
- Site key: 6LftmYMsAAAAAO84MPCA-10msF9M0fm4l74NqE3-

## Config

- Apps Script URL → `src/config.ts` as `CONTACT_FORM_URL`
- reCAPTCHA site key → `src/config.ts` as `RECAPTCHA_SITE_KEY`

## Manual steps (Gary)

1. Create Apps Script project at script.google.com
2. Paste provided code
3. Add script property: `RECAPTCHA_SECRET` = secret key from Google
4. Deploy as web app (Anyone can access)
5. Provide deployed URL to add to config
