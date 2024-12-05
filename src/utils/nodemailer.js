import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()

const gateways = {
	att: "@txt.att.net",
	tmobile: "@tmomail.net",
	verizon: "@vtext.com",
	sprint: "@messaging.sprintpcs.com",
	uscellular: "@email.uscc.net",
	boost: "@sms.myboostmobile.com",
	cricket: "@sms.cricketwireless.net",
	metropcs: "@mymetropcs.com"
}

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USERNAME,
		pass: process.env.SMTP_PASSWORD,
	}
})

export const sendSms = async (number, code) => {
	const response = []
	for (const [, gateway] of Object.entries(gateways)) {
		const sendTo = `${number}${gateway}`
		const mailOptions = {
			from: '',
			to: sendTo,
			subject: '',
			text: `Your order code is: ${code}`
		}

		try {
			const info = await transporter.sendMail(mailOptions)
			response.push(`Message sent successfully: ${info.message}`)
		} catch (error) {
			console.error(error)
			response.push(`Error: ${error}`)
		}
	}
	return response
}