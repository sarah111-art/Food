import nodemailer from 'nodemailer'
import contactModel from '../models/contactModel.js' // Đảm bảo đã tạo model này

// Gửi liên hệ về admin qua email và lưu vào database
export const contactAdmin = async (req, res) => {
  const { name, email, message } = req.body
  try {
    // Lưu vào database
    await contactModel.create({ name, email, message, date: new Date() })

    // Gửi email về admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,      // Email admin
        pass: process.env.EMAIL_PASS,      // Mật khẩu ứng dụng
      },
    })

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,          // Gửi về email admin
      subject: `Contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })

    res.json({ success: true, message: 'Message sent to admin!' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message.' })
  }
}

// Lấy tất cả liên hệ cho admin xem
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find().sort({ date: -1 })
    res.json({ success: true, contacts })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contacts.' })
  }
}