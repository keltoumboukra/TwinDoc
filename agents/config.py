# Create a new config.py file to manage model selection
from agno.models.google import Gemini
from agno.models.openai import OpenAIChat
from agno.embedder.openai import OpenAIEmbedder
from agno.embedder.google import GeminiEmbedder

# Set to True to use Gemini, False to use OpenAI
USE_GEMINI = True

def get_model(model_type="default"):
    if USE_GEMINI:
        if model_type == "mini":
            return Gemini(id="gemini-1.5-flash-8b")
        else:
            return Gemini(id="gemini-2.0-flash-exp")
    else:
        if model_type == "mini":
            return OpenAIChat(id="gpt-4o-mini")
        else:
            return OpenAIChat(id="gpt-4o")

def get_embedder():
    if USE_GEMINI:
        return GeminiEmbedder(id="models/text-embedding-004")
    else:
        return OpenAIEmbedder() 