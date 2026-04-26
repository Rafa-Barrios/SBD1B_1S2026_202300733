const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rutas CRUD
app.use('/centros', require('./routes/centros'));
app.use('/escuelas', require('./routes/escuelas'));
app.use('/ubicaciones', require('./routes/ubicaciones'));
app.use('/departamentos', require('./routes/departamentos'));
app.use('/municipios', require('./routes/municipios'));
app.use('/registros', require('./routes/registros'));
app.use('/correlativos', require('./routes/correlativos'));
app.use('/examenes', require('./routes/examenes'));
app.use('/preguntas', require('./routes/preguntas'));
app.use('/preguntas-practico', require('./routes/preguntasPractico'));
app.use('/respuestas-usuario', require('./routes/respuestasUsuario'));
app.use('/respuestas-practico', require('./routes/respuestasPractico'));

// Rutas consultas estadísticas
app.use('/consultas', require('./routes/consultas'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});