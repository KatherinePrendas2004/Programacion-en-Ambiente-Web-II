const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client')));

// Ruta para servir el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Ruta de tipo de cambio
app.get('/tipocambio', (req, res) => {
  let response = {};
  switch (req.query.type) {
    case 'usd':
      response = {
        "TipoCompraDolares": "621",
        "TipoVentaDolares": "631"
      };
      break;
    case 'eur':
      response = {
        "TipoCompraEuros": "731.85",
        "TipoVentaEuros": "761.9"
      };
      break;
    default:
      response = {
        "TipoCompraDolares": "621",
        "TipoVentaDolares": "631",
        "TipoCompraEuros": "731.85",
        "TipoVentaEuros": "761.9"
      };
      break;
  }
  res.json(response);
});

// Definir puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
