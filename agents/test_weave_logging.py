import weave
import wandb
from textwrap import dedent
from reza import reza_agent
from reza_thinking import reza_thinking_agent
from reza_transcript import agent as transcript_agent
from weave_logger import init_logging

@weave.op()
def test_all_agents():
    print("Testing main Reza agent...")
    reza_agent.print_response("What is your approach to diagnosing chest pain?")
    
    print("\nTesting thinking agent...")
    reza_thinking_agent.print_response("How would you approach a case of acute shortness of breath?")
    
    print("\nTesting transcript agent...")
    transcript_agent.print_response("What is Dr. Reza's view on the importance of vital signs?")

@weave.op()
def test_complex_case():
    print("\nTesting complex case scenario...")
    case = dedent("""\
        55-year-old male with sudden onset chest pain, radiating to left arm,
        associated with shortness of breath and diaphoresis. BP 160/90, HR 110,
        O2 sat 94% on room air. No prior cardiac history.""")
    
    reza_agent.print_response(case)

if __name__ == "__main__":
    # Initialize logging
    init_logging("reza-agent-testing")
    
    print("Starting Weave logging tests...")
    test_all_agents()
    test_complex_case()
    
    # Close wandb run
    wandb.finish() 