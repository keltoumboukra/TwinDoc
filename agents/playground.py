from agno.playground import Playground, serve_playground_app
from reza import reza_agent

app = Playground(agents=[reza_agent]).get_app()

if __name__ == "__main__":
    serve_playground_app("playground:app", reload=True)
