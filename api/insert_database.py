import mysql.connector
from datetime import datetime, timedelta
import random
import json

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  # adapte selon ton mot de passe
    database="ondulation"
)
cursor = conn.cursor()

batch_size = 500  # nombre de lignes par batch
batch_values = []

for t in range(3600):
    timestamp = datetime.now() - timedelta(seconds=t + 10)

    for i in range(1, 5):
        currents = [round(random.uniform(0, 238), 2)]
        for _ in range(2):
            val = round(random.uniform(max(0, currents[-1] - 1.5), min(238, currents[-1] + 1.5)), 2)
            currents.append(val)

        voltages = [round(random.uniform(794, 820), 2) for _ in range(3)]

        values = (
            f"SUN2000_{i}",
            timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            json.dumps(currents),
            json.dumps(voltages)
        )
        batch_values.append(values)

    # Dès que le batch atteint la taille voulue, on insère tout en une seule fois
    if len(batch_values) >= batch_size:
        query = '''
            INSERT INTO Measurement (ups, timestamp, currents, voltages)
            VALUES (%s, %s, %s, %s)
        '''
        cursor.executemany(query, batch_values)
        conn.commit()
        print(f"{len(batch_values)} lignes insérées...")
        batch_values = []

# Insérer les éventuelles lignes restantes dans le dernier batch
if batch_values:
    query = '''
        INSERT INTO Measurement (ups, timestamp, currents, voltages)
        VALUES (%s, %s, %s, %s)
    '''
    cursor.executemany(query, batch_values)
    conn.commit()

cursor.close()
conn.close()

print("✅ Insertion terminée.")
