import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendEmail({ to, subject, text, html }: SendEmailParams) {
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL_FROM!, // Use the email address or domain you verified above
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
