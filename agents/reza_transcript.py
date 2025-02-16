import weave
from textwrap import dedent
from pathlib import Path
from agno.agent import Agent
from agno.knowledge.text import TextKnowledgeBase
from agno.vectordb.lancedb import LanceDb, SearchType
from config import get_model, get_embedder

reza_knowledge_folder = (
    Path(__file__).parent.parent.resolve().joinpath("knowledge").joinpath("reza")
)

class TranscriptAgent(Agent):
    @weave.op()
    def print_response(self, prompt: str, **kwargs):
        return super().print_response(prompt, **kwargs)

# Initialize knowledge base
reza_knowledge = TextKnowledgeBase(
    path=reza_knowledge_folder,
    vector_db=LanceDb(
        uri="vectordb",
        table_name="reza_knowledge",
        search_type=SearchType.hybrid,
        embedder=get_embedder(),
    ),
)

agent = TranscriptAgent(
    model=get_model("mini"),
    description=dedent("""\
    You are a specialized agent that has access to Dr. Reza's transcripts and can provide
    accurate information about his views, opinions, and approaches based on these records."""),
    instructions=dedent("""\
    When responding to queries:
    1. Search the knowledge base for relevant transcript segments
    2. Base your responses solely on the available transcript content
    3. If information is not found in the transcripts, acknowledge this
    4. Maintain Dr. Reza's exact phrasing and terminology when possible
    5. Provide context from specific teaching sessions or cases when relevant"""),
    knowledge=reza_knowledge,
    add_datetime_to_instructions=True,
    show_tool_calls=True,
    markdown=True,
)

if __name__ == "__main__":
    # Load knowledge base and force recreation
    reza_knowledge.load(recreate=True)

    agent.print_response(
        "What does Dr. Reza emphasize about the importance of problem representation in diagnosis?",
        stream=True,
    )

    agent.print_response(
        "How does Dr. Reza approach cases where there are multiple symptoms that could be either signal or noise?",
        stream=True,
    )

    agent.print_response(
        "What is Dr. Reza's perspective on the relationship between fever and cellulitis diagnosis?",
        stream=True,
    )

    agent.print_response(
        "According to the transcript, why is labetalol preferred over hydralazine when managing acute aortic syndromes?",
        stream=True,
    )

    agent.print_response(
        "What does Dr. Reza suggest about the importance of non-exertional vs exertional shortness of breath in diagnosis?",
        stream=True,
    )

    agent.print_response(
        "How does Dr. Reza approach the interpretation of review of systems in complex cases?",
        stream=True,
    )

    agent.print_response(
        "What is Dr. Reza's view on the value of negative findings in physical examinations?",
        stream=True,
    )

    agent.print_response(
        "According to the discussion, what factors should be considered when distinguishing between DVT and cellulitis?",
        stream=True,
    )
