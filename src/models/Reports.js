import { Schema, model } from "mongoose"

// * Model will be upgraded when Reports logic is implemented on API.
const ReportSchema = new Schema({
	date: {
		type: Date,
		default: () => new Date().setHours(0, 0, 0, 0),
		required: true
	},
	dayIncome: { type: Number, default: 0, min: 0 },
	jobsDone: [{
		job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
		employee: { type: String, required: true },
		salesRep: { type: String, required: true },
	}],
	workers: [String],
})
ReportSchema.index({ date: 1 })

export default model('Reports', ReportSchema)