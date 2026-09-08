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

  const escapeHtml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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
      replyTo: email,
      subject,
      text: `From: ${email}\n\n${message}`,
      html: `<p><b>From:</b> ${escapeHtml(email)}</p>
             <p><b>Subject:</b> ${escapeHtml(subject)}</p>
             <p><b>Message:</b> ${escapeHtml(message).replaceAll("\n", "<br>")}</p>`
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ error: "Error sending email" });
  }
}
