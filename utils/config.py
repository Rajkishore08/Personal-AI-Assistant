import os
from dotenv import load_dotenv

load_dotenv()

GMAIL_CREDENTIALS_PATH = os.getenv("GMAIL_CREDENTIALS_PATH")
SLACK_TOKEN = os.getenv("SLACK_TOKEN")
SLACK_CHANNEL_ID = os.getenv("SLACK_CHANNEL_ID")
WHATSAPP_API_KEY = os.getenv("WHATSAPP_API_KEY")
