import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validateCreate = [
    check("name").exists().withMessage("empty fiel"),
    check("email")
        .exists()
        .withMessage("empty email")
        .isEmail()
        .withMessage("incorrect format")
        .isString(),
    check("password")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Empity field")
        .isStrongPassword()
        .withMessage("insecure password")
        .isString(),
    // .isLength({ min: 8 })
    // .withMessage(""),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];
