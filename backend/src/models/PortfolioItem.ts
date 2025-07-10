import mongoose, {Schema} from "mongoose";
import {PortfolioItemDocument} from "../../types";

const GalleryItemSchema = new Schema({
    image: {type: String, required: true},
    alt: {type: String, default: null, maxLength: 150},
});

const PortfolioItemSchema = new mongoose.Schema({
    cover: {
        type: String,
        required: [true, "Поле обложки портфолио обязательно"],
    },
    coverAlt: {
        type: String,
        required:[true, "Альтер-ое название обложки портфолио обязательно"],
        maxLength: 150,
    },
    gallery: {
        type: [GalleryItemSchema],
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
});

const PortfolioItem = mongoose.model<PortfolioItemDocument>("PortfolioItem", PortfolioItemSchema);
export { PortfolioItem };