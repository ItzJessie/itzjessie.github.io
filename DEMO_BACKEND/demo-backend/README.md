# Contact Form Backend

This is a Node.js backend server that handles email submissions from the contact form on the Japanese Animation History Archive website.

## Features

- Express.js REST API
- Email submission via Nodemailer
- CORS support for cross-origin requests
- Input validation
- Error handling

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm
- A Gmail account with 2-Step Verification enabled (for App Password)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the project root and configure your email settings:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
PORT=3001
```

## Getting Your Gmail App Password

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Select **Security** from the left sidebar
3. Enable **2-Step Verification** if not already enabled
4. Scroll down and select **App passwords**
5. Select Mail and Windows Computer (or your device)
6. Google will generate a 16-character password
7. Copy this password to your `.env` file (remove spaces)

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### POST /api/contact

Submits a contact form message and sends an email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about anime history",
  "message": "I have a question about..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully."
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message describing what went wrong"
}
```

## Validation

The backend validates:
- All fields are required
- Email format is valid
- Name, subject, and message are non-empty

## Email Format

Emails received will include:
- Recipient name and email
- Subject line
- Message content
- Reply-to address (sender's email)

## Frontend Integration

The contact form on the website sends requests to `http://localhost:3001/api/contact`.

Make sure to:
1. Start the backend server
2. Ensure CORS is properly configured (currently allows all origins)
3. Test the form submission in your browser

## Troubleshooting

**"Failed to send email" error:**
- Check your Gmail credentials in `.env`
- Verify 2-Step Verification and App Password are set up correctly
- Check that the app password is entered correctly (no spaces)

**CORS errors:**
- Ensure the backend server is running
- Check that the frontend is making requests to the correct URL
- Verify CORS middleware is enabled in `app.js`

**Connection refused:**
- Make sure the server is running on port 3001
- Check for port conflicts with other applications
- Try changing the PORT in `.env`

## Security Notes

- Never commit `.env` file to version control
- Always use environment variables for sensitive data
- Consider adding rate limiting for production use
- Validate and sanitize all inputs on both frontend and backend
- Use HTTPS in production

## Future Enhancements

- Add database storage for submissions
- Set up email templates
- Add rate limiting
- Add CAPTCHA for spam prevention
- Send confirmation email to user
