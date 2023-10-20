import express from "express";
import morgan from "morgan";
import cors from "cors";
import books from "./routes/book.routes.js";
import order from "./routes/shopinCar.routes.js";
import {
    createRoles,
    createCategories,
    CreateAdmin,
    saleunfo,
} from "./libs/initialSetup.js";
import Categories from "./routes/category.routes.js";
import Users from "./routes/users.routes.js";
import login from "./routes/login.routes.js";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
async function initializeApp() {
    await createRoles();
    await createCategories();
    await CreateAdmin();
}
initializeApp();
// saleunfo();
app.use(books);
app.use(Categories);
app.use(Users);
app.use(login);
app.use(order);
app.use((req, res) => {
    res.status(404).json("Ruta no encontrada");
});

export default app;
