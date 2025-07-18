from google import genai
import os
import prompts
from pydantic import ValidationError

client = genai.Client(api_key=os.getenv("geminiapikey"))

def getAnalysis(audioFile):
    audio = client.files.upload(file=audioFile)

    prompt = prompts.analysis()
    try:
        print("Analyzing...")
        res = client.models.generate_content(
            model = "gemini-2.5-pro",
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

        print("Finished!")
        return cleaned
            
    except ValidationError as e:
        print(f"Pydantic validation failed for Gemini response: {e}\nRaw Response: {getattr(res, 'text', 'N/A')}")
        return -1
    except Exception as e:
        print(f"An unexpected error occurred during Gemini API call: {e}")
        return -2