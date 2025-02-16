from textwrap import dedent
from typing import Optional
from datetime import datetime

from agno.eval.accuracy import AccuracyEval, AccuracyResult
from reza import reza_agent
from config import get_model, get_embedder
from weave_logger import logger


def use_case_1():
    try:
        model = get_model()
        embedder = get_embedder()
        
        evaluation = AccuracyEval(
            agent=reza_agent,
            model=model,
            embedder=embedder,
            num_iterations=1,
            question=dedent("""\
            Doctor, I'm a 62-year-old male. For the past six months, I've had progressively worsening lower back pain that radiates down my left leg to my foot. It's a sharp, burning pain, and it's making it difficult to walk for more than a few minutes at a time. I've tried physical therapy and pain medication, but they only provide temporary relief. I also have noticed some weakness in my left foot; I sometimes trip and my foot seems to drop.\
            """),
            expected_answer=dedent("""\
            Diagnosis:
            Lumbar Spinal Stenosis with Left-Sided Radiculopathy Due to Degenerative Spondylolisthesis.
            (Explanation for the surgeon): The history of progressive lower back pain with radicular symptoms, including radiating pain down the leg, sensory disturbance (burning), motor weakness (foot drop), and failed conservative management strongly suggests nerve compression within the lumbar spine. The patient's age and symptom progression make degenerative spondylolisthesis a probable cause. The stenosis is narrowing of the spinal canal and the radiculopathy suggests nerve root compression. Further investigation with MRI is crucial to confirm the diagnosis and guide surgical planning, including assessing the degree of stenosis, spondylolisthesis grade, and nerve root compression.\
            """),
        )
        
        logger.log_interaction(
            question="Starting evaluation use_case_1",
            response="Evaluation initialized",
            metadata={
                "evaluation_type": "use_case_1",
                "agent": "reza_agent",
                "model": model.id,
                "embedder": embedder.id,
                "status": "started"
            }
        )
        
        result: Optional[AccuracyResult] = evaluation.run(print_results=True)
        
        if result is not None:
            logger.log_evaluation(
                question=evaluation.question,
                expected_answer=evaluation.expected_answer,
                actual_answer=result.response,
                score=result.avg_score,
                metadata={
                    "model": model.id,
                    "embedder": embedder.id,
                    "evaluation_type": "use_case_1",
                    "agent_name": "reza_agent",
                    "num_iterations": 1,
                    "evaluation_metrics": {
                        "accuracy_score": result.avg_score,
                        "passed_threshold": result.avg_score >= 6
                    },
                    "status": "completed"
                }
            )
        else:
            logger.log_evaluation(
                question=evaluation.question,
                expected_answer=evaluation.expected_answer,
                actual_answer="No response",
                score=0.0,
                metadata={
                    "model": model.id,
                    "embedder": embedder.id,
                    "evaluation_type": "use_case_1",
                    "agent_name": "reza_agent",
                    "status": "failed",
                    "error": "No result returned"
                }
            )

        assert result is not None and result.avg_score >= 6
        
    except Exception as e:
        logger.log_interaction(
            question="use_case_1",
            response=str(e),
            metadata={
                "evaluation_type": "use_case_1",
                "status": "error",
                "error_type": type(e).__name__
            }
        )
        raise e


if __name__ == "__main__":
    use_case_1()
