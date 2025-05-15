from fastapi import FastAPI, WebSocket
import random
import asyncio
from datetime import datetime

app = FastAPI()

@app.websocket("/ws/data")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = []
        for i in range(1, 5):
            currents = [round(random.uniform(0, 238), 2)]
            for _ in range(2):
                val = round(random.uniform(max(0, currents[-1] - 1.5), min(238, currents[-1] + 1.5)), 2)
                currents.append(val)
            voltages = [round(random.uniform(794, 820), 2) for _ in range(3)]
            onduleur = {
                "title": f"SUN2000_{i}",
                "timestamp": datetime.now().isoformat(),
                "currents": currents,
                "voltages": voltages
            }
            data.append(onduleur)
        
        # Envoie uniquement la liste, sans clé "onduleurs"
        await websocket.send_json(data)
        await asyncio.sleep(1)
