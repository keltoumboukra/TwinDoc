import wandb
from datetime import datetime
from typing import Dict, Any, Optional

class WeaveLogger:
    def __init__(self, project_name: str = "reza-agent"):
        self.project_name = project_name
        self._init_wandb()
    
    def _init_wandb(self):
        try:
            wandb.init(project=self.project_name)
        except Exception as e:
            print(f"Warning: Failed to initialize wandb: {e}")
    
    def log_interaction(self, 
                       question: str, 
                       response: str, 
                       metadata: Optional[Dict[Any, Any]] = None):
        try:
            log_data = {
                "timestamp": datetime.now().isoformat(),
                "question": question,
                "response": response,
                "metadata": metadata or {}
            }
            wandb.log(log_data)
        except Exception as e:
            print(f"Warning: Failed to log interaction: {e}")
        
    def log_evaluation(self, 
                      question: str,
                      expected_answer: str,
                      actual_answer: str,
                      score: float,
                      metadata: Optional[Dict[Any, Any]] = None):
        try:
            log_data = {
                "timestamp": datetime.now().isoformat(),
                "question": question,
                "expected_answer": expected_answer,
                "actual_answer": actual_answer,
                "score": score,
                "metadata": metadata or {}
            }
            wandb.log(log_data)
        except Exception as e:
            print(f"Warning: Failed to log evaluation: {e}")

logger = WeaveLogger() 