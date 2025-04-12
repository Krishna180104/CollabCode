import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async (req,res)=>{
    try {
        const {name,members} = req.body;
        const team = await Team.create({
            name,
            owner:req.user.id,
            members:members?.map(m=>({user:m.user, role:m.role}))
        })

        await User.findByIdAndUpdate(req.user.id,{

            $push:{teams:team._id}
        });

        res.status(201).json({message:"Team Created",team});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getMyTeams = async (req,res)=>{
    try {
        const teams = await Team.findOne({
            $or:[
                {owner:req.user.id},
                {'members.user':req.user.id}
            ]
        }).populate('owner members.user','name email');
        res.json(teams);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}