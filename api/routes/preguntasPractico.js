const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM PREGUNTAS_PRACTICO');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM PREGUNTAS_PRACTICO WHERE ID_PREGUNTA_PRACTICO = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Pregunta práctica no encontrada' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_pregunta_practico, pregunta_texto, punteo } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO PREGUNTAS_PRACTICO VALUES (:id, :texto, :punteo)',
            [id_pregunta_practico, pregunta_texto, punteo], { autoCommit: true });
        res.status(201).json({ mensaje: 'Pregunta práctica creada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { pregunta_texto, punteo } = req.body;
        conn = await getConnection();
        await conn.execute('UPDATE PREGUNTAS_PRACTICO SET PREGUNTA_TEXTO=:texto, PUNTEO=:punteo WHERE ID_PREGUNTA_PRACTICO=:id',
            [pregunta_texto, punteo, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Pregunta práctica actualizada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM PREGUNTAS_PRACTICO WHERE ID_PREGUNTA_PRACTICO = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Pregunta práctica eliminada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;