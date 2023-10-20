import Book from "../models/Book.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import Category from "../models/Category.js";
import fs from "fs-extra";
import mongoose from "mongoose";

export const postBook = async (req, res) => {
    try {
        const { name, author, id_category, details, price } = req.body;
        console.log(req.body);
        if (!name || !author || !id_category || !details || !price)
            return res.status(400).json({ message: "bad request" });

        const newBook = new Book({
            name,
            author,
            details,
            id_category,
            price,
        });

        if (req.files?.frontImage) {
            const resultfrontImage = await uploadImage(
                req.files.frontImage.tempFilePath
            );

            newBook.frontImage = {
                publicId: resultfrontImage.public_id,
                secureUrl: resultfrontImage.secure_url,
            };

            fs.unlink(req.files.frontImage.tempFilePath);
        }

        if (req.files?.backImage) {
            const resultbackImage = await uploadImage(
                req.files.backImage.tempFilePath
            );

            newBook.backImage = {
                publicId: resultbackImage.public_id,
                secureUrl: resultbackImage.secure_url,
            };

            fs.unlink(req.files.backImage.tempFilePath);
        }

        const bookSave = await newBook.save();
        return res.status(201).json({ message: "Created book", bookSave });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong" });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const result = await Book.paginate({}, { limit, page });

        if (result.docs.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        const booksWithFullUrls = await Promise.all(
            result.docs.map(async (book) => {
                const category = await Category.findById(book.id_category[0]);
                return {
                    ...book.toObject(),
                    frontImage: book.frontImage.secureUrl,
                    backImage: book.backImage.secureUrl,
                    id_category: category ? category.name : null,
                };
            })
        );

        const response = {
            data: booksWithFullUrls,
            meta: {
                totalDocs: result.totalDocs,
                limit: result.limit,
                totalPages: result.totalPages,
                page: result.page,
                pagingCounter: result.pagingCounter,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
            },
        };

        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const category = await Category.findById(book.id_category[0]);
        const bookWithFullUrls = {
            ...book.toObject(),
            frontImage: book.frontImage.secureUrl,
            backImage: book.backImage.secureUrl,
            id_category: category ? {
                id: category._id,
                name: category.name
            } : null,
        };
        const response={
            data:bookWithFullUrls
        }

        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).send({ message: "Invalid Id" });
        }
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, author, id_category, details, price } = req.body;
        const updateFields = {};

        if (name) updateFields.name = name;
        if (author) updateFields.author = author;
        if (id_category) updateFields.id_category = id_category;
        if (details) updateFields.details = details;
        if (price) updateFields.price = price;

        const existingBook = await Book.findById(id);

        if (!existingBook)
            return res.status(404).json({ message: "Book not found" });

        if (req.files?.frontImage) {
            const resultfrontImage = await uploadImage(
                req.files.frontImage.tempFilePath
            );

            updateFields.frontImage = {
                publicId: resultfrontImage.public_id,
                secureUrl: resultfrontImage.secure_url,
            };

            fs.unlink(req.files.frontImage.tempFilePath);
        }

        if (req.files?.backImage) {
            const resultbackImage = await uploadImage(
                req.files.backImage.tempFilePath
            );

            updateFields.backImage = {
                publicId: resultbackImage.public_id,
                secureUrl: resultbackImage.secure_url,
            };

            fs.unlink(req.files.backImage.tempFilePath);
        }

        // Actualiza solo los campos que se proporcionaron en req.body
        Object.assign(existingBook, updateFields);

        const updatedBook = await existingBook.save();

        return res.status(200).json({ message: "Updated book", updatedBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndRemove(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        console.log(deletedBook);
        await deleteImage(deletedBook.frontImage.publicId);
        await deleteImage(deletedBook.backImage.publicId);

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        // console.log(error);
        if (error instanceof mongoose.Error.CastError)
            return res.status(400).send({ message: "Invalid Id" });
        console.log("Error" + error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
