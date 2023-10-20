import { Schema, model } from "mongoose";

export const SaleSchema = new Schema({
    idUser: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    idbooks: [
        {
            ref: "User",
            type: Schema.Types.ObjectId,
        },
    ],
    amoun: {
        type: Number,
    },
    itemCounts:{
        type: Number,
    }
});

export default model("Sale", SaleSchema);
