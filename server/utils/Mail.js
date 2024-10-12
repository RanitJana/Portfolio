import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 467,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendMail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Change Request",
    html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2 style="color: #4CAF50;">Password Change Request</h2>
                <p>Hello,</p>
                <p>We received a request to change the password for your account. Please use the following OTP to proceed with the password change:</p>
                <div style="margin: 20px 0; text-align: center;">
                    <span style="display: inline-block; padding: 10px 20px; background-color: #f0f0f0; border-radius: 5px; font-size: 18px; font-weight: bold;">${otp}</span>
                </div>
                <p>If you did not request this change, please ignore this email.</p>
                <p>Thank you,</p>
            </div>
        `,
  };

  await transporter.sendMail(mailOptions);
}
