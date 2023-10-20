import User from "../models/User.js";
import Role from "../models/Roles.js";
import Sale from "../models/Sale.js";

export const getAllUser = async (req, res) => {
    try {
        const rolAdmin = await Role.findOne({ name: "admin" });
        const rolSuperAdmin = await Role.findOne({ name: "SuperAdmin" });

        // Buscamos todos los usuarios que NO tienen el rol "admin"
        const users = await User.find({
            id_rol: {
                $nin: [rolAdmin._id, rolSuperAdmin._id],
            },
        });

        if (!users || users.length === 0) {
            return res.status(400).json({ message: "Users not found" });
        }

        // Buscamos las ventas que corresponden a los usuarios que NO tienen el rol "admin" y contamos los libros
        const sales = await Sale.aggregate([
            {
                $match: { idUser: { $in: users.map((user) => user._id) } },
            },
            {
                $group: {
                    _id: "$idUser",
                    totalBooks: { $sum: { $size: "$idbooks" } },
                },
            },
        ]);

        const response = {
            data: users.map((user) => {
                const saleInfo = sales.find((sale) =>
                    sale._id.equals(user._id)
                );
                return {
                    _id: user._id,
                    name: user.name,
                    rol: user.id_rol,
                    email: user.email,
                    countBooks: saleInfo ? saleInfo.totalBooks : 0,
                };
            }),
        };

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const postWork = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if ((!name, !email, !password))
            return res.status(404).json({ message: "bad request" });

        const idAdmin = await Role.findOne({ name: "admin" });

        const newWork = new User({
            name,
            id_rol: idAdmin,
            email,
            password,
        });

        const WorkSave = await newWork.save();

        return res.status(201).json({ message: "created admin", WorkSave });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
};
