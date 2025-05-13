from fastapi import FastAPI, WebSocket
import random
import asyncio
from datetime import datetime
import math

app = FastAPI()

# ✅ Fonction corrigée de calcul de la puissance active
def calculate_active_power(current, voltage, power_factor=1):
    return round(math.sqrt(3) * current * voltage * power_factor, 2)

# ✅ Fonction corrigée de calcul de la puissance réactive
def calculate_reactive_power(current, voltage, power_factor=1):
    sin_phi = math.sqrt(1 - power_factor**2)
    return round(math.sqrt(3) * current * voltage * sin_phi, 2)

# ✅ Fonction améliorée pour calculer la compensation pour atteindre un PF cible (ex: 0.95)
def calculate_compensation(active_power, current_pf, target_pf=0.95):
    tan_phi_current = math.tan(math.acos(current_pf))
    tan_phi_target = math.tan(math.acos(target_pf))
    Qc = active_power * (tan_phi_current - tan_phi_target)
    return round(Qc, 2)

@app.websocket("/ws/data")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = []
        for i in range(1, 5):  # 4 onduleurs

            # === Phase 1 : génération réaliste de données ===
            # Génération aléatoire des courants triphasés
            currents = [round(random.uniform(0, 238), 2)]
            for _ in range(2):
                val = round(random.uniform(max(0, currents[-1] - 1.5), min(238, currents[-1] + 1.5)), 2)
                currents.append(val)
            avg_current = round(sum(currents) / 3, 2)

            # Tensions triphasées
            voltages = [round(random.uniform(794, 820), 2) for _ in range(3)]
            avg_voltage = round(sum(voltages) / 3, 2)

            # === Données réactives ===
            reactive_currents = [round(random.uniform(0, 100), 2) for _ in range(3)]
            avg_reactive_current = round(sum(reactive_currents) / 3, 2)

            reactive_voltages = [round(random.uniform(200, 240), 2) for _ in range(3)]
            avg_reactive_voltage = round(sum(reactive_voltages) / 3, 2)

            # === Calculs ===
            power_factor = round(random.uniform(0.8, 1), 2)
            active_power = calculate_active_power(avg_current, avg_voltage, power_factor)

            power_factor_reactive = round(random.uniform(0.8, 1), 2)
            reactive_power = calculate_reactive_power(avg_reactive_current, avg_reactive_voltage, power_factor_reactive)

            apparent_power = round(math.sqrt(active_power**2 + reactive_power**2), 2)

            active_energy = round(random.uniform(0, 100000), 2)
            reactive_energy = round(random.uniform(0, 50000), 2)

            compensation = calculate_compensation(active_power, power_factor)

            # === Construction de l'objet onduleur ===
            onduleur = {
                "title": f"SUN2000_{i}",
                "timestamp": datetime.now().isoformat(),
                "phases": ["L1", "L2", "L3"],
                "currents": currents,
                "moyenneCurrent": avg_current,
                "voltages": voltages,
                "moyenneVoltage": avg_voltage,

                "reactiveCurrents": reactive_currents,
                "moyenneReactiveCurrent": avg_reactive_current,
                "reactiveVoltages": reactive_voltages,
                "moyenneReactiveVoltage": avg_reactive_voltage,

                "activePower": active_power,
                "reactivePower": reactive_power,
                "apparentPower": apparent_power,
                "activeEnergy": active_energy,
                "reactiveEnergy": reactive_energy,
                "compensationReactivePower": compensation
            }

            data.append(onduleur)



        # Génération des données pour la charge 400V
        charge_currents = [round(random.uniform(10, 100), 2) for _ in range(3)]
        charge_voltages = [round(random.uniform(380, 420), 2) for _ in range(3)]
        charge_S = round(sum(charge_currents), 2)
        charge_U = round(sum(charge_voltages) / 3, 2)
        charge_pf = round(random.uniform(0.85, 1), 2)
        charge_active = calculate_active_power(charge_S, charge_U, charge_pf)
        charge_reactive = calculate_reactive_power(charge_S, charge_U, charge_pf)
        charge_apparent = round(math.sqrt(charge_active**2 + charge_reactive**2), 2)

        # Génération des données pour le réseau 22kV
        reseau_currents = [round(random.uniform(1, 20), 2) for _ in range(3)]
        reseau_voltages = [round(random.uniform(21000, 23000), 2) for _ in range(3)]
        reseau_S = round(sum(reseau_currents), 2)
        reseau_U = round(sum(reseau_voltages) / 3, 2)
        reseau_pf = round(random.uniform(0.9, 1), 2)
        reseau_active = calculate_active_power(reseau_S, reseau_U, reseau_pf)
        reseau_reactive = calculate_reactive_power(reseau_S, reseau_U, reseau_pf)
        reseau_apparent = round(math.sqrt(reseau_active**2 + reseau_reactive**2), 2)

        # Ajout dans les données
        extra_data = {
            "charge": {
                "voltages": charge_voltages,
                "currents": charge_currents,
                "activePower": charge_active,
                "reactivePower": charge_reactive,
                "apparentPower": charge_apparent
            },
            "reseau": {
                "voltages": reseau_voltages,
                "currents": reseau_currents,
                "activePower": reseau_active,
                "reactivePower": reseau_reactive,
                "apparentPower": reseau_apparent
            }
        }

        await websocket.send_json({"onduleurs": data, "systeme": extra_data})

       # await websocket.send_json(data)
        await asyncio.sleep(1)
