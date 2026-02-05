/* eslint-disable no-console */
import sgMail from "@sendgrid/mail";

import env from "@/env";

sgMail.setApiKey(env.SENDGRID_API_KEY!);

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  const msg = {
    to,
    from: env.SENDGRID_EMAIL_FROM, // Use the email address or domain you verified above
    subject,
    text,
    html,
  };

  await sgMail
    .send(msg)
    .then(() => console.log("Email sent"))
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}
