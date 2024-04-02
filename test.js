import fs from 'fs'

try {
  // Read the JSON file synchronously
  const data = fs.readFileSync('./jsonData.js');

  const response=data["Success"]
  console.log(response);
} catch (error) {
  console.error('Error reading file:', error);
}
// mongodb+srv://root:<password>@cluster0.v0b0zhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0