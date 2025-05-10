import User from "../models/User.js";
import mongoose from "mongoose";

const checkRole = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const id = mongoose.Types.ObjectId.createFromHexString(req.user.id);
      const member = await User.findOne({_id:id});
      if (!member || !requiredRoles.includes(member.role)) {
        return res.status(403).json({ message:'Access denied'});
      }
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
export default checkRole;
