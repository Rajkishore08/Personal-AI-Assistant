from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from utils.summarizer import summarize_text

SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def authenticate_gmail():
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    service = build('gmail', 'v1', credentials=creds)
    return service

def fetch_gmail_messages():
    service = authenticate_gmail()
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=10).execute()
    messages = results.get('messages', [])
    
    email_data = []
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        subject = next(header['value'] for header in msg['payload']['headers'] if header['name'] == 'Subject')
        snippet = msg['snippet']
        summary = summarize_text(snippet)
        email_data.append({"subject": subject, "snippet": snippet, "summary": summary})
    
    return email_data
