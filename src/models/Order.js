import { model, Schema } from "mongoose";

// Modelo del carrito
export const cartItemSchema = new Schema(
    {
        book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
        },

        userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },

        quantity: {
        type: Number,
        default: 1, // Cantidad predeterminada
        },

        totalPrice: {
        type: Number,
        required: true, // Precio es requerido
        },

        percentDiscount: {
        type: Number,
        },

        unitPrice: {
        type: Number,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
export default model("CartItem", cartItemSchema);
