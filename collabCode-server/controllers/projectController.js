import Project from "../models/Project.js";
import Team from "../models/Team.js";

export const createProject = async (req, res) => {
    try {
        const { name, description, techStack, deadline, teamUsername } = req.body;

        // Step 1: Find the team by username
        const team = await Team.findOne({ username: teamUsername });
        if (!team) {
            return res.status(404).json({ message: "Team with this username does not exist" });
        }

        // Optional: Ensure user is part of the team
        const isMember = team.owner.toString() === req.user.id ||
            team.members.some(m => m.user.toString() === req.user.id);

        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this team" });
        }

        // Step 2: Create the project
        const project = await Project.create({
            name,
            description,
            techStack,
            deadline,
            team: team._id,
            createdBy: req.user.id
        });

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProjectsByteam = async (req, res) => {
    try {
      const { teamUsername } = req.params;
  
      // Find the team by username
      const team = await Team.findOne({ username: teamUsername });
      if (!team) {
        return res.status(404).json({ message: "Team with this username does not exist" });
      }
  
      // Fetch all projects linked to that team
      const projects = await Project.find({ team: team._id })
        .populate("createdBy", "name email");
  
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};