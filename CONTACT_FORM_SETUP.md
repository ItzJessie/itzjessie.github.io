# Contact Form Setup Guide

This guide explains how to set up and use the contact form on your website.

## Overview

The contact form consists of three parts:
1. **Frontend**: HTML form and JavaScript validation on your website
2. **Backend**: Node.js server to handle email submissions
3. **Email Service**: Gmail SMTP for sending emails

## Quick Start

### Step 1: Set Up Backend Dependencies

```bash
cd DEMO_BACKEND/demo-backend
npm install
```

### Step 2: Configure Email Settings

1. Create a `.env` file in `DEMO_BACKEND/demo-backend/` directory
2. Copy and paste the following template:

```env
EMAIL_USER=
EMAIL_PASS=
PORT=3001
```

### Step 3: Get Gmail App Password

**Important:** You must use a Gmail account with App Passwords enabled.

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. Go back to Security and click **App passwords**
5. Select "Mail" and "Windows Computer"
6. Google will generate a 16-character password
7. Copy this password (without spaces) into your `.env` file

### Step 4: Start the Backend Server

```bash
cd DEMO_BACKEND/demo-backend
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will be running at `http://localhost:3001`

### Step 5: Test the Contact Form

1. Open your website in a browser
2. Navigate to the home page
3. Scroll to the "Get In Touch" section
4. Fill out the form with valid information
5. Click "Send Message"

You should see a success message, and an email will be sent to the email address configured in `.env`

## Form Features

### Front-End Validation

The form validates:
- ✅ All fields are required
- ✅ Name is at least 2 characters
- ✅ Email is in valid format (user@domain.com)
- ✅ Subject is at least 3 characters
- ✅ Message is at least 10 characters

Validation errors appear below each field as the user fills out the form.

### User Feedback

- **Success Message**: Green box with success confirmation (disappears after 5 seconds)
- **Error Messages**: Field-level errors appear in red below each field
- **Form-Level Errors**: Red error box appears if backend fails

### Responsive Design

The form looks great on:
- ✅ Desktop (large screens)
- ✅ Tablets
- ✅ Mobile phones

## File Structure

```
itzjessie.github.io/
├── csce243/project/part6/
│   ├── home.html                 (Contact form HTML)
│   ├── styles.css               (Contact form styling)
│   └── js/
│       └── contact-form.js       (Form handling & validation)
│
└── DEMO_BACKEND/demo-backend/
    ├── app.js                    (Backend server)
    ├── package.json              (Dependencies)
    ├── .env                      (Email configuration)
    └── README.md                 (Backend documentation)
```

## How It Works

### 1. Form Submission (Frontend)

When user submits the form:
1. JavaScript validates all fields
2. Shows error messages if validation fails
3. If valid, sends a POST request to the backend
4. Displays "Sending..." while waiting
5. Shows success or error message based on response

### 2. Email Processing (Backend)

Backend receives the form data and:
1. Validates all required fields
2. Checks email format
3. Sends email using Gmail SMTP
4. Returns success or error response

### 3. Email Delivery

The email contains:
- Name of the sender
- Email address (reply-to)
- Subject line
- Full message content

Emails are sent to the address in `EMAIL_USER` environment variable.

## Customization

### Change Recipient Email

Edit `DEMO_BACKEND/demo-backend/app.js`:

```javascript
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "your-new-email@gmail.com",  // Change this line
  // ...
});
```

### Change Form Styling

Edit `csce243/project/part6/styles.css`:

Look for the `.contact-section` section to modify:
- Colors
- Spacing
- Fonts
- Button styles
- Responsive breakpoints

### Change Form Fields

To add, remove, or rename fields:

1. Update HTML in `csce243/project/part6/home.html`
2. Update JavaScript validation in `csce243/project/part6/js/contact-form.js`
3. Update backend validation in `DEMO_BACKEND/demo-backend/app.js`

## Troubleshooting

### "Email sending failed"

**Problem**: Backend can't send email

**Solutions**:
- Check `.env` file exists and has correct Gmail credentials
- Verify 2-Step Verification is enabled on Gmail account
- Check App Password is correct (no spaces)
- Make sure Gmail SMTP is not blocked by firewall

### "Cannot connect to backend"

**Problem**: Frontend can't reach backend server

**Solutions**:
- Make sure backend is running (`npm start`)
- Check port 3001 is not in use
- Verify backend URL in `js/contact-form.js` is correct
- Check if CORS is enabled in backend

### "Form validation not working"

**Problem**: Form doesn't show error messages

**Solutions**:
- Check browser console for JavaScript errors
- Make sure `js/contact-form.js` is loaded
- Clear browser cache and reload page
- Check that form element IDs match in HTML and JavaScript

### "Success page won't load"

**Problem**: After form submission, nothing happens

**Solutions**:
- Check browser console for errors
- Make sure backend returns proper JSON response
- Verify form is using POST method
- Check CORS headers in backend

## Security Considerations

⚠️ **Important**: 
- Never commit `.env` file to version control
- Never push your Gmail password to GitHub
- Add `.env` to `.gitignore`
- In production, use environment variables from hosting provider
- Consider adding rate limiting to prevent spam
- Add CAPTCHA for additional spam protection

## Advanced Setup: Production Deployment

For deploying to a live server:

1. **Use a dedicated email service** (SendGrid, Mailgun, etc.)
2. **Add rate limiting** to prevent abuse
3. **Add CAPTCHA** to prevent bots
4. **Use HTTPS** for secure communication
5. **Set proper CORS** to only allow your domain
6. **Add logging** for debugging

Example environment variables for production:

```env
NODE_ENV=production
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your-api-key
MAIL_TO=business@example.com
MAIL_FROM=noreply@example.com
CORS_ORIGIN=https://yourwebsite.com
PORT=3000
```

## Support

For additional help:
- Check the backend README: `DEMO_BACKEND/demo-backend/README.md`
- Review the contact form JavaScript comments
- Check browser console for error messages
- Verify all file paths are correct

## Testing Checklist

- [ ] Backend server is running
- [ ] `.env` file exists with correct Gmail credentials  
- [ ] Form validation shows errors for invalid input
- [ ] Form submission shows "Sending..." message
- [ ] Success message appears after valid submission
- [ ] Email is received at your Gmail account
- [ ] Form resets after successful submission
- [ ] Form looks good on mobile devices
- [ ] Error messages appear with proper styling

## Next Steps

Once the form is working:
1. ✅ Customize the email message format
2. ✅ Add more form fields if needed
3. ✅ Customize the success/error messages
4. ✅ Add a logo or branding to emails
5. ✅ Set up a staging environment for testing
