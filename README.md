## Getting Started

Clone the repositry https://github.com/HARSH-KAUSHIK261103/blog-app.git

Navigate to backend:

```bash
cd backend

```

Download all the requirements

```bash
pip install -r requirements.txt
```

Navigate to routes.py and set your OpenAI api key and laangchain api key

Run the backend server

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Navigate back to root folder 

```bash
cd ..
```
Install all the node dependencies

```bash
npm install
```
Run the application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

