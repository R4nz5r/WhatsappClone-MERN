// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors"

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1786847",
  key: "f765239b13509026615a",
  secret: "2ed0c29bbec4be69921d",
  cluster: "ap1",
  useTLS: true
});


// middleware
app.use(express.json());
app.use(cors())

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// })

// DB configuration
const connection_url =
  "mongodb+srv://ragib:ragib@cluster0.4wwsbks.mongodb.net/WhatsApp_mern?retryWrites=true&w=majority";

mongoose
  .connect(connection_url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const db =mongoose.connection
db.once('open',()=>{
  console.log("DB is connected successfully")

  const msgCollection =db.collection("messagecontents")
  const changeStream = msgCollection.watch()

  changeStream.on('change',(change)=>{
    console.log(change)

    if(change.operationType=== "insert"){
      const messageDetails = change.fullDocument;
      pusher.trigger("messages","inserted",{
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recevied: messageDetails.recevied,
      });
    } else{
      console.log("Error trigering Pusher")
    }
  })
})

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/messages/new", async (req, res) => {
  try {
    const dbMessage = req.body;
    const createdMessage = await Messages.create(dbMessage); // Use await with create method
    res.status(201).send(createdMessage); // Send the created message back
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).send(error.message); // Send error message in response
  }
});

// app.get("/messages/sync", async (req, res) => {
//  await Messages.find((err,data) =>{
//   if(err) {
//     res.status(500).send(err); 
//   }
//   else{
//     res.status(200).send(data);
//   }
//  })
// });
app.get("/messages/sync", async (req, res) => {
  try {
    const data = await Messages.find(); // Using await with find method
    res.status(200).send(data); // Send the data fetched from the database
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send(error.message); // Send error message in response
  }
});
 



// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
