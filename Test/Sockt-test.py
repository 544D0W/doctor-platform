import time
from socketio import Client
import json

sio = Client()

diagnosis_data = {
    "conversation_id": "4b275b73-ee6a-4b15-a713-d8664812171c",
    "diagnosis": {
        "patient": {
            "medical_diagnosis": "Subarachnoid Hemorrhage due to Traumatic Brain Injury",
            "symptoms": "Bleeding from the eyes, loss of consciousness, severe headache, blurred vision, nausea, vomiting, confusion, altered mental status, slow heart rate (bradycardia) of 52 bpm"
        },
        "paramedics_tips": "Provide oxygen therapy as needed, maintain cervical spine stabilization, monitor vital signs closely, and prepare for immediate transport to a trauma center. Avoid administering any medication that may worsen the condition or interfere with subsequent medical evaluation.",
        "medications": {
            "injections": "No specific injections are recommended at this time, but consider administering Mannitol to reduce intracranial pressure if ordered by medical direction.",
            "medicines": "No specific medicines are recommended for prehospital administration, focus on stabilizing the patient for transport.",
            "painkillers": "Avoid administering painkillers due to potential for masking symptoms or interfering with subsequent diagnosis."
        },
        "conversation_status": "DIAGNOSED"
    },
    "loggedData": {
        "_id": "4b275b73-ee6a-4b15-a713-d8664812171c",
        "_date": "25-01-2025",
        "patient_name": "Mohamed Ali",
        "diagnosed_by": "Mohamed Al Mehairbi",
        "patient_age": "32",
        "patient_competence": "Concious",
        "patient_bpm": "112",
        "diagnosis": {
            "patient": {},  # Will be populated with patient data
            "paramedics_tips": "Provide oxygen therapy as needed, maintain cervical spine stabilization, monitor vital signs closely, and prepare for immediate transport to a trauma center. Avoid administering any medication that may worsen the condition or interfere with subsequent medical evaluation.",
            "medications": {},  # Will be populated with medications data
            "conversation_status": "DIAGNOSED"
        }
    },
    "diagnosed_by": "Mohamed Al Mehairbi",
    "timestamp": "2025-01-26 19:13:55"
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