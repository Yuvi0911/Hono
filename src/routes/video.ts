import { Hono } from "hono";
import * as Controller from "../controllers/video.js";

const router = new Hono();

router.get("/", Controller.getAllVideos);
router.post("/",Controller.createVideo);
router.get("/:documentId", Controller.getVideoById);
router.get('/stream/:documentId', Controller.getStreamingData);
router.patch("/:documentId", Controller.updateVideoDocument);
router.delete("/:documentId", Controller.deleteDocument);

export default router;