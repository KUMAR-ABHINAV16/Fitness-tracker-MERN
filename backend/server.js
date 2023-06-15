

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/fitness_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const activitySchema = new mongoose.Schema({
  name: String,
  duration: Number,
  calories: Number,
});


const Activity = mongoose.model('Activity', activitySchema);


app.post('/activities', async (req, res) => {
  const { name, duration, calories } = req.body;

  try {
    const activity = new Activity({ name, duration, calories });
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});


app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});


app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});




