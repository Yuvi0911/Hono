import { isValidObjectId } from "mongoose";
import prisma from "../../prisma/prismaClient.js";
import { stream, streamText, streamSSE } from "hono/streaming";

// get list
export const getAllVideos = async (c: any) => {
    const videos = await prisma.video.findMany();
    return c.json(
        videos.map((video: any) => video),
        200
    )
}

// Create Video document
export const createVideo = async (c:any) => {
    const formData = await c.req.json();
    if(!formData.thumbnailUrl){
        delete formData.thumbnailUrl;
    } 
    try {
        const videoCreate = await prisma.video.create({
            data: formData
        })
        return c.json(videoCreate, 201);
    } catch (error) {
        return c.json(
            (error as any)?.message || "Internal server error",
            500
        )
    }
}

// view document by Id
export const getVideoById = async (c: any) => {
    const id = parseInt(c.req.param("documentId"));

    try {
        const videoDoc = await prisma.video.findUnique({
            where: {
                id
            }
        })
        if(!videoDoc) {
            return c.json("Video document not found", 404);
        }
        return c.json(videoDoc, 200);
    } catch (error) {
        return c.json(
            (error as any)?.message || "Internal Server Error",
            500
        )
    }
}

export const getStreamingData = async (c: any) => {
    const id = parseInt(c.req.param("documentId"));

    try {
        const videoDoc = await prisma.video.findUnique({
            where: {
                id
            }
        });

        if(!videoDoc) {
            return c.json("Video document not found", 404);
        }

        return streamText(c, async(stream) => {
            stream.onAbort(() => {
                console.log('Aborted!');
            })
            for(let i = 0; i < videoDoc.description.length; i++){
                await stream.write(videoDoc.description[i])
                await stream.sleep(1000);
            }
        })
    } catch (error) {
        return c.json(
            (error as any)?.message || "Internal Server Error",
            500
        )
    }
}

export const updateVideoDocument = async (c: any) => {
    const id = parseInt(c.req.param("documentId"));

    try {
        const document = await prisma.video.findUnique({
            where: {
                id
            }
        })

        if(!document) {
            return c.json("Document not found", 404);
        }

        const formData = await c.req.json();

        if(!formData.thumbnailUrl) delete formData.thumbnailUrl;

        const updatedDocument = await prisma.video.update({
            where: {
                id
            },
            data: formData
        });

        return c.json(updatedDocument, 200);

    } catch (error) {
        return c.json(
            (error as any)?.message || "Internal Server Error",
            500
        ) 
    }
}

export const deleteDocument = async (c: any) => {
    const id = parseInt(c.req.param("documentId"));

    try {
        const deletedDoc = await prisma.video.delete({
            where: {
                id
            }
        })

        return c.json(deletedDoc, 200);

    } catch (error) {
        return c.json(
            (error as any)?.message || "Internal Server Error",
            500
        ) 
    }
}