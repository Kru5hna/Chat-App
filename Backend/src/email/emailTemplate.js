export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #ddd; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1523;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #7f5af0, #9b5de5); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg" 
           alt="Messenger Logo" 
           style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to Messenger!</h1>
    </div>

    <!-- Body -->
    <div style="background-color: #241f31; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
      <p style="font-size: 18px; color: #cba6f7;"><strong>Hello ${name},</strong></p>
      <p>We're thrilled to have you join our platform! Messenger helps you connect instantly with your people in a fast, reliable, and secure way.</p>
      
      <div style="background-color: #2a2238; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #7f5af0;">
        <p style="font-size: 16px; margin: 0 0 15px 0; color: #eee;"><strong>Here’s how to get started:</strong></p>
        <ul style="padding-left: 20px; margin: 0; color: #bbb;">
          <li style="margin-bottom: 10px;">Upload your profile picture</li>
          <li style="margin-bottom: 10px;">Add friends & contacts</li>
          <li style="margin-bottom: 10px;">Start chatting right away</li>
          <li style="margin-bottom: 0;">Share media, files, and more</li>
        </ul>
      </div>
      
      <!-- Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href=${clientURL} style="background: linear-gradient(135deg, #9b5de5, #7f5af0); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 600; display: inline-block; box-shadow: 0 4px 10px rgba(127,90,240,0.4);">
          Open Messenger
        </a>
      </div>
      
      <p style="margin-bottom: 5px; color: #bbb;">Need help? Our team is here for you anytime.</p>
      <p style="margin-top: 0; color: #bbb;">Enjoy your messaging journey 🚀</p>
      
      <p style="margin-top: 25px; margin-bottom: 0; color: #aaa;">Best regards,<br><span style="color:#cba6f7;">The Messenger Team</span></p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: #777; font-size: 12px;">
      <p>© 2025 Messenger. All rights reserved.</p>
      <p>
        <a href="#" style="color: #9b5de5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
        <a href="#" style="color: #9b5de5; text-decoration: none; margin: 0 10px;">Terms of Service</a>
        <a href="#" style="color: #9b5de5; text-decoration: none; margin: 0 10px;">Contact Us</a>
      </p>
    </div>
  </body>
  </html>
  `;
}
