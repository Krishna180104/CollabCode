import Team from "../models/Team.js";

const checkRole = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const { teamId } = req.body; // or from params/query
      const team = await Team.findById(teamId);

      if (!team) return res.status(404).json({ message: 'Team not found' });

      const member = team.members.find(
        (m) => m.user.toString() === req.user.id
      );

      if (!member || !requiredRoles.includes(member.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};

export default checkRole;
