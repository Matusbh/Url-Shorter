// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// "Base de datos" en memoria
// { codigoCorto: urlLarga }
const urls = {};

app.use(cors());
app.use(express.json());

// Comprobar que la URL es válida
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// Generar código corto tipo "aZ83kd"
function generateCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let code = "";
  do {
    code = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      code += chars[index];
    }
  } while (urls[code]); // evitar colisiones

  return code;
}

// Ruta de prueba
app.get("/test", (req, res) => {
  res.json({ message: "Backend funcionando" });
});

// Crear URL corta: recibe { long: "https://..." }
app.post("/api/shorten", (req, res) => {
  const { long } = req.body;

  if (!long) {
    return res.status(400).json({ error: "Falta el campo 'long'" });
  }

  if (!isValidUrl(long)) {
    return res.status(400).json({ error: "URL no válida" });
  }

  const code = generateCode();
  urls[code] = long;

  const shortUrl = `${BASE_URL}/r/${code}`;

  return res.json({
    code,
    shortUrl,
    originalUrl: long,
  });
});

// Redirección: /r/codigo → URL original
app.get("/r/:code", (req, res) => {
  const { code } = req.params;
  const originalUrl = urls[code];

  if (!originalUrl) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(originalUrl);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${BASE_URL}`);
});
