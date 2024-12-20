const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/BugBusters', {
 
})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public/hackython_1'));
app.use(session({
  secret: 'mySecretKey',
  saveUninitialized: false, // Change to false to avoid creating sessions for unauthenticated users
}));

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.sendFile(__dirname + '/public/hackython_1/home.html');
  } else {
    res.sendFile(__dirname + '/public/hackython_1/index.html');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('hwl.html');
  } else {
    res.send('<h1>Invalid username or password</h1><a href="/">Try Again</a>');
  }
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/hackython_1/register.html');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    res.redirect('/');
  } catch (err) {
    res.send('<h1>Username already taken</h1><a href="/register">Try Again</a>');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
