from flask import Flask, request, jsonify
import mysql.connector
from datetime import datetime
import json

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # à adapter
        database="ondulation"
    )

@app.route('/api/data', methods=['GET'])
def get_data():
    from_str = request.args.get('from')
    to_str = request.args.get('to')

    if not from_str or not to_str:
        return jsonify({"error": "Paramètres 'from' et 'to' obligatoires"}), 400

    try:
        # Conversion en datetime (en tenant compte du "Z" = UTC)
        from_date = datetime.fromisoformat(from_str.replace("Z", "+00:00"))
        to_date = datetime.fromisoformat(to_str.replace("Z", "+00:00"))
    except ValueError:
        return jsonify({"error": "Format de date invalide"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT currents, voltages
        FROM Measurement
        WHERE timestamp >= %s AND timestamp < %s
        ORDER BY timestamp
        LIMIT 100
    """
    cursor.execute(query, (from_date.strftime('%Y-%m-%d %H:%M:%S'), to_date.strftime('%Y-%m-%d %H:%M:%S')))
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    # Extraire currents et voltages sous forme de listes imbriquées
    currents_list = []
    voltages_list = []

    for row in rows:
        currents_list.append(json.loads(row['currents']))
        voltages_list.append(json.loads(row['voltages']))

    result = {
        "currents": currents_list,
        "voltages": voltages_list
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
