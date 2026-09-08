import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ status: "ok" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, subject, message } = req.body || {};
  const emailUser = process.env.GMAIL_USER;
  const emailPassword = process.env.GMAIL_APP_PASSWORD;
  const recipient = process.env.EMAIL_RECIPIENT || emailUser;

  if (!email || !subject || !message || !emailUser || !emailPassword || !recipient) {
    return res.status(400).json({ error: "Missing email configuration or message fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    await transporter.sendMail({
      from: emailUser,
      to: recipient,
      subject,
      text: message,
      replyTo: email
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
}