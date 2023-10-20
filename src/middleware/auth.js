import User from "../models/User.js";
import Role from "../models/Roles.js";
import mongoose from "mongoose";

export const isAdmin = async (req, res, next) => {
    try {
        const { id_user } = req.headers;

        if (!id_user)
            return res.status(400).json({ message: "Not authorized" });

        const user = await User.findById(id_user);

        const roles = await Role.find({ _id: { $in: user.id_rol } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Not authorized" });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        return res.status(500).json({ message: "Somethin went wrong in validation" });
    }
};

export const isWork = async (req, res, next) => {
    try {
        const { id_user } = req.headers;

        if (!id_user)
            return res.status(400).json({ message: "Not authorized" });

        const user = await User.findById(id_user);

        const roles = await Role.find({ _id: { $in: user.id_rol } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin"  || roles[i].name === "SuperAdmin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Not authorized" });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        return res.status(500).json({ message: "Somethin went wrong in validation" });
    }
};

export const isSuperAdmin = async (req, res, next) => {
    try {
        const { id_user } = req.headers;

        console.log(id_user)

        if (!id_user)
            return res.status(400).json({ message: "Not authorized" });

            

        const user = await User.findById(id_user);

        console.log(user)

        const roles = await Role.find({ _id: { $in: user.id_rol } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "SuperAdmin") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Not authorized" });
    } catch (error) {
        console.log(error)
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        return res.status(500).json({ message: "Somethin went wrong in validation" });
    }
};

export const isUser = async (req, res, next) => {
    try {
        const { id_user } = req.body;

        const user = await User.findById(id_user);
        const roles = await Role.find({ _id: { $in: user.id_rol } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "user") {
                next();
                return;
            }
        }

        return res.status(403).json({ message: "Not authorized" });
    } catch (error) {
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        return res.status(500).json({ message: "Somethin went wrong in validation " });
    }
};
