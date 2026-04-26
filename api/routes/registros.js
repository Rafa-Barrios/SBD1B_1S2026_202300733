const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM REGISTRO');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM REGISTRO WHERE ID_REGISTRO = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_registro, ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
            municipio_id_municipio, municipio_departamento_id_departamento,
            fecha, tipo_tramite, tipo_licencia, nombre_completo, genero } = req.body;
        conn = await getConnection();
        await conn.execute(
            `INSERT INTO REGISTRO VALUES (:id, :esc_id, :cen_id, :mun_id, :dep_id, 
            TO_DATE(:fecha,'YYYY-MM-DD'), :tramite, :licencia, :nombre, :genero)`,
            [id_registro, ubicacion_escuela_id_escuela, ubicacion_centro_id_centro,
            municipio_id_municipio, municipio_departamento_id_departamento,
            fecha, tipo_tramite, tipo_licencia, nombre_completo, genero],
            { autoCommit: true });
        res.status(201).json({ mensaje: 'Registro creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { nombre_completo, tipo_tramite, tipo_licencia, genero } = req.body;
        conn = await getConnection();
        await conn.execute(
            'UPDATE REGISTRO SET NOMBRE_COMPLETO=:nombre, TIPO_TRAMITE=:tramite, TIPO_LICENCIA=:licencia, GENERO=:genero WHERE ID_REGISTRO=:id',
            [nombre_completo, tipo_tramite, tipo_licencia, genero, req.params.id],
            { autoCommit: true });
        res.json({ mensaje: 'Registro actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM REGISTRO WHERE ID_REGISTRO = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Registro eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;