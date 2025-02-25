from transformers import pipeline

# Load pre-trained summarization model once during initialization.
summarizer_model = pipeline("summarization")

def summarize_text(content):
    try:
        summary = summarizer_model(content, max_length=50, min_length=25, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        return f"Error summarizing text: {str(e)}"
