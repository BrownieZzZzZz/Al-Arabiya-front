import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  const receiver = process.env.NEXT_PUBLIC_EMAIL_RECEIVER;
  const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
  const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Create transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: username,
      to: receiver,
      subject: `طلب اتصال جديد: ${name}`,
      html: `<div style="font-family: Arial, sans-serif; color: #2f2f2f; padding: 20px; background-color: #f7f6f1; direction: rtl;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
            <header style="background-color: #d99814; padding: 20px; text-align: center; color: #fff;">
              <h3 style="margin: 0; font-size: 24px;">طلب اتصال جديد</h3>
              <p style="font-size: 16px; margin: 5px 0;">
                لقد تلقيت رسالة من موقعك الإلكتروني
              </p>
            </header>

            <section style="padding: 20px;">
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>الاسم:</strong> ${name}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>البريد الإلكتروني:</strong> ${email}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 10px 0;">
                <strong>رقم الهاتف:</strong> ${phone}
              </p>
              <p style="font-size: 18px; line-height: 1.6; margin: 20px 0 10px;">
                <strong>الرسالة:</strong>
              </p>
              <div style="padding: 15px; background-color: #f7f6f1; border-right: 4px solid #d99814; font-size: 16px; line-height: 1.8;">
                ${message}
              </div>
            </section>

            <footer style="background-color: #d99814; padding: 15px; text-align: center; color: #fff;">
              <p style="margin: 0; font-size: 14px;">
                شكراً لاستخدامك خدمتنا! لمزيد من المعلومات، يرجى زيارة موقعنا
                الإلكتروني.
              </p>
              <p style="margin: 0; font-size: 14px;">مع تحيات، شركة العربية</p>
            </footer>
          </div>
        </div>`,
    });

    return NextResponse.json({ message: "تم إرسال البريد الإلكتروني بنجاح" });
  } catch (error) {
    console.error(error);
    return NextResponse.status(500).json({
      message: "تعذر إرسال الرسالة",
    });
  }
}
