import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async (req, res) => {
    try {
        const { name, members } = req.body;

        // Step 1: Look up all valid users by email
        const validUsers = [];
        for (const m of members) {
            const user = await User.findOne({ email: m.user });
            if (user) {
                validUsers.push({ user: user._id, role: 'Member' });
            } else {
                return res.status(400).json({ message: `User with email ${m.email} not found` });
            }
        }

        // Step 2: Create the team
        const team = await Team.create({
            name,
            owner: req.user.id,
            members: [
                { user: req.user.id, role: 'Owner' },
                ...validUsers
            ]
        });

        // Step 3: Add team to creator's list
        await User.findByIdAndUpdate(req.user.id, {
            $push: { teams: team._id }
        });

        // Step 4: Add team to all invited members
        for (const m of validUsers) {
            await User.findByIdAndUpdate(m.user, {
                $push: { teams: team._id }
            });
        }

        res.status(201).json({ message: 'Team Created', team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getMyTeams = async (req, res) => {
    try {
        const teams = await Team.find({
            $or: [
                { owner: req.user.id },
                { 'members.user': req.user.id }
            ]
        }).populate('owner members.user', 'name email');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const joinTeam = async (req, res) => {
    try {
        const { teamId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        const alreadyMember = team.members.some(
            (m) => m.user.toString() === req.user.id
        );
        if (alreadyMember)
            return res.status(400).json({ message: 'Already a member of this team' });

        team.members.push({ user: req.user.id, role: 'Member' });
        await team.save();

        await User.findByIdAndUpdate(req.user.id, {
            $push: { teams: team._id }
        });

        res.status(200).json({ message: 'Joined team successfully', team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
