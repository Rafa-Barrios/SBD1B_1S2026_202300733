const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM PREGUNTAS');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM PREGUNTAS WHERE ID_PREGUNTA = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Pregunta no encontrada' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_pregunta, pregunta_texto, respuesta, res1, res2, res3, res4 } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO PREGUNTAS VALUES (:id, :texto, :resp, :r1, :r2, :r3, :r4)',
            [id_pregunta, pregunta_texto, respuesta, res1, res2, res3, res4], { autoCommit: true });
        res.status(201).json({ mensaje: 'Pregunta creada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { pregunta_texto, respuesta, res1, res2, res3, res4 } = req.body;
        conn = await getConnection();
        await conn.execute(
            'UPDATE PREGUNTAS SET PREGUNTA_TEXTO=:texto, RESPUESTA=:resp, RES1=:r1, RES2=:r2, RES3=:r3, RES4=:r4 WHERE ID_PREGUNTA=:id',
            [pregunta_texto, respuesta, res1, res2, res3, res4, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Pregunta actualizada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM PREGUNTAS WHERE ID_PREGUNTA = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Pregunta eliminada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;