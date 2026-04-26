ALTER SESSION SET CURRENT_SCHEMA = SYSTEM;

-- DEPARTAMENTOS
INSERT INTO DEPARTAMENTO VALUES (1, 'Guatemala', 01);
INSERT INTO DEPARTAMENTO VALUES (2, 'Sacatepéquez', 03);
INSERT INTO DEPARTAMENTO VALUES (3, 'Escuintla', 05);

-- MUNICIPIOS
INSERT INTO MUNICIPIO VALUES (1, 1, 'Guatemala', 01);
INSERT INTO MUNICIPIO VALUES (2, 1, 'Mixco', 02);
INSERT INTO MUNICIPIO VALUES (3, 1, 'Villa Nueva', 03);
INSERT INTO MUNICIPIO VALUES (4, 3, 'Escuintla', 01);
INSERT INTO MUNICIPIO VALUES (5, 2, 'Antigua Guatemala', 01);

-- CENTROS
INSERT INTO CENTRO VALUES (1, 'Centro de Evaluación Zona 12');
INSERT INTO CENTRO VALUES (2, 'Centro de Evaluación Antigua Guatemala');
INSERT INTO CENTRO VALUES (3, 'Centro de Evaluación Escuintla');

-- ESCUELAS
INSERT INTO ESCUELA VALUES (1, 'Escuela de Manejo AutoMaster', 'Avenida Reforma 15-45, Zona 10', 'ESC-AM-001');
INSERT INTO ESCUELA VALUES (2, 'Academia Vial GuateDrive', 'Boulevard Los Próceres 18-20, Zona 10', 'ESC-GD-002');
INSERT INTO ESCUELA VALUES (3, 'Instituto de Conducción Segura', 'Calzada Roosevelt 25-30, Zona 11', 'ESC-ICS-003');

-- UBICACIONES
INSERT INTO UBICACION VALUES (1, 1);
INSERT INTO UBICACION VALUES (1, 2);
INSERT INTO UBICACION VALUES (2, 1);
INSERT INTO UBICACION VALUES (3, 2);
INSERT INTO UBICACION VALUES (3, 3);

-- REGISTROS
INSERT INTO REGISTRO VALUES (1, 1, 1, 1, 1, TO_DATE('2025-01-15','YYYY-MM-DD'), 'Licencia de Conducir', 'A', 'Juan Carlos López García', 'M');
INSERT INTO REGISTRO VALUES (2, 1, 2, 2, 1, TO_DATE('2025-01-15','YYYY-MM-DD'), 'Licencia de Conducir', 'B', 'María Elena Rodríguez Morales', 'F');
INSERT INTO REGISTRO VALUES (3, 2, 1, 3, 1, TO_DATE('2025-01-16','YYYY-MM-DD'), 'Licencia de Conducir', 'A', 'Carlos Alberto Méndez Castillo', 'M');
INSERT INTO REGISTRO VALUES (4, 3, 3, 4, 3, TO_DATE('2025-01-17','YYYY-MM-DD'), 'Licencia de Conducir', 'A', 'Ana Sofía Guerrero Díaz', 'F');
INSERT INTO REGISTRO VALUES (5, 2, 2, 5, 2, TO_DATE('2025-01-18','YYYY-MM-DD'), 'Licencia de Conducir', 'B', 'Pedro José Hernández Ruiz', 'M');

-- CORRELATIVOS
INSERT INTO CORRELATIVO VALUES (1, TO_DATE('2025-01-15','YYYY-MM-DD'), 1);
INSERT INTO CORRELATIVO VALUES (2, TO_DATE('2025-01-15','YYYY-MM-DD'), 2);
INSERT INTO CORRELATIVO VALUES (3, TO_DATE('2025-01-16','YYYY-MM-DD'), 3);
INSERT INTO CORRELATIVO VALUES (4, TO_DATE('2025-01-17','YYYY-MM-DD'), 4);
INSERT INTO CORRELATIVO VALUES (5, TO_DATE('2025-01-18','YYYY-MM-DD'), 5);

-- EXAMENES
INSERT INTO EXAMEN VALUES (1, 1, 1, 1, 1, 1, 1);
INSERT INTO EXAMEN VALUES (2, 1, 2, 2, 1, 2, 2);
INSERT INTO EXAMEN VALUES (3, 2, 1, 3, 1, 3, 3);
INSERT INTO EXAMEN VALUES (4, 3, 3, 4, 3, 4, 4);
INSERT INTO EXAMEN VALUES (5, 2, 2, 5, 2, 5, 5);

-- PREGUNTAS TEORICAS
INSERT INTO PREGUNTAS VALUES (1, '¿Cuál es la distancia mínima que debe mantener entre vehículos en carretera?', 'B', '2 metros', '3 segundos de distancia', '5 metros', '1 segundo de distancia');
INSERT INTO PREGUNTAS VALUES (2, '¿Qué significa una señal de alto?', 'B', 'Reducir velocidad', 'Detenerse completamente', 'Ceder el paso', 'Continuar con precaución');
INSERT INTO PREGUNTAS VALUES (3, '¿Cuál es el límite de velocidad en zona escolar?', 'A', '20 km/h', '30 km/h', '40 km/h', '50 km/h');
INSERT INTO PREGUNTAS VALUES (4, '¿Qué debe hacer al ver una ambulancia con sirena activada?', 'C', 'Mantener velocidad', 'Acelerar para salir del camino', 'Orillarse y detenerse', 'Ignorar la sirena');

-- PREGUNTAS PRACTICAS
INSERT INTO PREGUNTAS_PRACTICO VALUES (1, 'Realizar estacionamiento en paralelo en un espacio de 6 metros', 20);
INSERT INTO PREGUNTAS_PRACTICO VALUES (2, 'Conducir en reversa por 50 metros manteniendo trayectoria recta', 15);
INSERT INTO PREGUNTAS_PRACTICO VALUES (3, 'Maniobra de tres puntos en espacio reducido', 25);
INSERT INTO PREGUNTAS_PRACTICO VALUES (4, 'Conducción en zona urbana respetando señales de tránsito', 30);

-- RESPUESTAS TEORICAS USUARIO
INSERT INTO RESPUESTA_USUARIO VALUES (1, 1, 1, 'B');
INSERT INTO RESPUESTA_USUARIO VALUES (2, 2, 1, 'B');
INSERT INTO RESPUESTA_USUARIO VALUES (3, 3, 2, 'A');
INSERT INTO RESPUESTA_USUARIO VALUES (4, 4, 2, 'C');
INSERT INTO RESPUESTA_USUARIO VALUES (5, 1, 3, 'B');
INSERT INTO RESPUESTA_USUARIO VALUES (6, 2, 3, 'A');

-- RESPUESTAS PRACTICAS USUARIO
INSERT INTO RESPUESTA_PRACTICO_USUARIO VALUES (1, 1, 1, 18);
INSERT INTO RESPUESTA_PRACTICO_USUARIO VALUES (2, 2, 1, 13);
INSERT INTO RESPUESTA_PRACTICO_USUARIO VALUES (3, 3, 2, 22);
INSERT INTO RESPUESTA_PRACTICO_USUARIO VALUES (4, 4, 2, 28);
INSERT INTO RESPUESTA_PRACTICO_USUARIO VALUES (5, 1, 3, 15);

COMMIT;