import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async (req, res) => {
    try {
        const { name, members,username } = req.body;

        // Step 1: Look up all valid users by email
        const validUsers = [];
        const checkTeam = await Team.findOne({username:username});
        if(checkTeam){
            res.status(500).json({message:"Team with this username already exists, choose another username"});
        }
        if(!members || members.length === 0)return res.status(500).json({message:"Please provide atleast one Team member"});
        for (const m of members) {
            const user = await User.findOne({ email: m.email });
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
            ],
            username
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
      const { username } = req.body;
  
      // Step 1: Find the team by username
      const team = await Team.findOne({ username });
      if (!team)
        return res.status(404).json({ message: 'Team with this username does not exist' });
  
      // Step 2: Check if user is already a member
      const alreadyMember = team.members.some(
        (m) => m.user.toString() === req.user.id
      );
      if (alreadyMember)
        return res.status(400).json({ message: 'You are already a member of this team' });
  
      // Step 3: Add user to team
      team.members.push({ user: req.user.id, role: 'Member' });
      await team.save();
  
      // Step 4: Add team ID to user's teams list
      await User.findByIdAndUpdate(req.user.id, {
        $push: { teams: team._id }
      });
  
      res.status(200).json({ message: 'Joined team successfully', team });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
