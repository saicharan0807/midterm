const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors'); // Make sure this line is present

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS
AWS.config.update({
  region: 'us-east-1', // Replace with your AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Appointments';

app.get('/appointments', async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const data = await dynamodb.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    res.status(500).json({ error: 'Could not retrieve appointments' });
  }
});

app.post('/appointments', async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: Date.now().toString(), // Simple unique ID
      patientName: req.body.patientName,
      doctorName: req.body.doctorName,
      date: req.body.date,
    },
  };

  try {
    await dynamodb.put(params).promise();
    res.json(params.Item);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: 'Could not create appointment' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});