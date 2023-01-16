const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'adm123',
  database: 'likeme',
  allowExitOnIdle: true
})

const getPosts = async () => {
  const { rows } = await pool.query("Select * From posts");
  console.log(rows);
  return rows;
};

const postPosts = async (titulo, url, descripcion, likes) => {
  likes = null ? (likes = 0) : (likes = 0);
  const consulta = "Insert Into posts Values (DEFAULT, $1, $2, $3, $4)"
  const values = [titulo, url, descripcion, likes];
  await pool.query(consulta, values);
  // console.log("post agregado");
};

const putPosts = async (id) => {
  const consulta = "Update posts SET likes = likes + 1 where id=$1";
  const values = [id];
  await pool.query(consulta, values);
};

const deletePosts = async (id) => {
  const consulta = "Delete from posts where id = $1";
  const values = [id];
  await pool.query(consulta, values);
  // console.log("post eliminado");
};

module.exports = { postPosts, getPosts, putPosts, deletePosts };
