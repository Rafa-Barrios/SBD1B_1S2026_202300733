const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM RESPUESTA_USUARIO');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM RESPUESTA_USUARIO WHERE ID_RESPUESTA_USUARIO = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Respuesta no encontrada' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_respuesta_usuario, pregunta_id_pregunta, examen_id_examen, respuesta } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO RESPUESTA_USUARIO VALUES (:id, :preg_id, :exam_id, :resp)',
            [id_respuesta_usuario, pregunta_id_pregunta, examen_id_examen, respuesta], { autoCommit: true });
        res.status(201).json({ mensaje: 'Respuesta creada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { respuesta } = req.body;
        conn = await getConnection();
        await conn.execute('UPDATE RESPUESTA_USUARIO SET RESPUESTA=:resp WHERE ID_RESPUESTA_USUARIO=:id',
            [respuesta, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Respuesta actualizada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM RESPUESTA_USUARIO WHERE ID_RESPUESTA_USUARIO = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Respuesta eliminada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;