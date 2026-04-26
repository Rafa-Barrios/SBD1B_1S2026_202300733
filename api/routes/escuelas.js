const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM ESCUELA');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM ESCUELA WHERE ID_ESCUELA = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Escuela no encontrada' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_escuela, nombre, direccion, acuerdo } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO ESCUELA VALUES (:id, :nombre, :direccion, :acuerdo)',
            [id_escuela, nombre, direccion, acuerdo], { autoCommit: true });
        res.status(201).json({ mensaje: 'Escuela creada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { nombre, direccion, acuerdo } = req.body;
        conn = await getConnection();
        await conn.execute('UPDATE ESCUELA SET NOMBRE=:nombre, DIRECCION=:direccion, ACUERDO=:acuerdo WHERE ID_ESCUELA=:id',
            [nombre, direccion, acuerdo, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Escuela actualizada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM ESCUELA WHERE ID_ESCUELA = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Escuela eliminada correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;