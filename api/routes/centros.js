const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

// GET - Obtener todos los centros
router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM CENTRO');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// GET - Obtener un centro por ID
router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute(
            'SELECT * FROM CENTRO WHERE ID_CENTRO = :id',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Centro no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// POST - Crear un nuevo centro
router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_centro, nombre } = req.body;
        conn = await getConnection();
        await conn.execute(
            'INSERT INTO CENTRO VALUES (:id, :nombre)',
            [id_centro, nombre],
            { autoCommit: true }
        );
        res.status(201).json({ mensaje: 'Centro creado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// PUT - Actualizar un centro
router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { nombre } = req.body;
        conn = await getConnection();
        await conn.execute(
            'UPDATE CENTRO SET NOMBRE = :nombre WHERE ID_CENTRO = :id',
            [nombre, req.params.id],
            { autoCommit: true }
        );
        res.json({ mensaje: 'Centro actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

// DELETE - Eliminar un centro
router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute(
            'DELETE FROM CENTRO WHERE ID_CENTRO = :id',
            [req.params.id],
            { autoCommit: true }
        );
        res.json({ mensaje: 'Centro eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) await conn.close();
    }
});

module.exports = router;