from flask import Flask, request, jsonify
import datetime
import subprocess
import os

app = Flask(__name__)

# Load the audio (or text in this case)
def get_text():
    with open("test.txt", "r") as file:
        return file.read()

def get_audio(audio_path):
    result = subprocess.run(["whisper", audio_path, "--model", "medium"], capture_output=True, text=True)
    return result.stdout

# Function to get the current day
def countdays():
    date = datetime.datetime.now()
    return date.strftime("%d/%m/%Y")

# Define the keywords to detect
def keywords():
    return ["abastece", "combustível", "crédito", "reboque", "pane", "defeito", "EPI", "teste"]

# Function to interpret text and detect keywords
def interpreter_text(text):
    kw = keywords()
    words = text.split()
    for word in words:
        if word in kw:
            return word
    return "Não foi possível localizar nenhuma palavra-chave"

# Define a class for storing information
class InformationAgent:
    def __init__(self, date, name, gerencia, placa, localization, description):
        self.date = date
        self.name = name
        self.gerencia = gerencia
        self.placa = placa
        self.localization = localization
        self.description = description

# API Route to analyze text
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get("text", "")
    keyword = interpreter_text(text)
    return jsonify({"keyword": keyword})

# API Route to get current date
@app.route('/date', methods=['GET'])
def get_date():
    return jsonify({"current_date": countdays()})

# API Route to create an agent record
@app.route('/create_agent', methods=['POST'])
def create_agent():
    data = request.json
    agent = InformationAgent(
        date=countdays(),
        name=data.get("name"),
        gerencia=data.get("gerencia"),
        placa=data.get("placa"),
        localization=data.get("localization"),
        description=data.get("description"),
    )
    return jsonify({"message": "Agent created", "agent": agent.__dict__})

# API Route to receive and process audio
@app.route('/receive_audio', methods=['POST'])
def receive_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio_file = request.files['audio']
    audio_path = "uploaded_audio.oga"
    audio_file.save(audio_path)
    
    transcribed_text = get_audio(audio_path)
    os.remove(audio_path)  # Clean up after processing
    
    return jsonify({"transcribed_text": transcribed_text})

if __name__ == '__main__':
    app.run(debug=True)
