import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import dbConnect from './db/connect.js';
import videoRoutes from "./routes/video.js"

const app = new Hono().basePath("/api");

// middlewares
app.use(poweredBy());
app.use(logger())

// dbConnect()

app.route("/video", videoRoutes);

app.onError((err, c) => {
  return c.text(`App Error: ${err.message}`)
})


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
