// services/aiService.ts
export async function getAIResponse(patientId: string, message: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message, patientId })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data.response;
}