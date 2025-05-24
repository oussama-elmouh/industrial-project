import subprocess

# Lire les noms des fichiers depuis scripts.txt
with open('requirements.txt', 'r') as f:
    scripts = [line.strip() for line in f if line.strip()]

processes = []

for script in scripts:
    try:
        if script == "websocket_data.py":
            # Utiliser uvicorn pour websocket_data.py
            print(f"▶️ Lancement de {script} avec uvicorn...")
            p = subprocess.Popen(["uvicorn", "websocket_data:app", "--reload"])
        else:
            print(f"▶️ Lancement de {script} avec python...")
            p = subprocess.Popen(["python", script])
        processes.append(p)
    except Exception as e:
        print(f"❌ Erreur lors de l'exécution de {script} : {e}")

# Attendre que tous les processus se terminent
for p in processes:
    p.wait()

print("✅ Tous les scripts ont terminé.")
