from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv
load_dotenv()

import analysis

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def greet():
    return {"message": "equalizer backend"}

class ProcessRequest(BaseModel):
    pass

@app.post("/processAudio")
def processfunction(request: ProcessRequest):
    audioFile = request.file

    output = analysis.getAnalysis(audioFile)
    if (output == -1):
        raise HTTPException(404, "Pydantic Validation Failed.")
    elif (output == -2):
        raise HTTPException(404, "Validation Failed.")
    else:
        return output

if (__name__ == "__main__"):
    uvicorn.run("main:app", reload=True)