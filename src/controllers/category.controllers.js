import Category from "../models/Category.js";
import mongoose from "mongoose";

export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            return res.status(404).json({ message: "No categories found" });
        }
        const response = {
            data: categories,
        };
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res
                .status(400)
                .json({ message: "The category already exists" });
        }

        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();

        return res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getByIdCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryFind = await Category.findById(id);

        if (!categoryFind)
            return res.status(404).json({ message: "Category not found" });

        return res.status(200).json(categoryFind);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).send({ message: "Invalid Id" });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const deletedBook = await Category.findByIdAndRemove(categoryId);
        console.log(categoryId);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        console.log(deletedBook);

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        // console.log(error);
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        console.log("Error" + error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;

        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        existingCategory.name = name;
        const updatedCategory = await existingCategory.save();

        return res.status(200).json(updatedCategory);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        console.log("Error" + error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
