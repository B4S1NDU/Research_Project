# Research Project Integration Guide

You have three separate research components:
1.  **Basi-Component2**: Artifact Comparison & Explanation (Flask + React)
2.  **Basiii**: RAG Chat API (Flask)
3.  **Component3-CraftSimulation**: Craft Simulation (React)

I have created a system to run all of them simultaneously as a unified suite.

## 🚀 How to Run the Full System

1.  **Double-click** (or run in terminal) the new launcher script:
    ```bash
    python run_system.py
    ```

2.  **What will happen:**
    *   It will open **4 terminal windows** automatically.
    *   It will start `Basi-Component2` Backend (Port 5000).
    *   It will start `Basi-Component2` Frontend (Port 5173).
    *   It will start `Basiii` Backend (Port 5001).
    *   It will start `Component3` Frontend (Port 3000).
    *   Finally, it will open a **Dashboard** in your browser.

## 🛠️ Changes Made
To make this work, I had to resolve a port conflict:
*   `Basiii` was using port 5000 (same as `Basi-Component2`).
*   **Action**: I updated `Basiii/rag_api_server_fine_tuned.py` to use **port 5001**.

## 📋 Prerequisite Setup
If you haven't set up the dependencies for each component yet, do this first:

**1. Setup Basi-Component2**
```bash
cd Basi-Component2
pip install -r requirements.txt
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
cd frontend
npm install
```

**2. Setup Basiii**
```bash
cd Basiii
pip install -r requirements_training.txt
```

**3. Setup Component3**
```bash
cd Component3-CraftSimulation
npm install
```

## 🖥️ The Dashboard
A new file `main_dashboard.html` has been created in the root. This is your central hub to access all three tools.
