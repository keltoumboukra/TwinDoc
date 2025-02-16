from agno.playground import Playground, serve_playground_app
from reza import reza_agent
from config import get_model, get_embedder
from weave_logger import logger

class LoggingPlayground(Playground):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
    async def get_response(self, agent_name: str, prompt: str):
        try:
            response = await super().get_response(agent_name, prompt)
            logger.log_interaction(
                question=prompt,
                response=response,
                metadata={
                    "agent_name": agent_name,
                    "source": "playground",
                    "type": "async_response",
                    "model": get_model().id,
                    "embedder": get_embedder().id
                }
            )
            return response
        except Exception as e:
            logger.log_interaction(
                question=prompt,
                response=str(e),
                metadata={
                    "agent_name": agent_name,
                    "source": "playground",
                    "type": "error",
                    "model": get_model().id,
                    "embedder": get_embedder().id
                }
            )
            raise e

app = LoggingPlayground(agents=[reza_agent]).get_app()

if __name__ == "__main__":
    serve_playground_app("playground:app", reload=True)
