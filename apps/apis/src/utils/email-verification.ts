import { sendEmail } from "./send-email";

interface ISendEmailVerificationEmailProps {
  user: {
    name: string;
    email: string;
  };
  url: string;
};

export async function sendEmailVerificationEmail({
  user,
  url,
}: ISendEmailVerificationEmailProps) {
  await sendEmail({
    to: user.email,
    subject: "Verify your email address",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Verify Your Email</h2>
              <p>Hello ${user.name},</p>
              <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
              <a href="${url}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Verify Email</a>
              <p>If you didn't create an account, please ignore this email.</p>
              <p>This link will expire in 24 hours.</p>
              <p>Best regards,<br>Quantace Team</p>
            </div>
          `,
    text: `Hello ${user.name},

Thank you for signing up! Please verify your email address by clicking this link: ${url}

If you didn't create an account, please ignore this email.

This link will expire in 24 hours.

Best regards,
Quantace Team`,
  });
}
