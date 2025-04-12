import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const { name, description, techStack, deadline, teamId } = req.body;

        const project = await Project.create({
            name,
            description,
            techStack,
            deadline,
            team: teamId,
            createdBy: req.user.id
        });

        res.status(201).json({ message: "Project created succesfully" });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getProjectsByteam = async (req,res)=>{
    try {
        const {teamId} = req.params;

        const projects = await Project.find({team:teamId}).populate('createdBy','name email');
        res.json(projects);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}