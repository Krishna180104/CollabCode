import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Owner', 'Admin', 'Member'], default: 'Member' },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
});

export default model("User",userSchema);