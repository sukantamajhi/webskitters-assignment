import * as mongoose from "mongoose";
let Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

export default mongoose.model('users', UserSchema)