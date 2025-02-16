import wandb

class WeaveLogger:
    def log(self, data):
        if isinstance(data, str):
            # Handle string logging
            wandb.log({"message": data})
        else:
            # Handle dictionary logging
            wandb.log(data)

logger = WeaveLogger() 