const express = require('express');
const router = express.Router();
const { getConnection } = require('../db');

router.get('/', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM EXAMEN');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.get('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const result = await conn.execute('SELECT * FROM EXAMEN WHERE ID_EXAMEN = :id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Examen no encontrado' });
        res.json(result.rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.post('/', async (req, res) => {
    let conn;
    try {
        const { id_examen, registro_id_escuela, registro_id_centro,
            registro_municipio_id_municipio, registro_municipio_departamento_id_departamento,
            registro_id_registro, correlativo_id_correlativo } = req.body;
        conn = await getConnection();
        await conn.execute('INSERT INTO EXAMEN VALUES (:id, :esc_id, :cen_id, :mun_id, :dep_id, :reg_id, :cor_id)',
            [id_examen, registro_id_escuela, registro_id_centro,
            registro_municipio_id_municipio, registro_municipio_departamento_id_departamento,
            registro_id_registro, correlativo_id_correlativo], { autoCommit: true });
        res.status(201).json({ mensaje: 'Examen creado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.put('/:id', async (req, res) => {
    let conn;
    try {
        const { registro_id_registro, correlativo_id_correlativo } = req.body;
        conn = await getConnection();
        await conn.execute(
            'UPDATE EXAMEN SET REGISTRO_ID_REGISTRO=:reg_id, CORRELATIVO_ID_CORRELATIVO=:cor_id WHERE ID_EXAMEN=:id',
            [registro_id_registro, correlativo_id_correlativo, req.params.id],
            { autoCommit: true }
        );
        res.json({ mensaje: 'Examen actualizado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

router.delete('/:id', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        await conn.execute('DELETE FROM EXAMEN WHERE ID_EXAMEN = :id', [req.params.id], { autoCommit: true });
        res.json({ mensaje: 'Examen eliminado correctamente' });
    } catch (err) { res.status(500).json({ error: err.message }); }
    finally { if (conn) await conn.close(); }
});

module.exports = router;