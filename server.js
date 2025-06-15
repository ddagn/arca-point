
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Para servir tu evaluacion.html desde carpeta /public

const csvPath = path.join(__dirname, 'evaluaciones.csv');

// Si el archivo no existe, escribe encabezados
if (!fs.existsSync(csvPath)) {
  fs.writeFileSync(csvPath, '"ID Visita","Comentario","Nota","NombreArchivo"\n');
}

app.post('/guardar-evaluacion', (req, res) => {
  const { idVisita, comentario, nota, nombreArchivo } = req.body;
  const fila = `"\${idVisita}","\${comentario}","\${nota}","\${nombreArchivo}"\n`;
  fs.appendFile(csvPath, fila, err => {
    if (err) {
      console.error('❌ Error al escribir CSV:', err);
      return res.status(500).send('Error al guardar');
    }
    console.log('✅ Evaluación guardada:', fila.trim());
    res.send('OK');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:\${PORT}`);
});
