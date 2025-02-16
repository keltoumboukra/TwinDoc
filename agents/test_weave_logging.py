from textwrap import dedent
from reza import reza_agent
from reza_thinking import reza_thinking_agent
from reza_transcript import agent as transcript_agent
from weave_logger import logger
import wandb

def test_all_agents():
    logger.log_interaction(
        question="Starting individual agent tests",
        response="Initializing tests",
        metadata={"status": "started"}
    )
    
    print("Testing main Reza agent...")
    response = reza_agent.print_response("What is your approach to diagnosing chest pain?")
    logger.log_interaction(
        question="chest_pain_diagnosis",
        response=response,
        metadata={
            "agent": "reza_main",
            "type": "test"
        }
    )
    
    print("\nTesting thinking agent...")
    response = reza_thinking_agent.print_response("How would you approach a case of acute shortness of breath?")
    logger.log_interaction(
        question="shortness_of_breath",
        response=response,
        metadata={
            "agent": "reza_thinking",
            "type": "test"
        }
    )
    
    print("\nTesting transcript agent...")
    response = transcript_agent.print_response("What is Dr. Reza's view on the importance of vital signs?")
    logger.log_interaction(
        question="vital_signs_importance",
        response=response,
        metadata={
            "agent": "transcript",
            "type": "test"
        }
    )

def test_complex_case():
    logger.log_interaction(
        question="Starting complex case scenario",
        response="Initializing complex case",
        metadata={"status": "started"}
    )
    
    print("\nTesting complex case scenario...")
    case = dedent("""\
        55-year-old male with sudden onset chest pain, radiating to left arm,
        associated with shortness of breath and diaphoresis. BP 160/90, HR 110,
        O2 sat 94% on room air. No prior cardiac history.""")
    
    response = reza_agent.print_response(case)
    logger.log_interaction(
        question=case,
        response=response,
        metadata={
            "agent": "reza_main",
            "type": "complex_case"
        }
    )

if __name__ == "__main__":
    wandb.init(project="reza-agent-testing")
    
    print("Starting Weave logging tests...")
    test_all_agents()
    test_complex_case()
    
    wandb.finish()
    print("\nTests completed. Check your W&B dashboard at: https://wandb.ai/") 