const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

// CONSULTA 1 - Estadísticas por centro y escuela
router.get('/estadisticas', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute(`
            SELECT 
                C.NOMBRE AS CENTRO,
                E.NOMBRE AS ESCUELA,
                COUNT(EX.ID_EXAMEN) AS TOTAL_EXAMENES,
                ROUND(AVG(
                    (SELECT COUNT(*) FROM RESPUESTA_USUARIO RU 
                     JOIN PREGUNTAS P ON RU.PREGUNTA_ID_PREGUNTA = P.ID_PREGUNTA
                     WHERE RU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN 
                     AND RU.RESPUESTA = P.RESPUESTA) * 4
                ), 2) AS PROMEDIO_TEORICO,
                ROUND(AVG(
                    (SELECT NVL(SUM(RPU.NOTA), 0) FROM RESPUESTA_PRACTICO_USUARIO RPU
                     WHERE RPU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN)
                ), 2) AS PROMEDIO_PRACTICO,
                COUNT(CASE WHEN (
                    (SELECT COUNT(*) FROM RESPUESTA_USUARIO RU 
                     JOIN PREGUNTAS P ON RU.PREGUNTA_ID_PREGUNTA = P.ID_PREGUNTA
                     WHERE RU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN 
                     AND RU.RESPUESTA = P.RESPUESTA) * 4 >= 70
                    AND
                    (SELECT NVL(SUM(RPU.NOTA), 0) FROM RESPUESTA_PRACTICO_USUARIO RPU
                     WHERE RPU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN) >= 70
                ) THEN 1 END) AS APROBADOS
            FROM EXAMEN EX
            JOIN REGISTRO R ON EX.REGISTRO_ID_REGISTRO = R.ID_REGISTRO
            JOIN CENTRO C ON R.UBICACION_CENTRO_ID_CENTRO = C.ID_CENTRO
            JOIN ESCUELA E ON R.UBICACION_ESCUELA_ID_ESCUELA = E.ID_ESCUELA
            GROUP BY C.NOMBRE, E.NOMBRE
            ORDER BY C.NOMBRE, E.NOMBRE
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// CONSULTA 2 - Ranking de evaluados por resultado final
router.get('/ranking', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute(`
            SELECT 
                RANK() OVER (ORDER BY 
                    NVL((SELECT COUNT(*) FROM RESPUESTA_USUARIO RU 
                         JOIN PREGUNTAS P ON RU.PREGUNTA_ID_PREGUNTA = P.ID_PREGUNTA
                         WHERE RU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN 
                         AND RU.RESPUESTA = P.RESPUESTA) * 4, 0)
                    +
                    NVL((SELECT SUM(RPU.NOTA) FROM RESPUESTA_PRACTICO_USUARIO RPU
                         WHERE RPU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN), 0)
                DESC) AS POSICION,
                R.NOMBRE_COMPLETO,
                R.TIPO_LICENCIA,
                NVL((SELECT COUNT(*) FROM RESPUESTA_USUARIO RU 
                     JOIN PREGUNTAS P ON RU.PREGUNTA_ID_PREGUNTA = P.ID_PREGUNTA
                     WHERE RU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN 
                     AND RU.RESPUESTA = P.RESPUESTA) * 4, 0) AS NOTA_TEORICA,
                NVL((SELECT SUM(RPU.NOTA) FROM RESPUESTA_PRACTICO_USUARIO RPU
                     WHERE RPU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN), 0) AS NOTA_PRACTICA,
                NVL((SELECT COUNT(*) FROM RESPUESTA_USUARIO RU 
                     JOIN PREGUNTAS P ON RU.PREGUNTA_ID_PREGUNTA = P.ID_PREGUNTA
                     WHERE RU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN 
                     AND RU.RESPUESTA = P.RESPUESTA) * 4, 0)
                +
                NVL((SELECT SUM(RPU.NOTA) FROM RESPUESTA_PRACTICO_USUARIO RPU
                     WHERE RPU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN), 0) AS TOTAL,
                CASE WHEN 
                    NVL((SELECT COUNT(*) FROM RESPUESTA_USUARIO RU 
                         JOIN PREGUNTAS P ON RU.PREGUNTA_ID_PREGUNTA = P.ID_PREGUNTA
                         WHERE RU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN 
                         AND RU.RESPUESTA = P.RESPUESTA) * 4, 0) >= 70
                    AND
                    NVL((SELECT SUM(RPU.NOTA) FROM RESPUESTA_PRACTICO_USUARIO RPU
                         WHERE RPU.EXAMEN_ID_EXAMEN = EX.ID_EXAMEN), 0) >= 70
                THEN 'APROBADO' ELSE 'REPROBADO' END AS RESULTADO
            FROM EXAMEN EX
            JOIN REGISTRO R ON EX.REGISTRO_ID_REGISTRO = R.ID_REGISTRO
            ORDER BY TOTAL DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// CONSULTA 3 - Pregunta con menor porcentaje de aciertos
router.get('/pregunta-dificil', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute(`
            SELECT 
                P.ID_PREGUNTA,
                P.PREGUNTA_TEXTO,
                COUNT(RU.ID_RESPUESTA_USUARIO) AS TOTAL_RESPUESTAS,
                COUNT(CASE WHEN RU.RESPUESTA = P.RESPUESTA THEN 1 END) AS ACIERTOS,
                ROUND(
                    COUNT(CASE WHEN RU.RESPUESTA = P.RESPUESTA THEN 1 END) * 100.0 
                    / NULLIF(COUNT(RU.ID_RESPUESTA_USUARIO), 0)
                , 2) AS PORCENTAJE_ACIERTOS
            FROM PREGUNTAS P
            LEFT JOIN RESPUESTA_USUARIO RU ON P.ID_PREGUNTA = RU.PREGUNTA_ID_PREGUNTA
            GROUP BY P.ID_PREGUNTA, P.PREGUNTA_TEXTO
            ORDER BY PORCENTAJE_ACIERTOS ASC
            FETCH FIRST 1 ROWS ONLY
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

module.exports = router;