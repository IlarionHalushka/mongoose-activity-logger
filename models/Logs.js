const mongoose = require('mongoose');

const { Schema } = mongoose;

const LogsSchema = new Schema(
	{
		data: {
			type: Object,
		},
		action: {
			type: String,
		},
		collectionName: {
			type: String,
			lowercase: true,
		},
		conditions: {
			type: Object,
		},
		options: {
			type: Object,
		},
		updatedBy: {
			type: Schema.Types.ObjectId,
		},
		env: {
			type: String,
			default: 'local',
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('logs', LogsSchema);
