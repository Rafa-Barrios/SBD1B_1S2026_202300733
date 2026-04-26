const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM MUNICIPIO');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM MUNICIPIO WHERE ID_MUNICIPIO = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Municipio no encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_municipio, departamento_id_departamento, nombre, codigo } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO MUNICIPIO VALUES (:id, :dep_id, :nombre, :codigo)',
            [id_municipio, departamento_id_departamento, nombre, codigo], { autoCommit: true });
        res.status(201).json({ mensaje: 'Municipio creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { nombre, codigo } = req.body;
        conn = await getConnection();
        await conn.execute('UPDATE MUNICIPIO SET NOMBRE=:nombre, CODIGO=:codigo WHERE ID_MUNICIPIO=:id',
            [nombre, codigo, req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Municipio actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM MUNICIPIO WHERE ID_MUNICIPIO = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Municipio eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;