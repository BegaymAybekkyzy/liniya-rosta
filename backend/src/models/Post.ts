import mongoose from "mongoose";
import {PostDocument} from "../../types";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Поле заголовка обязательно для заполнения"],
    },
    description: {
        type: String,
        required: [true, "Поле описания обязательно для заполнения"],
    },
    image: {
        type: String,
        required: [true, "Фото обязательно для заполнения"],
    },
});

const Post = mongoose.model<PostDocument>("Post", PostSchema);
export default Post
