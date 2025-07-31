import express from "express";
import * as mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import categoryRouter from "./src/routes/categories";
import productRouter from "./src/routes/products";
import postRouter from "./src/routes/posts";
import usersRouter from "./src/routes/users";
import superAdminRouter from "./src/routes/superadmin";
import requestRouter from "./src/routes/requests";
import portfolioItemRouter from "./src/routes/portfolioItems";
import contactsRouter from "./src/routes/contacts";
import path from "path";
import serviceRouter from "./src/routes/services";


const app = express();
const port = 8000;

app.use(
    cors({
        origin: ["http://localhost:3000", "http://frontend:3000"],
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.static("public"));
app.use('/api/post', express.static(path.join(config.publicPath, 'posts')));
app.use('/api/product', express.static(path.join(config.publicPath, 'products')));
app.use('/api/portfolio', express.static(path.join(config.publicPath, 'portfolio')));
app.use('/api/laminate', express.static(path.join(config.publicPath, 'laminate')));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/superadmin', superAdminRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/posts', postRouter);
app.use('/api/requests', requestRouter)
app.use('/api/portfolio-items', portfolioItemRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/services', serviceRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);
