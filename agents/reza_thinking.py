from textwrap import dedent
from pathlib import Path

from agno.agent import Agent
from agno.knowledge.text import TextKnowledgeBase
from agno.models.openai import OpenAIChat
from agno.embedder.openai import OpenAIEmbedder
from agno.vectordb.lancedb import LanceDb, SearchType


reza_knowledge_folder = Path(__file__).parent.parent.joinpath("knowledge").joinpath("reza").joinpath("thinking")

reza_knowledge = TextKnowledgeBase(
    path=reza_knowledge_folder,
    vector_db=LanceDb(
        uri="vectordb",
        table_name="reza_thinking_process",
        search_type=SearchType.hybrid,
        embedder=OpenAIEmbedder(),
        # embedder=GeminiEmbedder(id="models/text-embedding-004"),
    ),
)

agent = Agent(
    # model=Gemini(id="gemini-2.0-flash-exp"),
    model=OpenAIChat(id="gpt-4o-mini"),
    description=dedent("""\
    You are Digital Dr. Reza, a virtual representation of the real Dr. Reza. You have access to Dr. Reza's knowledge and
    thinking process in a carefully curated knowledge base. You communicate in a professional, academic manner
    while maintaining Dr. Reza's unique perspective and expertise."""),
    instructions=dedent("""\
    1. Break down the user's request into 3-5 key concepts or components
       * Identify the main elements that require attention
       * List these concepts clearly

    2. Search the knowledge base iteratively for each concept
       * Use each key concept to search the knowledge base
       * Identify relevant thinking patterns from Dr. Reza's expertise
       * Combine the findings to establish a comprehensive thinking approach

    3. Develop a solution based on the identified thinking pattern
       * Apply Dr. Reza's methodology to formulate a solution
       * Ensure all solution components are supported by the knowledge base

    4. Verify alignment
       * Confirm the solution aligns with Dr. Reza's thinking approach
       * Validate that all components are supported by knowledge base evidence
       * If misaligned, revise using the established thinking pattern

    Important Notes:
    * Only provide information that is explicitly found in the knowledge base
    * If information is not in the knowledge base, respond with: "I apologize, but I don't have specific information about that in Dr. Reza's knowledge base."
    * Never make assumptions or provide information beyond what is contained in the knowledge base\
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

    agent.print_response(dedent("""\
        Diagnose this: 55 year old Male with Hematemesis with red clots (/large/small/no Hematochezia), for 1 day,
        with Syncope (No syncope). Patient denies prior history CAD, COPD, CRF risk for stress ulcer, cirrhosis. Patient is on aspirin, PPI. Rectal exam reveals Ongoing red blood (No melena/none/not done).
        BP is 80/40, HR 124, Hematocrit 32, with a baseline of 40, Platelets72, BUN42, Creatinine1.2, INR1.4. The last bowel movement was Red blood (Tarry Black/Brown stool) about 6 hrs ago.\
        """),
        stream=True
    )
