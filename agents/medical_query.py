import weave
import wandb
from reza import reza_thinking_agent
from weave_logger import init_logging

def query_medical_thinking(question: str, project_name: str = "my-medical-project"):
    """
    Query the medical thinking agent with a specific question.
    
    Args:
        question (str): The medical question to ask
        project_name (str): The name of the project for logging purposes
    
    Returns:
        The agent's response
    """
    init_logging(project_name)
    
    try:
        response = reza_thinking_agent.print_response(question)
        return response
    finally:
        wandb.finish()

if __name__ == "__main__":
    question = "What are the key differentials for acute chest pain?" # Example usage 
    response = query_medical_thinking(question)