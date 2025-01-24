import time
from socketio import Client
import json

sio = Client()

diagnosis_data = {
   "conversation_id": "161508c6-5070-4bf5-bd7d-aa2cfc46ee22",
   "diagnosis": {
       "patient": {
           "medical_diagnosis": "Bradycardia",
           "symptoms": "Severe headache, low heart rate of 54 bpm"
       },
       "paramedics_tips": "Monitor the patient's vital signs closely and provide oxygen if necessary. Prepare for possible cardiac pacing or medication to increase heart rate. Transport to a hospital for further evaluation and treatment.",
       "medications": {
           "injections": "Atropine injections may be administered to increase heart rate.",
           "medicines": "Epinephrine or dopamine may be prescribed to increase heart rate and blood pressure.", 
           "painkillers": "Not required for the diagnosis of Bradycardia, but may be considered for headache management, such as acetaminophen"
       },
       "conversation_status": "DIAGNOSED"
   },
   "fullDiagnosis": {
       "_id": "161508c6-5070-4bf5-bd7d-aa2cfc46ee22",
       "_date": "22-01-2025",
       "diagnosed_by": "Mohamed Al Mehairbi",
       "patient_name": "",
       "conversation": ["object1", "object2"]
   },
   "diagnosed_by": "Mohamed Al Mehairbi", 
   "timestamp": "2025-01-22 23:08:02"
}

@sio.event
def connect():
   print('Connected to server')
   sio.emit('message', diagnosis_data)

@sio.event
def disconnect():
   print('Disconnected from server')

@sio.on('response')
def on_response(data):
   print('Received:', data)

try:
   print('Connecting to server...')
   sio.connect('http://localhost:3000', socketio_path='/api/socket')
   time.sleep(5)  # Wait for messages
   sio.disconnect()
except Exception as e:
   print(f"Connection error: {e}")