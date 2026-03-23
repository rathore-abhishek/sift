import { env } from "@/env";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  try {
    const res = await transporter.sendMail({ to, subject, text });
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
