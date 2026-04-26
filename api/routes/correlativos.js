const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM CORRELATIVO');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM CORRELATIVO WHERE ID_CORRELATIVO = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Correlativo no encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_correlativo, fecha, no_examen } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO CORRELATIVO VALUES (:id, TO_DATE(:fecha,\'YYYY-MM-DD\'), :no)',
            [id_correlativo, fecha, no_examen], { autoCommit: true });
        res.status(201).json({ mensaje: 'Correlativo creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { no_examen } = req.body;
        conn = await getConnection();
        await conn.execute('UPDATE CORRELATIVO SET NO_EXAMEN=:no WHERE ID_CORRELATIVO=:id',
            [no_examen, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Correlativo actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM CORRELATIVO WHERE ID_CORRELATIVO = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Correlativo eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;