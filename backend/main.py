from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

currentid = 0

@app.post("/processAudio")
async def processfunction(audio_file: UploadFile = File(...)):
    global currentid
    # audioFile = request.file

    path = f"backend/recordings/{currentid}.webm"
    currentid += 1
    print("start read")
    try:
        with open(path, "wb") as f:
            f.write(await audio_file.read())
    except:
        raise HTTPException(422, "File Loading Failed.")

    print(f"audio with id {currentid} saved")

    output = analysis.getAnalysis(path)
    # print(output)

    if (output == -1):
        raise HTTPException(404, "Pydantic Validation Failed.")
    elif (output == -2):
        raise HTTPException(404, "Validation Failed.")
    elif (output == -3):
        raise HTTPException(422, "File Upload Failed.")
    else:
        return output

if (__name__ == "__main__"):
    uvicorn.run("main:app", reload=True)