from typing import List, Dict, Any
import weave
from agno.agent import Agent
from .reza import reza_agent
from .reza_thinking import reza_thinking_agent
from .reza_transcript import agent as transcript_agent
from .config import get_model

class AgentOrchestrator(Agent):
    def __init__(self, *args, **kwargs):
        if 'model' not in kwargs:
            kwargs['model'] = get_model()  # Ensure model is set from our config
        super().__init__(*args, **kwargs)
        self.reza_agent = reza_agent
        self.thinking_agent = reza_thinking_agent
        self.transcript_agent = transcript_agent
        self.conversation_state: Dict[str, Any] = {}

    @weave.op()
    def process_query(self, query: str) -> Dict[str, Any]:
        # First, check transcripts for relevant context
        transcript_context = self.transcript_agent.print_response(query)
        
        # Then, engage thinking process with context
        thinking_response = self.thinking_agent.print_response(
            f"Context from transcripts: {transcript_context}\nQuery: {query}"
        )
        
        # Finally, let RezaAgent formulate final response
        final_response = self.reza_agent.print_response(
            f"Based on:\nTranscripts: {transcript_context}\n"
            f"Thinking: {thinking_response}\nRespond to: {query}"
        )
        
        # Return responses directly without the conditional checks
        return {
            "transcript_context": transcript_context,
            "thinking_process": thinking_response,
            "final_response": final_response
        } 