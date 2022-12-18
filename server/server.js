// Import Express
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const routes = require("./routes");

const path = require('path');

//Apollo GraphQl
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { db } = require("./models/User");
const server = new ApolloServer({
  typeDefs,
  resolvers,
});



// Create an instance of express
const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================================
// Routing
// ==========================================================
app.use(routes);
// ==========================================================

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const PORT = process.env.PORT || 3001;

// Use app.listen() as an object we can pass through socket.io
const server = app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});

// ==========================================================
// ==========================================================
// Socket.io
// ==========================================================
// ==========================================================
const io = require("socket.io")(server, {
  // If a user hasn't sent anything in 60 seconds, close the connection to save the bandwidth
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("chat message", message => {
    io.emit("chat message", message);
  });

  // Typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  });


const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`USE GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

startApolloServer(typeDefs, resolvers);
