import Sale from "../models/Sale.js";

export const getByIdSale = async (req, res) => {
    const { idUser } = req.params;

    const sale = await Sale.findById(idUser);

    if (!sale) return res.status(400).json({ message: "No sale" });

    return res.status(200).json({ message: "ok" }, response);
};


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
            itemCounts += item.quantity;
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
