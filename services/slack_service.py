from slack_sdk import WebClient
from utils.summarizer import summarize_text
import os

SLACK_TOKEN = os.getenv("SLACK_TOKEN")
SLACK_CHANNEL_ID = os.getenv("SLACK_CHANNEL_ID")

def fetch_slack_messages():
    client = WebClient(token=SLACK_TOKEN)
    response = client.conversations_history(channel=SLACK_CHANNEL_ID, limit=10)
    
    slack_data = []
    for message in response['messages']:
        text = message.get('text', '')
        summary = summarize_text(text)
        slack_data.append({"text": text, "summary": summary})
    
    return slack_data
