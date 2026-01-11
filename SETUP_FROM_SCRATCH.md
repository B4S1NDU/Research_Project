# 🛠️ Setup Guide: Sri Lankan Heritage Research Suite (New Machine)

This guide provides step-by-step instructions to set up the entire project from scratch on a new Windows machine.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

1.  **Python 3.10 or 3.11**: [Download Python](https://www.python.org/downloads/)
    *   *Important:* Check "Add Python to PATH" during installation.
2.  **Node.js (LTS Version)**: [Download Node.js](https://nodejs.org/)
3.  **Git**: [Download Git](https://git-scm.com/)

---

## 🚀 Installation Steps

### 1. Clone/Copy the Repository
Copy the entire `Research Project` folder to your new machine (e.g., to `C:\Users\YourName\Documents\Research Project`).

Open a terminal (Command Prompt or PowerShell) and navigate to this folder:
```bash
cd "C:\Users\YourName\Documents\Research Project"
```

### 2. Set Up Environment Variables
You need an OpenAI API Key for the AI features.
1.  Create a file named `.env` in the `Basiii` folder.
2.  Add your key:
    ```
    OPENAI_API_KEY=sk-your-api-key-here
    ```

---

### 3. Component Setup

#### Component 2: Comparison System (Flask + React)

**Backend:**
```bash
cd Basi-Component2
pip install -r requirements.txt
# Install PyTorch (CPU version for compatibility)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
```

**Frontend:**
```bash
cd frontend
npm install
```

*(Return to root)*: `cd ..\..`

#### Component 3: Craft Simulation (React)

```bash
cd Component3-CraftSimulation
npm install
```

*(Return to root)*: `cd ..`

#### Component 4 (Basiii): RAG Chat System (Flask)

This is the most complex component and requires specific versions to avoid errors.

1.  **Install dependencies:**
    ```bash
    cd Basiii
    pip install -r requirements_training.txt
    ```

2.  **⚠️ CRITICAL FIX: Downgrade HTTPX**
    To fix the `Client.__init__()` error, run:
    ```bash
    pip install httpx==0.27.2
    ```

3.  **⚠️ CRITICAL FIX: Reset Vector Database**
    If moving to a new machine, you must regenerate the database to match the installed ChromaDB version.
    
    *   **Delete** the folder `Basiii\chroma_db` (if it exists).
    *   **Run the setup script:**
        ```bash
        python setup_rag.py
        ```
    *   Wait for it to say `✅ Vector database created`.

*(Return to root)*: `cd ..`

---

## ▶️ Running the System

Once everything is installed, use the unified launcher:

```bash
python run_system.py
```

This will automatically:
1.  Launch all 3 component backends/frontends in separate windows.
2.  Open the **Main Dashboard** in your browser.

## 🐛 Troubleshooting

*   **Port Conflicts:** If a port is in use, the script might fail. Ensure ports `5000`, `5001`, `3000`, and `5173` are free.
*   **"No module named..."**: Verify you ran `pip install` in the correct folders.
*   **Database Errors**: If the Chat AI fails, delete `Basiii\chroma_db` and run `python setup_rag.py` again.
