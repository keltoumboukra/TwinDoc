import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import streamlit as st
from agents.orchestrator import AgentOrchestrator
import wandb
from weave_logger import init_logging

def initialize_session_state():
    if 'orchestrator' not in st.session_state:
        st.session_state.orchestrator = AgentOrchestrator()
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    if 'query' not in st.session_state:
        st.session_state.query = ""

def clear_query():
    st.session_state.query = ""

def main():
    st.title("TwinDoc Medical Assistant")
    
    initialize_session_state()
    
    # Initialize W&B logging
    init_logging("twindoc-frontend")
    
    try:
        with st.form("query_form", clear_on_submit=True):
            query = st.text_area("Enter your medical query:", 
                               key="query",
                               height=100)
            submit = st.form_submit_button("Submit Query")
            
            if submit and query:
                with st.spinner("Processing your query..."):
                    response = st.session_state.orchestrator.process_query(query)
                    
                    # Show the current response immediately
                    st.write("**Current Response:**")
                    st.write("Transcript Context:")
                    st.write(response['transcript_context'])
                    
                    st.write("Thinking Process:")
                    st.write(response['thinking_process'])
                    
                    st.write("Final Response:")
                    st.write(response['final_response'])
                    
                    # Add to chat history
                    st.session_state.chat_history.append({
                        "query": query,
                        "response": response
                    })
        
        # Display chat history
        if st.session_state.chat_history:
            st.subheader("Previous Conversations")
            for interaction in reversed(st.session_state.chat_history[:-1]):  # Exclude current response
                with st.expander(f"Q: {interaction['query'][:50]}..."):
                    st.write("**Transcript Context:**")
                    st.write(interaction['response']['transcript_context'])
                    
                    st.write("**Thinking Process:**")
                    st.write(interaction['response']['thinking_process'])
                    
                    st.write("**Final Response:**")
                    st.write(interaction['response']['final_response'])
                st.divider()
    
    finally:
        # Ensure W&B run is finished when the app is closed
        wandb.finish()

if __name__ == "__main__":
    main() 