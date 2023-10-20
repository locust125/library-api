import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const bookSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        id_category: [
            {
                ref: "Category",
                type: Schema.Types.ObjectId,
            },
        ],
        price: {
            type: Number,
            required: true,
        },
        priceDiscount: {
            type: Number,
            default: 0,
        },
        frontImage: {
            publicId: {
                type: String,
            },
            secureUrl: {
                type: String,
            },
        },
        backImage: {
            publicId: {
                type: String,
            },
            secureUrl: {
                type: String,
            },
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
bookSchema.plugin(mongoosePaginate)
export default model("Book", bookSchema);
