import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, "public"),
    db: process.env.MONGO_URL || "mongodb://mongo:27017/liniya-rosta"
};

export default config;