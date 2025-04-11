-- CreateTable
CREATE TABLE "video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT DEFAULT 'https://via.placeholder.com/1600*900.webp',
    "watched" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);
