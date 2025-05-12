from fastapi import FastAPI, WebSocket
import random
import asyncio
from datetime import datetime

app = FastAPI()

def calculate_compensation(reactive_power):
    # Hypothèse simple : on veut ramener la puissance réactive à zéro
    correction_needed = -reactive_power
    return round(correction_needed, 2)

@app.websocket("/ws/data")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = []
        for i in range(1, 5):  # 4 onduleurs
            currents = [round(random.uniform(0, 100), 2) for _ in range(3)]# meme valeur (0,238) diference entre 0 et 1.5
            voltages = [round(random.uniform(200, 240), 2) for _ in range(3)] # entre 794 et 820
            activePower = round(random.uniform(0, 10000), 2)# RACIN 3*s1 * m1 * Cosinus phi                    (Adjustable Power Factor Range :0.8 )
            reactivePower = round(random.uniform(-3000, 3000), 2)  # RACIN 3  * s2 * m2 * SINPHI      (racin(1-0.64))         
            apparentPower = round(random.uniform(0, 12000), 2) # racin[activePower° + reactivePower°]
            activeEnergy = round(random.uniform(0, 100000), 2) # 
            reactiveEnergy = round(random.uniform(0, 50000), 2)
            timestamp = datetime.now().isoformat()

            # Calcul compensation
            compensation = calculate_compensation(reactivePower)

            onduleur = {
                "title": f"SUN2000_{i}",
                "timestamp": timestamp,
                "phases": ["L1", "L2", "L3"],
                "currents": currents,
                "voltages": voltages,
                "activePower": activePower,
                "reactivePower": reactivePower,
                "apparentPower": apparentPower,
                "activeEnergy": activeEnergy,
                "reactiveEnergy": reactiveEnergy,
                "compensationReactivePower": compensation  # Compensation ajoutée ici
            }
            data.append(onduleur)

        await websocket.send_json(data)
        await asyncio.sleep(1)
