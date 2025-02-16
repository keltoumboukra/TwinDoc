from textwrap import dedent
from pathlib import Path

from agno.agent import Agent
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.knowledge.text import TextKnowledgeBase
from agno.vectordb.lancedb import LanceDb, SearchType
from config import get_model, get_embedder


reza_knowledge_folder = (
    Path(__file__)
    .parent.parent.joinpath("knowledge")
    .joinpath("reza")
    .joinpath("thinking")
)

reza_knowledge = TextKnowledgeBase(
    path=reza_knowledge_folder,
    vector_db=LanceDb(
        uri="vectordb",
        table_name="reza_thinking_process",
        search_type=SearchType.hybrid,
        embedder=get_embedder(),
    ),
)

reza_thinking_agent = Agent(
    name="reza_thinking_agent",
    model=get_model(),
    description=dedent("""\
    You are Digital Dr. Reza, a virtual representation of the real Dr. Reza. You have access to Dr. Reza's knowledge and
    thinking process in a carefully curated knowledge base. You communicate in a professional, academic manner
    while maintaining Dr. Reza's unique perspective and expertise."""),
    instructions=dedent("""\
    1. Break down the user's request into 3-5 key concepts or components
       * Identify the main elements that require attention
       * List these concepts clearly

    2. Search both the knowledge base and the web iteratively for each concept
       * Use each key concept to search the knowledge base and web resources
       * Identify relevant thinking patterns from Dr. Reza's expertise
       * Cross-reference findings with current medical literature and guidelines
       * Combine the findings to establish a comprehensive thinking approach

    3. Structure your response in the following format:
       A. Initial Assessment
          * List key findings and abnormal values
          * Highlight critical concerns

       B. Thinking Process
          * Outline differential diagnoses considered
          * Explain why each diagnosis is likely/unlikely
          * Detail the logical progression of your thought process
          * Include relevant web findings that support or complement Dr. Reza's approach

       C. Final Assessment & Plan
          * State your primary diagnosis with supporting evidence
          * Outline immediate management steps
          * Include any necessary monitoring or follow-up
          * Reference current guidelines or best practices found through web search

    4. Verify and validate your response
       * Confirm components are supported by the knowledge base and current medical literature
       * Ensure reasoning aligns with Dr. Reza's methodology
       * Clearly distinguish between knowledge base information and web-sourced information

    Important Notes:
    * Prioritize information from Dr. Reza's knowledge base
    * Use web searches to supplement and validate the knowledge base information
    * When using web information, cite the source
    * Never make assumptions or provide unsubstantiated information
    * Always show your explicit thinking process and clinical reasoning\
    """),
    tools=[DuckDuckGoTools()],
    knowledge=reza_knowledge,
    add_datetime_to_instructions=True,
    show_tool_calls=True,
    markdown=True,
)

if __name__ == "__main__":
    load_knowledge = False
    if load_knowledge:
        reza_knowledge.load(recreate=True)

    reza_thinking_agent.print_response(
        dedent("""\
        Diagnose this: 55 year old Male with Hematemesis with red clots (/large/small/no Hematochezia), for 1 day,
        with Syncope (No syncope). Patient denies prior history CAD, COPD, CRF risk for stress ulcer, cirrhosis. Patient is on aspirin, PPI. Rectal exam reveals Ongoing red blood (No melena/none/not done).
        BP is 80/40, HR 124, Hematocrit 32, with a baseline of 40, Platelets72, BUN42, Creatinine1.2, INR1.4. The last bowel movement was Red blood (Tarry Black/Brown stool) about 6 hrs ago.\
        """),
        stream=True,
    )
