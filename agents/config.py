# Create a new config.py file to manage model selection
import os
from agno.models.google import Gemini
from agno.models.openai import OpenAIChat
from agno.embedder.openai import OpenAIEmbedder
from agno.embedder.google import GeminiEmbedder
from tenacity import retry, stop_after_attempt, wait_exponential

# Set to True to use Gemini, False to use OpenAI
USE_GEMINI = True

# Ensure GOOGLE_API_KEY is set
if USE_GEMINI and not os.getenv("GOOGLE_API_KEY"):
    raise ValueError(
        "GOOGLE_API_KEY not set. Please set the GOOGLE_API_KEY environment variable"
    )

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
def get_model(model_type="default"):
    if USE_GEMINI:
        if model_type == "mini":
            return Gemini(id="gemini-1.5-flash-8b")  # API key will be auto-loaded from env
        else:
            return Gemini(id="gemini-2.0-flash-exp")  # API key will be auto-loaded from env
    else:
        if model_type == "mini":
            return OpenAIChat(id="gpt-4o-mini")
        else:
            return OpenAIChat(id="gpt-4o")

def get_embedder():
    if USE_GEMINI:
        return GeminiEmbedder(id="models/text-embedding-004")  # API key will be auto-loaded from env
    else:
        return OpenAIEmbedder() 