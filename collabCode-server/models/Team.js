import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['Admin', 'Member','Owner'], default: 'Member' }
    }],
    createdAt: { type: Date, default: Date.now },
    username:{type:String}
});

export default mongoose.model("Team",teamSchema);