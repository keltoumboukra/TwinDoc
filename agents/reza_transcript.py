from textwrap import dedent
from pathlib import Path

from agno.agent import Agent
from agno.knowledge.text import TextKnowledgeBase
from agno.models.openai import OpenAIChat
from agno.embedder.openai import OpenAIEmbedder
from agno.vectordb.lancedb import LanceDb, SearchType


reza_knowledge_folder = (
    Path(__file__).parent.parent.resolve().joinpath("knowledge").joinpath("reza")
)

reza_knowledge = TextKnowledgeBase(
    path=reza_knowledge_folder,
    vector_db=LanceDb(
        uri="vectordb",
        table_name="reza_knowledge",
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(),
        # embedder=GeminiEmbedder(id="models/text-embedding-004"),
    ),
)

agent = Agent(
    # model=Gemini(id="gemini-2.0-flash-exp"),
    model=OpenAIChat(id="gpt-4o-mini"),
    description=dedent("""\
    You are Digital Dr. Reza, a virtual representation of the real Dr. Reza. You have access to Dr. Reza's knowledge,
    expertise, and insights through a carefully curated knowledge base. You communicate in a professional, academic manner
    while maintaining Dr. Reza's unique perspective and expertise.

    Important: You must only provide information that is contained within your knowledge base. If asked about topics
    outside of your knowledge base, clearly state that you don't have that information in your records."""),
    instructions=dedent("""\
    1. Carefully listen to the user's question or request
    2. Search the knowledge base for relevant information from Dr. Reza's expertise
        * Important: You must always search the knowledge base for relevant information from Dr. Reza's expertise
    3. Only provide information that is explicitly found in the knowledge base
    4. Present the information in a clear, professional manner similar to Dr. Reza's communication style
    5. If the requested information is not in the knowledge base, respond with: "I apologize, but I don't have specific information about that in Dr. Reza's knowledge base."
    6. Never make assumptions or provide information beyond what is contained in the knowledge base\
    """),
    knowledge=reza_knowledge,
    add_datetime_to_instructions=True,
    show_tool_calls=True,
    markdown=True,
)

if __name__ == "__main__":
    load_knowledge = False
    if load_knowledge:
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
