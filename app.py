from flask import Flask, jsonify, request
from services.gmail_service import fetch_gmail_messages
from services.slack_service import fetch_slack_messages
from services.whatsapp_service import fetch_whatsapp_messages

app = Flask(__name__)

@app.route('/api/gmail', methods=['GET'])
def get_gmail_messages():
    try:
        messages = fetch_gmail_messages()
        return jsonify({"status": "success", "data": messages}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/slack', methods=['GET'])
def get_slack_messages():
    try:
        messages = fetch_slack_messages()
        return jsonify({"status": "success", "data": messages}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/whatsapp', methods=['GET'])
def get_whatsapp_messages():
    try:
        messages = fetch_whatsapp_messages()
        return jsonify({"status": "success", "data": messages}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
