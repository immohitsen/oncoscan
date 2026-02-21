# OncoScan

AI-powered OSCC (Oral Cancer) detection from biopsy slides — Next.js dashboard + FastAPI ML backend.

---

## How it works

```
Browser → Next.js (frontend) → Your FastAPI server → Swin Transformer model
                             → MongoDB Atlas         (auth + records)
```

---

## 1 — Set up the ML API (your own server)

The inference backend is open — duplicate it from HuggingFace Spaces:

**[https://huggingface.co/spaces/immohitsen/oncofastapi](https://huggingface.co/spaces/immohitsen/oncofastapi)**

1. Click **"Duplicate this Space"** (top-right button)
2. Give it a name and click **Duplicate Space** — HuggingFace builds it automatically
3. Once running, your API URL will be:
   ```
   https://YOUR-USERNAME-YOUR-SPACE-NAME.hf.space
   ```
4. Verify it works:
   ```bash
   curl https://YOUR-USERNAME-YOUR-SPACE-NAME.hf.space/
   # {"status":"online","model_loaded":true,...}
   ```

> You can also run it locally — clone the Space repo and run:
> ```bash
> pip install -r requirements.txt
> uvicorn main:app --port 8000
> ```

---

## 2 — Set up MongoDB

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a database user and copy the connection string
3. Whitelist your IP (or `0.0.0.0/0` for dev)

---

## 3 — Run the frontend

```bash
git clone https://github.com/your-username/oncoscan.git
cd oncoscan
npm install
```

Create `.env` in the `oncoscan/` folder:

```env
FASTAPI_URL="https://YOUR-USERNAME-YOUR-SPACE-NAME.hf.space"
MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/oncoscan"
```

Start:

```bash
npm run dev
# http://localhost:3000
```

---

## Tech Stack

| | |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Auth | JWT + bcryptjs, MongoDB Atlas |
| ML API | FastAPI, Swin Transformer (HuggingFace) |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Model not loaded` | Your Space is still building — wait ~2 min and refresh |
| `bad auth` on MongoDB | Check username/password and IP whitelist in Atlas |
| Port 3000 in use | Next.js auto-switches to 3001 |
