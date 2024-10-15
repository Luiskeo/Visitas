import exceljs from 'exceljs';
import pool from '../connect.js'; // Importa la pool que ya creaste

export async function exportToExcel() {
    try {
        // Usa la pool para ejecutar la consulta
        const [rows] = await pool.query('SELECT * FROM visitante');
        // Crear un nuevo libro de Excel
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Visitas');
        // Definir encabezados
        worksheet.columns = [
            { header: 'ID', key: 'idvisitante', width: 10 },
            { header: 'CÉDULA', key: 'cedula', width: 15 },
            { header: 'NOMBRE', key: 'nombre', width: 15 },
            { header: 'APELLIDO', key: 'apellido', width: 15 },
            { header: 'ENTIDAD', key: 'entidad', width: 15 },
            { header: 'NÚM CEL', key: 'celular', width: 15 },
            { header: 'EPS', key: 'eps', width: 10 },
            { header: 'NÚM FICHA', key: 'numero_ficha', width: 10 },
            { header: 'ÁREA', key: 'area', width: 10 },
            { header: 'MOTIVO VISITA', key: 'motivo_visita', width: 20 },
            { header: 'DISPOSITIVOS', key: 'dispositivo', width: 20 },
            { header: 'NÚM PLACA DISPOSITIVO', key: 'num_placa_dispositivo', width: 20 },
            { header: 'SERIAL', key: 'serial', width: 20 },
            { header: 'FECHA INGRESO', key: 'fecha_ingreso', width: 15 },
            { header: 'OBSERVACIÓN', key: 'observaciones', width: 25 }
        ];

        // Agregar filas de datos
        rows.forEach(row => {
            worksheet.addRow(row);
        });

        // Generar el archivo en memoria (buffer)
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;  // Devuelve el buffer para que pueda ser enviado al cliente
    } catch (error) {
        throw new Error('Error al ejecutar la consulta: ' + error.message);
    }
}
