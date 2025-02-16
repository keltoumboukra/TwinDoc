import weave
from agno.playground import Playground, serve_playground_app
from reza import reza_agent
from config import get_model, get_embedder

class LoggingPlayground(Playground):
    @weave.op()
    async def get_response(self, agent_name: str, prompt: str):
        return await super().get_response(agent_name, prompt)

app = LoggingPlayground(agents=[reza_agent]).get_app()

if __name__ == "__main__":
    serve_playground_app("playground:app", reload=True)
