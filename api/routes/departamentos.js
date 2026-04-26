const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM DEPARTAMENTO');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM DEPARTAMENTO WHERE ID_DEPARTAMENTO = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Departamento no encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_departamento, nombre, codigo } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO DEPARTAMENTO VALUES (:id, :nombre, :codigo)',
            [id_departamento, nombre, codigo], { autoCommit: true });
        res.status(201).json({ mensaje: 'Departamento creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { nombre, codigo } = req.body;
        conn = await getConnection();
        await conn.execute('UPDATE DEPARTAMENTO SET NOMBRE=:nombre, CODIGO=:codigo WHERE ID_DEPARTAMENTO=:id',
            [nombre, codigo, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Departamento actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM DEPARTAMENTO WHERE ID_DEPARTAMENTO = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Departamento eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;