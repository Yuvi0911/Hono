import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { v4 as uuidv4 } from "uuid";
import { stream, streamText, streamSSE } from "hono/streaming";

let videos = [];
const app = new Hono();

app.get('/', (c) => {
    return c.html('<h1>My name is Yuvi</h1>');
})

app.post('/video', async(c) => {
    const {videoName, channelName, duration} = await c.req.json();

    const newVideo = {
        id: uuidv4(),
        videoName,
        channelName,
        duration
    }

    videos.push(newVideo);

    // hume response send krne k liye express ki trh res likhne ki jrurt nhi h.
    return c.json(newVideo);
})

// yadi hum is route ki testing postman me krege toh saara data ek saath show hoga kyoki postmn me abhi vo functionality nhi h ki vo stream ki format me show kr ske isliye hum directly browser me jaa kr is route ko check krege.
// jab respose llm k through aata h aur hume stream k form me data dikhana hota h toh hum iska use krte h.
// jo bhi response aata jaiye ga llm se stream usko hold krne ki jagah directly frontend ko pass krta rhega.
// read all (using stream)
app.get('/videos', (c) => {
    return streamText(c, async(stream) => {
        for(const video of videos){
            // directly frontend ko bhej dega isme jo data aaye ga.
            await stream.writeln(JSON.stringify(video));
            // 1 sec k liye wait krega agli line bhejne k liye.
            await stream.sleep(1000);
        }
    })
})

// Read by Id
app.get('/video/:id', (c) => {
    const { id } = c.req.param();
    
    // find the video into array whose id is matched from the id given into param.
    const video = videos.find((video) => video.id === id)

    if(!video) {
        return c.json(({message: "Video not found"}, 404))
    }
    return c.json(video);
})

// update by Id
app.put('/video/:id', async(c) => {
    const {id} = c.req.param();
    console.log("id: ", id);
    const { videoName, channelName, duration } = await c.req.json();

    const index = videos.findIndex((video) => video.id === id);
    console.log("index: ", index);

    const video = videos.find((video) => video.id === id);
    console.log("video: ", video);

    if(!video) {
        return c.json(({message: "Video not found"}, 404));
    }

    video.videoName = videoName;
    video.channelName = channelName;
    video.duration = duration;

    return c.json(video);

})

// delete by Id
app.delete('/video/:id', async (c) => {
    const {id} = c.req.param();
    console.log("id: ", id);

    videos = videos.filter((video) => video.id !== id);
    console.log("video: ", videos);

    return c.json({message: "Video deleted"});
})

// delete all videos
app.delete('/videos', (c) => {
    videos = [];
    return c.json({message: "All videos deleted"})
})

// serve(app) => by default 3000 port pr chla dega app ko.
serve({
    fetch: app.fetch,
    port: 8080
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})

