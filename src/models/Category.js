import {  Schema, model } from "mongoose";

export const categorySchema = new Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    }
);

export default model("Category", categorySchema)
