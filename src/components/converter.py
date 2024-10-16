import mysql.connector

# Configuración de la conexión a la base de datos
dbconfig = {
    "database": "visitas",
    "user": "root",
    "password": "",
    "host": "localhost"
}

connection = mysql.connector.connect(**dbconfig)
cursor = connection.cursor()

# Consulta para seleccionar todos los registros de la tabla
cursor.execute("SELECT * FROM visitante")
rows = cursor.fetchall()

# Obtener los nombres de las columnas
column_names = [i[0] for i in cursor.description]

for row in rows:
    idvisitante = row[0]  # Suponiendo que el ID es el primer elemento
    updates = []
    
    # Recorre cada columna a partir del segundo índice
    for i in range(1, len(row)):
        old_value = row[i]
        # Verificar si old_value no es None y es un string
        if isinstance(old_value, str):
            try:
                # Intentar decodificar como UTF-8, si falla, manejar el error
                new_value = old_value.encode('utf-8', errors='ignore').decode('utf-8', errors='ignore')
            except Exception as e:
                print(f"Error procesando el valor {old_value}: {e}")
                new_value = old_value  # Mantener el valor original en caso de error
            
            # Agregar la actualización a la lista
            updates.append(f"{column_names[i]} = %s")  # Guardar el nombre de la columna para el SQL
        else:
            # Si no es un string, simplemente conservar el valor
            updates.append(f"{column_names[i]} = %s")

    # Crear la consulta de actualización
    sql_update = f"UPDATE visitante SET {', '.join(updates)} WHERE idvisitante = %s"
    
    # Crear una lista de nuevos valores
    new_values = [new_value if isinstance(old_value, str) else old_value for old_value in row[1:]]
    new_values.append(idvisitante)  # Añadir el idvisitante al final

    # Ejecutar la consulta de actualización
    cursor.execute(sql_update, new_values)

# Guarda los cambios
connection.commit()

# Cierra la conexión
cursor.close()
connection.close()
