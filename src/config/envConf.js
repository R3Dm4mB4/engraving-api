import dotenv from "dotenv"
dotenv.config()

export const env = {
	PORT: process.env.PORT || 3000,
	MONGODB_URI: process.env.MONGODB_URI,
	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
	JWT_SECRET: process.env.JWT_SECRET,
	SMTP_USERNAME: process.env.SMTP_USERNAME || '',
	SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
}