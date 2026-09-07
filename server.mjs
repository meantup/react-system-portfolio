import "dotenv/config";
import http from "node:http";
import nodemailer from "nodemailer";

const port = Number(process.env.EMAIL_SERVER_PORT || 3001);
const emailUser = process.env.GMAIL_USER;
const emailPassword = process.env.GMAIL_APP_PASSWORD;
const recipient = process.env.EMAIL_RECIPIENT || "markocariza2@gmail.com";

const transporter = emailUser && emailPassword
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    })
  : null;

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const sendJson = (response, statusCode, body) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
};

const server = http.createServer((request, response) => {
  if (request.method !== "POST" || request.url !== "/api/send-email") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  let requestBody = "";
  request.on("data", (chunk) => { requestBody += chunk; });
  request.on("end", async () => {
    try {
      const { email, subject, message } = JSON.parse(requestBody);

      if (!email || !subject || !message || !transporter) {
        sendJson(response, 400, { error: "Invalid request or email server configuration" });
        return;
      }

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

      sendJson(response, 200, { message: "Email sent successfully" });
    } catch (error) {
      console.error("Email sending failed:", error);
      sendJson(response, 500, { error: "Error sending email" });
    }
  });
});

server.listen(port, () => {
  console.log(`Email server listening on http://localhost:${port}`);
});
