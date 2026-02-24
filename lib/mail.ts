import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_TOKEN!,
    sandbox: true,
    testInboxId: Number(process.env.MAILTRAP_INBOX_ID),
  })
);

const sender = {
  address: "noreply@mydigitalleague.dev",
  name: "My Digital League",
};

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transport.sendMail({
    from: sender,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transport.sendMail({
    from: sender,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};
