import { Schema, model } from "mongoose";

export interface IVideoSchema {
    title: string;
    description: string;
    thumbnailUrl ?: string;
    watched: boolean;
    youtuberName: string;
}

const VideoSchema =  new Schema<IVideoSchema> ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    thumbnailUrl: {
        type: String,
        default: "https://via.placeholder.com/1600*900.webp",
        required: false,
    },
    watched: {
        type: Boolean,
        default: false,
        required: true,
    },
    youtuberName: {
        type: String,
        required: true,
    }
})

const VideoModel = model('Video', VideoSchema);

export default VideoModel;