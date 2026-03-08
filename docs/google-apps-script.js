/**
 * Consultates Contact Form — Google Apps Script
 *
 * Setup:
 * 1. Go to script.google.com → New Project
 * 2. Paste this entire file into Code.gs
 * 3. Go to Project Settings → Script Properties → Add:
 *    - RECAPTCHA_SECRET = your reCAPTCHA v3 secret key
 * 4. Deploy → Web App → Execute as: Me → Who has access: Anyone
 * 5. Copy the deployed URL and add it to src/config.ts as CONTACT_FORM_URL
 */

const RECIPIENT = 'agent@agenttate.com';
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RECAPTCHA_THRESHOLD = 0.5;

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
  } catch (_) {
    return jsonResponse({ success: false, error: 'Invalid request.' });
  }

  // Honeypot — return fake success to not tip off bots
  if (data.website) {
    return jsonResponse({ success: true });
  }

  // Validate required fields
  var name = (data.name || '').trim();
  var email = (data.email || '').trim();
  var message = (data.message || '').trim();
  var company = (data.company || '').trim();

  if (name.length < 2 || name.length > 100) {
    return jsonResponse({ success: false, error: 'Invalid name.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ success: false, error: 'Invalid email.' });
  }
  if (message.length < 10 || message.length > 5000) {
    return jsonResponse({ success: false, error: 'Invalid message.' });
  }

  // reCAPTCHA v3 verification
  var token = data.recaptchaToken || '';
  if (!token) {
    return jsonResponse({ success: false, error: 'Verification failed.' });
  }

  var secret = PropertiesService.getScriptProperties().getProperty('RECAPTCHA_SECRET');
  var captchaResponse = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: { secret: secret, response: token }
  });
  var captchaResult = JSON.parse(captchaResponse.getContentText());

  if (!captchaResult.success || captchaResult.score < RECAPTCHA_THRESHOLD) {
    return jsonResponse({ success: false, error: 'Verification failed.' });
  }

  // Rate limiting by email
  var props = PropertiesService.getScriptProperties();
  var rateLimitKey = 'rl_' + email.toLowerCase();
  var existing = props.getProperty(rateLimitKey);
  var now = Date.now();

  if (existing) {
    var entries = JSON.parse(existing);
    // Remove entries older than the window
    entries = entries.filter(function(ts) { return now - ts < RATE_LIMIT_WINDOW_MS; });

    if (entries.length >= RATE_LIMIT_MAX) {
      return jsonResponse({ success: false, error: 'Too many submissions. Please try again later.' });
    }

    entries.push(now);
    props.setProperty(rateLimitKey, JSON.stringify(entries));
  } else {
    props.setProperty(rateLimitKey, JSON.stringify([now]));
  }

  // Send email
  var subject = 'Consultates Contact: ' + name;
  var body = 'Name: ' + name + '\n'
    + 'Email: ' + email + '\n'
    + 'Company: ' + (company || '(not provided)') + '\n'
    + 'reCAPTCHA score: ' + captchaResult.score + '\n'
    + '\nMessage:\n' + message;

  MailApp.sendEmail({
    to: RECIPIENT,
    subject: subject,
    body: body,
    replyTo: email
  });

  return jsonResponse({ success: true });
}

function doGet() {
  return jsonResponse({ status: 'Contact form endpoint active.' });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
