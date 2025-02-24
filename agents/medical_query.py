import weave
import wandb
from reza import reza_agent, reza_thinking_agent
from weave_logger import init_logging

init_logging("my-medical-project")

try:
    #response = reza_agent.print_response(
        #"What is the standard approach to evaluating chest pain?"
    #)
    
    thinking_response = reza_thinking_agent.print_response(
        "What are the key differentials for acute chest pain?"
    )
    
finally:
    wandb.finish()