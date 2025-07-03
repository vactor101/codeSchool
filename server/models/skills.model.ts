require("dotenv").config();

import { Document, model, Model, Schema } from "mongoose";

export interface ISkill extends Document{
    portfolioId:Schema.Types.ObjectId
    name:string;
    percentage:number;
};

const skillSchema : Schema<ISkill> = new Schema(
    {
        portfolioId:{
            type:Schema.Types.ObjectId,
            ref:'Portfolio',
            required:true
        },
        name:{
            type:String,
            required: [true, "Please enter skill name"],
        },
        percentage:{
            type:Number,
            required: [true, "Please enter skill percentage"],
        },
    },
    {
        timestamps:true
    }
);

const skillModel:Model<ISkill> = model('Skill', skillSchema);
export default skillModel;