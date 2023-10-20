import User from "../models/User.js";
import Role from "../models/Roles.js";

export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "empity field" });

        const userFound = await User.findOne({ email: req.body.email });

        if (!userFound)
            return res.status(400).json({ message: "email not found" });

        if (password != userFound.password)
            return res.status(400).json({ message: "invalid password" });

        const nameRol = await Role.findById(userFound.id_rol);

        return res.status(200).json({
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            rol: nameRol.name,
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// export const SignUp = async (req, res) => {
//     const { name, email, password, id_rol } = req.body;

//     try {
//         const emailRegex = /^[^\s@]+@gmail\.com$/;
//         if (!emailRegex.test(email)) {
//             return res
//                 .status(400)
//                 .json({
//                     message: "Email address is invalid or not from Gmail",
//                 });
//         }

//         const existingUser = await User.findOne({ $or: [{ name }, { email }] });

//         if (existingUser) {
//             const errors = {};
//             if (existingUser.name === name) {
//                 errors.name = "Username already exists";
//             }
//             if (existingUser.email === email) {
//                 errors.email = "Email already exists";
//             }
//             return res.status(409).json({ errors });
//         }
//         const defaultRole = await Role.findOne({ name: "user" });
//         const newUser = new User({
//             name,
//             email,
//             password,
//             id_rol: defaultRole ? [defaultRole._id] : [],
//         });
//         const savedUser = await newUser.save();

//         return res.status(201).json({ user: savedUser });
//     } catch (err) {
//         console.error("Error interno del servidor:", err);
//         return res.status(500).json({ message: "Something went wrong" });
//     }
// };



export const SignUp = async (req, res) => {
    
    try {
        const { name, email, password, id_rol } = req.body;
        const defaultRole = await Role.findOne({ name: "user" });

            const resDetail = await User.create({
                name,
                 email, 
                password,
                id_rol: defaultRole ? [defaultRole._id]:[]
            })
            res.send({data:resDetail})
        } catch (err) {
        console.error("Error interno del servidor:", err);
        return res.status(500).json({ Error:err });``
        // httpError(res, e)
    }
};