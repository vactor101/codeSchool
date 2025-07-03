require("dotenv").config();
import { Document, model, Model, Schema } from "mongoose";
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface INewsLetter extends Document {
    portfolioId: Schema.Types.ObjectId;
    email: string;
};
const newsLetterSchema: Schema<INewsLetter> = new Schema(
    {
        portfolioId: {
            type: Schema.Types.ObjectId,
            ref: 'Portfolio',
            required: true
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            validate: {
                validator: function (value: string) {
                    return emailRegexPattern.test(value);
                },
                message: "please enter a valid email",
            },
        },
    },
    {
        timestamps: true
    }
);

const newsLetterModel: Model<INewsLetter> = model('NewsLetter', newsLetterSchema);
export default newsLetterModel;