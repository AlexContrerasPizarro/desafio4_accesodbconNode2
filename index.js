const { postPosts, getPosts, putPosts, deletePosts } = require("./posts");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.listen(3000, console.log("Servidor encendido"));

app.get("/", () => {
  try {
    res.sendFile(`${__dirname}/index.html`);
  } catch (error) {
    res.send(error);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.send(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;
    await postPosts(titulo, url, descripcion, likes);
    res.send("post agregado");
  } catch (error) {
    res.send(error);
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await putPosts(id);
    res.send("post actualizado");
  } catch (error) {
    res.send(error);
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deletePosts(id);
    res.send("post eliminado.");
  } catch (error) {
    res.send(error);
  }
});
