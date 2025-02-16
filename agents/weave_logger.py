import wandb
import weave

def init_logging(project_name="reza-agent"):
    """Initialize both wandb and weave for logging"""
    wandb.init(project=project_name)
    weave.init(project_name)

# We can remove the WeaveLogger class entirely since we'll use weave.op() decorators 