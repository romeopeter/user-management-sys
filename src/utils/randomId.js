export function generateRandomId() {
    // Generate a random number and convert it to a string
    const randomNum = Math.random().toString(36).substr(2, 9);
  
    // Get the current timestamp and convert it to a string
    const timestamp = Date.now().toString(36);
  
    // Combine the random number and timestamp to create the ID
    const randomId = randomNum + timestamp;
  
    return randomId;
}