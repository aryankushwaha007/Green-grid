import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    # Using gemini-1.5-flash (great balance of speed and cost, free tier)
    model = genai.GenerativeModel("gemini-1.5-flash")
    print("✓ Gemini model initialized: gemini-1.5-flash")
else:
    model = None
    print("Warning: GEMINI_API_KEY not found.")

def get_recommendation(detection_label, confidence):
    if not model:
        return "Gemini API Key not configured."

    prompt = f"""
    You are an expert in solar panel maintenance. 
    A defect of type '{detection_label}' was detected with {confidence:.2f} confidence.
    Provide a concise, actionable maintenance recommendation (<100 words).
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"