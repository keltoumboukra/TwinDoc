import wandb

def init_logging(project_name: str, **kwargs):
    """
    Initialize Weights & Biases logging.
    
    Args:
        project_name (str): Name of the W&B project
        **kwargs: Additional arguments to pass to wandb.init
    """
    try:
        wandb.init(
            project=project_name,
            **kwargs
        )
    except Exception as e:
        print(f"Warning: Failed to initialize W&B logging: {str(e)}")

class WeaveLogger:
    def log(self, data):
        if isinstance(data, str):
            # Handle string logging
            wandb.log({"message": data})
        else:
            # Handle dictionary logging
            wandb.log(data)

logger = WeaveLogger() 