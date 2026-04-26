const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM UBICACION');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { escuela_id_escuela, centro_id_centro } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO UBICACION VALUES (:esc_id, :cen_id)',
            [escuela_id_escuela, centro_id_centro], { autoCommit: true });
        res.status(201).json({ mensaje: 'Ubicación creada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/', async (req, res) => {
    let conn;
    try {
        const { escuela_id_escuela, centro_id_centro } = req.body;
        conn = await getConnection();
        await conn.execute('DELETE FROM UBICACION WHERE ESCUELA_ID_ESCUELA=:esc_id AND CENTRO_ID_CENTRO=:cen_id',
            [escuela_id_escuela, centro_id_centro], { autoCommit: true });
        res.json({ mensaje: 'Ubicación eliminada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;