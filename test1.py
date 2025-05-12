from fastapi import FastAPI, WebSocket
import random
import asyncio
from datetime import datetime
import math

def calculate_active_power(S1, M1, power_factor=1):
    return round(math.sqrt(3) * S1 * M1 * power_factor, 2)
app = FastAPI()
def calculate_reactive_power(S2, M2, power_factor=1):
    sin_phi = math.sqrt(1 - power_factor**2)   
    return round(math.sqrt(3) * S2 * M2 * sin_phi, 2)

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


            #courant et le voltage
            currents = []
            val = round(random.uniform(0, 238), 2)
            currents.append(val)
            for _ in range(2):  
                val = round(random.uniform(max(0, val - 1.5), min(238, val + 1.5)), 2)
                currents.append(val)
            S1 = round(sum(currents), 2)
            voltages = [round(random.uniform(794, 820), 2) for _ in range(3)] 
            M1 = round(sum(voltages) / len(voltages), 2)
            ########################################################
            #reactive_courant et reactive_voltage
            reactive_Currents = [round(random.uniform(0, 100), 2) for _ in range(3)]
            S2 = round(sum(reactive_Currents), 2)
            reactive_Voltages = [round(random.uniform(200, 240), 2) for _ in range(3)] 
            M2 = round(sum(reactive_Voltages) / len(reactive_Voltages), 2)
            #############################################################
            #activepower et reactivepower
            power_factor = round(random.uniform(0.8, 1), 2)        
            activePower = calculate_active_power(S1, M1, power_factor)
            #
            power_factor = round(random.uniform(0.8, 1), 2)   
            reactivePower = calculate_reactive_power(S2, M2, power_factor)   
            ##############################################################""  
            apparentPower = round(math.sqrt(activePower**2 + reactivePower**2), 2) 
            activeEnergy = round(random.uniform(0, 100000), 2) 
            reactiveEnergy = round(random.uniform(0, 50000), 2)
            timestamp = datetime.now().isoformat()

            # Calcul compensation
            compensation = calculate_compensation(reactivePower)

            onduleur = {
                "title": f"SUN2000_{i}",
                "timestamp": timestamp,
                "phases": ["L1", "L2", "L3"],
                "currents": currents,
                "sommeCurrents": S1,
                "voltages": voltages,
                "moyenneVoltage": M1,


                "reactiveCurrents": reactive_Currents,
                "sommeReactiveCurrents": S2,
                "reactiveVoltages": reactive_Voltages,
                "moyenneReactiveVoltage": M2,
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
