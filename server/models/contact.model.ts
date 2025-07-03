require("dotenv").config();
import { Document, model, Model, Schema } from "mongoose";
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IContact extends Document {
    portfolioId: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message?: string

};
const contactSchema: Schema<IContact> = new Schema(
    {
        portfolioId: {
            type: Schema.Types.ObjectId,
            ref: 'Portfolio',
            required: true
        },
        firstName: {
            type: String,
            required: [true, "Please enter first name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter last name"]
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
        phoneNumber: {
            type: String,
            required: [true, "Please enter phoneNumber"]
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

const contactModel: Model<IContact> = model('Contact', contactSchema);
export default contactModel;