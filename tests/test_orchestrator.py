import pytest
from agents.orchestrator import AgentOrchestrator
from agents.config import USE_GEMINI
import os

@pytest.fixture
def orchestrator():
    # Verify GOOGLE_API_KEY is set
    if USE_GEMINI and not os.getenv("GOOGLE_API_KEY"):
        pytest.skip("GOOGLE_API_KEY not set")
    return AgentOrchestrator()

def test_orchestrator(orchestrator):
    result = orchestrator.process_query(
        "What's your approach to diagnosing acute chest pain?"
    )
    assert all(k in result for k in [
        "transcript_context", 
        "thinking_process", 
        "final_response"
    ]) 