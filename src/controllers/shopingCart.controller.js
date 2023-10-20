import Book from "../models/Book.js";
import CartItem from "../models/Order.js";
import Sale from "../models/Sale.js";

export const addToCart = async (req, res) => {
    try {
        const {userId, productId, quantity, percentDiscount} = req.body;
        const book = await  Book.findById(productId)

        if(!book){
            return res.status(404).json({message:"Book not found"})
        }

        //verificar si hay una entrada en el carrito para el libro del usuario
        let cartItem = await CartItem.findOne({book:productId, userId})
        if(!cartItem){
            //si no existe una entrada en el carrito crea una nueva
            cartItem = new CartItem({
                book:productId,
                userId,
                quantity:quantity|| 1,
                totalPrice: (book.price * (quantity || 1)) - (percentDiscount || 0), 
                unitPrice:book.price
            })
        }
        else{
            cartItem.quantity+= quantity|| 1;
            cartItem.totalPrice = (book.price *  cartItem.quantity) - ( percentDiscount || 0),
            cartItem.unitPrice = book.price
        }
        await cartItem.save();
        res.status(201).json({ message: "Book add to cart successfully", cartItem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
    
};

export const getCart  = async (req, res)=>{
    try {
        const userId = req.params.userId;
        // Busca el carrito del usuario específico
        const cart  = await  CartItem.find({ userId}).populate({
        path:"book",
        populate:{
            path:"id_category",
            model:"Category"
        }
        });
        if (!cart || cart.length === 0) {
            return res.status(404).json({ message: "No cart found for this user" });
            }
            const response = {
                data: cart.map((cartItem) => ({
                    bookId: cartItem.book._id,
                    name: cartItem.book.name,
                    frontImage: cartItem.book.frontImage.secureUrl,
                    backImage: cartItem.book.backImage.secureUrl,
                    quantity: cartItem.quantity,
                    unitPrice: cartItem.unitPrice, 
                    totalPrice: cartItem.totalPrice,
                    categoryNames: cartItem.book.id_category
                        .map((category) => category.name)
                        .join(","),
                })),
            };            
        return res.status(200).json(response);
    } catch (error) {
        console.log("error"+ error)
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateCartItemQuantity  = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
}


export const removeFromCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookIdToRemove = req.params.productId; 
        
        const cartItem = await CartItem.findOne({ userId, book: bookIdToRemove });

        if (!cartItem) {
            return res.status(404).json({ message: "Book not found in the user's cart" });
        }
        
        await cartItem.deleteOne();

        return res.status(200).json({ message: "Book removed from the cart successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const removeAllCart = async (req, res)=>{
try {
    const userId = req.params.userId;
    await CartItem.deleteMany({userId});
    return res.status(200).json({ message: "Cart cleared successfully" });

} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
}
}


export const processPayment = async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await CartItem.find({ userId });

        if (!cart || cart.length === 0) {
            return res.status(404).json({ message: "Cart not found for the user" });
        }

        let totalAmount = 0;
        // let itemCounts = 0;

        for (const item of cart) {
            totalAmount += item.totalPrice;
            // itemCounts += item.quantity;
        }
        //la lógica de pago

        // Crear una venta registrando los libros comprados, el monto total 
        const sale = new Sale({
            idUser: userId,
            idbooks: cart.map(item => item.book),
            amoun: totalAmount,
            // itemCounts: itemCounts 
        });

        await sale.save();
        await CartItem.deleteMany({ userId });
        res.status(200).json({ message: "Payment successful, cart cleared", sale });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
