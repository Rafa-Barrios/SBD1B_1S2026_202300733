const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM RESPUESTA_PRACTICO_USUARIO');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM RESPUESTA_PRACTICO_USUARIO WHERE ID_RESPUESTA_PRACTICO = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Respuesta práctica no encontrada' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_respuesta_practico, pregunta_practico_id_pregunta_practico, examen_id_examen, nota } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO RESPUESTA_PRACTICO_USUARIO VALUES (:id, :preg_id, :exam_id, :nota)',
            [id_respuesta_practico, pregunta_practico_id_pregunta_practico, examen_id_examen, nota], { autoCommit: true });
        res.status(201).json({ mensaje: 'Respuesta práctica creada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { nota } = req.body;
        conn = await getConnection();
        await conn.execute('UPDATE RESPUESTA_PRACTICO_USUARIO SET NOTA=:nota WHERE ID_RESPUESTA_PRACTICO=:id',
            [nota, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Respuesta práctica actualizada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM RESPUESTA_PRACTICO_USUARIO WHERE ID_RESPUESTA_PRACTICO = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Respuesta práctica eliminada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;