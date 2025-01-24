// Example usage for Medical AI System
const testExamples = [
    {
      message: "I'm busy with a surgery, call me about patient John Smith's abnormal blood work",
      patientId: "P001",
      doctorPhone: "+1234567890",
      patientContext: "Lab results show critical potassium levels"
    },
    {
      message: "Need a call about the heart attack case from ward 3B",
      patientId: "P002",
      doctorPhone: "+1234567890",
      patientContext: "Post-MI monitoring required"
    },
    {
      message: "Please call me urgently, patient Jane's condition is deteriorating",
      patientId: "P003",
      doctorPhone: "+1234567890",
      patientContext: "Respiratory distress increasing"
    }
  ];
  
  // Function to test examples
  async function runTests() {
    for (const test of testExamples) {
      try {
        const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(test)
        });
        
        const result = await response.json();
        console.log(`Test for ${test.patientId}:`, result);
      } catch (error) {
        console.error(`Test failed for ${test.patientId}:`, error);
      }
    }
  }
  
  // Run tests
  runTests();