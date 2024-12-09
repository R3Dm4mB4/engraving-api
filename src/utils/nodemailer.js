import nodemailer from 'nodemailer'
import { env } from '../config/envConf.js'

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
		user: env.SMTP_USERNAME,
		pass: env.SMTP_PASSWORD,
	}
})

export const sendSms = async (number, code) => {
	const response = []
	for (const [, gateway] of Object.entries(gateways)) {
		const sendTo = `${number}${gateway}`
		const mailOptions = {
			from: '',
			to: sendTo,
			subject: 'Koras Jewelers:',
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