import Mailgen from "mailgen";
import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://mailgen.js/",
    },
  });

  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mailOptions = {
    from: "Task Manager <team@task-manager.com>", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: emailText, // plain text body
    html: emailHtml, // html body
  };

  try {
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email ", error);
  }
};

export const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Task Manager App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Task Manager, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro:
        "You have received this email because a password reset request for your account was received",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#EE3266",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "If you did not request a password reset, no further action is required on your part.",
    },
  };
};

export const verifiedEmailMailgenContent = (username) => {
  return {
    body: {
      name: username,
      intro:
        "Your email has been successfully verified! Welcome to Task Manager App.",
      action: {
        instructions:
          "To access your account and start managing tasks, please click here:",
        button: {
          color: "#55eeffff",
          text: "Login to Task Manager",
          link: `${process.env.BASE_URL}/api/v1/auth/login`,
        },
      },
      outro:
        "If you have any questions or need assistance, feel free to reply to this email. We're happy to help!",
    },
  };
};

export const resendEmailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "It looks like you requested to resend your email verification link for Task Manager App.",
      action: {
        instructions: "Please click the button below to verify your email:",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "If you did not request this email, you can safely ignore it. Need help? Just reply to this email, we'd love to assist you.",
    },
  };
};
