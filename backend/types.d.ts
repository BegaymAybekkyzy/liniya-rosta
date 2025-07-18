import {Types} from "mongoose";

export interface Product {
    _id: string;
    category: string;
    title: string;
    description: string | null;
    image: string | null;
}

export interface Category {
    _id: string;
    title: string;
    slug?: string;
}

export interface UserFields {
    email: string;
    password: string;
    refreshToken: string;
    role: "admin" | "superadmin";
    __confirmPassword: string;
    displayName: string;
}

export interface UpdatesRequest {
    name?: string;
    email?: string;
    phone?: string;
    status?: 'Новая' | 'В работе' | 'Завершена' | 'Отклонена';
    commentOfManager?: string | null;
    isArchived?: string;
}

export interface ContactFields {
    location: string;
    phone1: string;
    phone2?: string;
    email: string;
    workingHours: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    mapLocation: string;
    linkLocation: string;
    instagram: string;
    whatsapp: string;
}

export interface PortfolioUpdate{
    cover?: string;
    description?: string;
    coverAlt?: string;
}

export interface GalleryUpdate {
    "gallery.$.image"?: string;
    "gallery.$.alt"?: string;
}


export interface ServiceUpdate {
    title?: string;
    description?: string;
}

export interface FileRequestFiles {
    [fieldname: string]: Express.Multer.File[];
}

export interface RequestWithFiles extends Express.Request {
    files?: FileRequestFiles;
}

export interface RequestWithFile extends Express.Request {
    file?: Express.Multer.File;
}

export interface GalleryItem {
    _id: Types.ObjectId;
    image: string;
    alt?: string;
}

export interface DocumentWithGallery extends Document {
    gallery: GalleryItem[];
}

export interface DocumentWithImages extends Document, IDocumentWithImages {}

export interface IDocumentWithImages {
    image?: string;
    cover?: string;
    gallery?: IGalleryItem[];
}

export interface IGalleryItem {
    _id: Types.ObjectId;
    image: string;
    alt?: string;
}

export interface IProduct extends IDocumentWithImages {
    category: Types.ObjectId;
    title: string;
    description?: string;
    image: string;
}

export interface IPost extends IDocumentWithImages {
    title: string;
    description: string;
    image: string;
}

export interface IPortfolioItem extends IDocumentWithGallery {
    cover?: string;
    coverAlt?: string;
    description?: string;
    gallery: IGalleryItem[];
}

export type ProductDocument = Document & IProduct;
export type PostDocument = Document & IPost;
export type PortfolioItemDocument = Document & IPortfolioItem;

export interface ImageItem {
    alt?: string;
    image: string;
}

export interface updatePost {
    title?: string;
    description?: string;
    images?: {alt?: string, image: string}[];
}
