from textwrap import dedent
from typing import Optional

from agno.eval.accuracy import AccuracyEval, AccuracyResult
from reza import reza_agent


def use_case_1():
    evaluation = AccuracyEval(
        # model=OpenAIChat(id="gpt-4o"),
        agent=reza_agent,
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
    result: Optional[AccuracyResult] = evaluation.run(print_results=True)

    assert result is not None and result.avg_score >= 6


if __name__ == "__main__":
    use_case_1()
