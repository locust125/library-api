import Role from "../models/Roles.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Sale from "../models/Sale.js";

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: "SuperAdmin" }).save(),
            new Role({ name: "admin" }).save(),
            new Role({ name: "user" }).save(),
        ]);

        console.log("rols created");
    } catch (error) {
        console.log(error);
    }
};


export const CreateAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount();
        if (count > 0) return;
        const role = await Role.findOne({ name: "SuperAdmin" });
        const values = await Promise.all([
            new User({
                name: "carlos",
                email: "carlosChel62@gmail.com",
                id_rol: [role._id],
                password: "12345",
            }).save(),
        ]);

        console.log("admin created");
    } catch (error) {
        console.log(error);
    }
};

export const createCategories = async () => {
    try {
        const count = await Category.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Category({ name: "Ficción" }).save(),
            new Category({ name: "Clásicos" }).save(),
            new Category({ name: "Thiller" }).save(),
            new Category({ name: "Romance" }).save(),
            new Category({ name: "Ciencia" }).save(),
            new Category({ name: "Infantil" }).save(),
        ]);

        console.log("category created");
    } catch (error) {
        console.log(error);
    }
};

export const saleunfo = async () => {
    try {
        const count = await Sale.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Sale({
                idUser: "650f80b3da759fd4d8927efa",
                idbooks: [
                    "650a42e4647fa77b2470e0ff",
                    "650a478049b379a8132d30fb",
                ],
                amoun: 90,
            }).save(),
        ]);

        console.log("sale  created");
    } catch (error) {
        console.log(error);
    }
};
