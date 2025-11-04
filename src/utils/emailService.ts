import nodemailer from "nodemailer";

export const sendLowStockAlert = async (productName: string, quantity: number) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourEmail@gmail.com",
      pass: "yourAppPassword"
    }
  });

  const mailOptions = {
    from: "yourEmail@gmail.com",
    to: "admin@gmail.com",
    subject: "⚠️ Low Stock Alert",
    text: `Product "${productName}" is low in stock. Remaining quantity: ${quantity}.`
  };

  await transporter.sendMail(mailOptions);
};
