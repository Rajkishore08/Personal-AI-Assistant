# **Personal AI Communication Assistant**

## **Overview**

The **Personal AI Communication Assistant** is an AI-powered tool designed to streamline communication across Gmail, Slack, and WhatsApp. It fetches real-time messages, summarizes conversations using AI, prioritizes tasks, and automates responses. The assistant provides a unified platform for managing communications efficiently, enhancing productivity for both personal and professional use.

---

## **Features**

### **1. Gmail Integration**

- Fetch real-time emails using the Gmail API.
- Summarize lengthy email threads using NLP.
- Categorize emails into "Urgent," "Follow-up," and "Low Priority."
- Provide AI-powered reply suggestions.


### **2. Slack Integration**

- Fetch messages from Slack channels using the Slack API.
- Summarize conversations and generate daily digests.
- Identify actionable items and suggest task creation.
- Enable quick search for past messages or files.


### **3. WhatsApp Integration**

- Automate replies using Twilio's WhatsApp Business API.
- Summarize long chat threads.
- Set reminders for pending follow-ups.
- Handle customer queries with smart responses.

---

## **Technologies Used**

1. **Backend:** Python (Flask)
2. **APIs:**
    - Gmail API
    - Slack API
    - Twilio's WhatsApp Business API
3. **AI Models:** Hugging Face Transformers (e.g., BERT/GPT) for summarization and intent recognition.
4. **Frontend:** React.js (if applicable for a dashboard).
5. **Database:** MongoDB or Firebase (for storing user preferences and history).
6. **Environment Management:** Python Dotenv for managing sensitive credentials.

---

## **Project Structure**

```
personal_ai_assistant/
├── app.py                # Main entry point for the backend
├── services/
│   ├── gmail_service.py  # Gmail API integration
│   ├── slack_service.py  # Slack API integration
│   ├── whatsapp_service.py  # WhatsApp API integration
├── utils/
│   ├── summarizer.py     # AI summarization logic
│   ├── config.py         # Configuration file for environment variables
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables (API keys, tokens)
└── README.md             # Documentation
```

---

## **Setup Instructions**

### Prerequisites:

1. Python 3.8 or higher installed on your system.
2. Google Cloud Project with Gmail API enabled.
3. Slack App with Bot Token configured.
4. Twilio account with WhatsApp Business API set up.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/personal-ai-assistant.git
cd personal-ai-assistant
```


### Step 2: Install Dependencies

Install the required Python libraries:

```bash
pip install -r requirements.txt
```


### Step 3: Set Up Environment Variables

Create a `.env` file in the project root and add your credentials:

```
GMAIL_CREDENTIALS_PATH=token.json
SLACK_TOKEN=xoxb-your-slack-bot-token-here
SLACK_CHANNEL_ID=C1234567890
TWILIO_ACCOUNT_SID=your-twilio-account-sid-here
TWILIO_AUTH_TOKEN=your-twilio-auth-token-here
```


### Step 4: Authenticate Gmail API

Run the following script to authenticate with Gmail:

```bash
python services/gmail_service.py
```

This will generate a `token.json` file after successful authentication.

---

## **Running the Application**

Start the Flask server:

```bash
python app.py
```

The server will run on `http://127.0.0.1:5000/`. You can use tools like Postman to test the following endpoints:

### Endpoints:

1. Fetch Gmail Messages:
`GET /api/gmail`
2. Fetch Slack Messages:
`GET /api/slack`
3. Fetch WhatsApp Messages:
`GET /api/whatsapp`

---

## **How It Works**

1. The assistant fetches emails, Slack messages, and WhatsApp chats through their respective APIs.
2. It processes the fetched data using NLP models to:
    - Summarize lengthy conversations or threads.
    - Categorize emails/messages by priority.
    - Generate intelligent reply suggestions.
3. Results are displayed via JSON responses or can be integrated into a frontend dashboard.

---

## **Example Input/Output**

### Input:

1. An email thread with multiple replies about a project update.
2. A Slack conversation discussing team deliverables.
3. A WhatsApp chat containing customer queries.

### Output:

1. A prioritized list of emails with summaries of each thread.
2. A daily digest summarizing key points from Slack channels.
3. Automated responses to common WhatsApp queries with reminders for follow-ups.

---

## **Key Challenges**

1. Ensuring privacy compliance when handling sensitive user data (e.g., GDPR).
2. Maintaining accuracy in summarization and context understanding.
3. Seamless integration across diverse platforms with robust APIs.

---

## **Future Enhancements**

1. Add multilingual support using Google Translate API for global users.
2. Include voice command support using Speech-to-Text (STT) and Text-to-Speech (TTS).
3. Build a mobile app using Flutter or React Native for on-the-go access.

---

## **Contributing**

Contributions are welcome! Please fork this repository and submit a pull request with detailed explanations of your changes.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

update this file with space to add screenshots of mock implementation and testable link :https://personal-ai-assistant-rk.netlify.app/
---

### Updated README.md for Personal AI Communication Assistant

---

# **Personal AI Communication Assistant**

## **Overview**

The **Personal AI Communication Assistant** is an AI-powered tool designed to streamline communication across Gmail, Slack, and WhatsApp. It fetches real-time messages, summarizes conversations using AI, prioritizes tasks, and automates responses. The assistant provides a unified platform for managing communications efficiently, enhancing productivity for both personal and professional use.

---

## **Features**

### **1. Gmail Integration**

- Fetch real-time emails using the Gmail API.
- Summarize lengthy email threads using NLP.
- Categorize emails into "Urgent," "Follow-up," and "Low Priority."
- Provide AI-powered reply suggestions.


### **2. Slack Integration**

- Fetch messages from Slack channels using the Slack API.
- Summarize conversations and generate daily digests.
- Identify actionable items and suggest task creation.
- Enable quick search for past messages or files.


### **3. WhatsApp Integration**

- Automate replies using Twilio's WhatsApp Business API.
- Summarize long chat threads.
- Set reminders for pending follow-ups.
- Handle customer queries with smart responses.

---

## **Technologies Used**

1. **Backend:** Python (Flask)
2. **APIs:**
    - Gmail API
    - Slack API
    - Twilio's WhatsApp Business API
3. **AI Models:** Hugging Face Transformers (e.g., BERT/GPT) for summarization and intent recognition.
4. **Frontend:** React.js (if applicable for a dashboard).
5. **Database:** MongoDB or Firebase (for storing user preferences and history).
6. **Environment Management:** Python Dotenv for managing sensitive credentials.

---

## **Project Structure**

```
personal_ai_assistant/
├── app.py                # Main entry point for the backend
├── services/
│   ├── gmail_service.py  # Gmail API integration
│   ├── slack_service.py  # Slack API integration
│   ├── whatsapp_service.py  # WhatsApp API integration
├── utils/
│   ├── summarizer.py     # AI summarization logic
│   ├── config.py         # Configuration file for environment variables
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables (API keys, tokens)
└── README.md             # Documentation
```

---

## **Setup Instructions**

### Prerequisites:

1. Python 3.8 or higher installed on your system.
2. Google Cloud Project with Gmail API enabled.
3. Slack App with Bot Token configured.
4. Twilio account with WhatsApp Business API set up.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/personal-ai-assistant.git
cd personal-ai-assistant
```


### Step 2: Install Dependencies

Install the required Python libraries:

```bash
pip install -r requirements.txt
```


### Step 3: Set Up Environment Variables

Create a `.env` file in the project root and add your credentials:

```
GMAIL_CREDENTIALS_PATH=token.json
SLACK_TOKEN=xoxb-your-slack-bot-token-here
SLACK_CHANNEL_ID=C1234567890
TWILIO_ACCOUNT_SID=your-twilio-account-sid-here
TWILIO_AUTH_TOKEN=your-twilio-auth-token-here
```


### Step 4: Authenticate Gmail API

Run the following script to authenticate with Gmail:

```bash
python services/gmail_service.py
```

This will generate a `token.json` file after successful authentication.

---

## **Running the Application**

Start the Flask server:

```bash
python app.py
```

The server will run on `http://127.0.0.1:5000/`. You can use tools like Postman to test the following endpoints:

### Endpoints:

1. Fetch Gmail Messages:
`GET /api/gmail`
2. Fetch Slack Messages:
`GET /api/slack`
3. Fetch WhatsApp Messages:
`GET /api/whatsapp`

---

## **How It Works**

1. The assistant fetches emails, Slack messages, and WhatsApp chats through their respective APIs.
2. It processes the fetched data using NLP models to:
    - Summarize lengthy conversations or threads.
    - Categorize emails/messages by priority.
    - Generate intelligent reply suggestions.
3. Results are displayed via JSON responses or can be integrated into a frontend dashboard.

---

## **Example Input/Output**

### Input:

1. An email thread with multiple replies about a project update.
2. A Slack conversation discussing team deliverables.
3. A WhatsApp chat containing customer queries.

### Output:

1. A prioritized list of emails with summaries of each thread.
2. A daily digest summarizing key points from Slack channels.
3. Automated responses to common WhatsApp queries with reminders for follow-ups.

---

## **Key Challenges**

1. Ensuring privacy compliance when handling sensitive user data (e.g., GDPR).
2. Maintaining accuracy in summarization and context understanding.
3. Seamless integration across diverse platforms with robust APIs.

---

## **Future Enhancements**

1. Add multilingual support using Google Translate API for global users.
2. Include voice command support using Speech-to-Text (STT) and Text-to-Speech (TTS).
3. Build a mobile app using Flutter or React Native for on-the-go access.

---

## **Screenshots**

Add screenshots of your mock implementation here:

![image](https://github.com/user-attachments/assets/0a470225-c3fb-43ce-9b17-386595d9a9ae)
![image](https://github.com/user-attachments/assets/a8924086-eb7e-404e-a681-ff9c691a5491)
![image](https://github.com/user-attachments/assets/25ff420c-58e5-46d2-9d4c-a1dd089d9be9)
![image](https://github.com/user-attachments/assets/f972c380-d14e-4c2d-b477-1ed4b3b8ed85)
API Keys
![image](https://github.com/user-attachments/assets/4bd75e3e-96e5-41c6-a53d-535ad34f380b)
![image](https://github.com/user-attachments/assets/3381d750-690d-43a4-8951-e7d31e4ade6f)

---

## **Live Demo**

Test the live implementation here:
[**Live Demo Link**](https://personal-ai-assistant-rk.netlify.app/)

---

## **Contributing**

Contributions are welcome! Please fork this repository and submit a pull request with detailed explanations of your changes.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
