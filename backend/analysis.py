from google import genai
import os
import prompts
import doubleQuoteRemover
from pydub import AudioSegment
from pydantic import ValidationError
import json
import time

client = genai.Client(api_key=os.getenv("geminiapikey"))

def getAnalysis(origPath):
    wav_filepath = ""
    try:
        print(f"Sanitizing file: loading '{origPath}'")
        audio = AudioSegment.from_file(origPath)
        
        if len(audio) == 0:
            return -1

        wav_filepath = origPath.replace('.webm', '.wav')
        
        print(f"Exporting to standard WAV format at: '{wav_filepath}'")
        audio.export(wav_filepath, format="wav")
        
    except Exception as e:
        return -1

    audio = client.files.upload(file=wav_filepath)

    while audio.state.name == "PROCESSING":
        time.sleep(1)
        audio = client.files.get(name=audio.name)
    if audio.state.name == "FAILED":
        print(f"File processing failed: {audio.state}")
        return -3

    prompt = prompts.analysis()
    try:
        print("Analyzing...")
        res = client.models.generate_content(
            model = "gemini-2.5-flash",
            contents=[prompt, audio]
        )
        if not res.text:
            raise ValueError("The AI model returned an empty response.")

        cleaned = res.text.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned.lstrip("```json").lstrip()
        if cleaned.endswith("```"):
            cleaned = cleaned.rstrip("```").rstrip()
        cleaned = cleaned[cleaned.find("{"):] # remove beginning text if gemini outputs stuff
        cleaned = doubleQuoteRemover.convertJSON(cleaned)
        cleaned = json.loads(cleaned)        

        print("Finished!")
        return cleaned
            
    except ValidationError as e:
        print(f"Pydantic validation failed for Gemini response: {e}\nRaw Response: {getattr(res, 'text', 'N/A')}")
        return -1
    except Exception as e:
        print(f"An unexpected error occurred during Gemini API call: {e}")
        return -2
    
    finally:
        client.files.delete(name=audio.name)