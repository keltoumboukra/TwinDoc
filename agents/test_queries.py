import weave
from .orchestrator import AgentOrchestrator

@weave.op()
def run_test_queries():
    # Initialize the orchestrator
    orchestrator = AgentOrchestrator()

    # Test 1: Basic medical diagnosis query
    print("\n=== Test Query 1: Basic Diagnosis ===")
    result1 = orchestrator.process_query(
        "What's your approach to diagnosing a patient with unexplained fatigue and weight loss?"
    )
    print_result(result1)

    # Test 2: Complex case analysis
    print("\n=== Test Query 2: Complex Case ===")
    result2 = orchestrator.process_query(
        """55-year-old male presents with:
        - Acute chest pain radiating to left arm
        - Shortness of breath
        - Diaphoresis
        - History of hypertension
        What's your diagnostic approach and immediate management plan?"""
    )
    print_result(result2)

    # Test 3: Teaching methodology
    print("\n=== Test Query 3: Teaching Method ===")
    result3 = orchestrator.process_query(
        "How do you teach medical students to differentiate between different types of shock?"
    )
    print_result(result3)

def print_result(result):
    print("\nTranscript Context:")
    print(result["transcript_context"])
    print("\nThinking Process:")
    print(result["thinking_process"])
    print("\nFinal Response:")
    print(result["final_response"])
    print("\n" + "="*50)

if __name__ == "__main__":
    run_test_queries() 