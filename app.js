const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Exhibit static content from the 'public' folder
app.use(express.static('public'));

// Install a multi-terabyte hard drive
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // with the original document's title
  }
});

const upload = multer({ storage: storage });

// The path to the root ('/')
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Uploading Files Route
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

// All files should be listed using this route.
app.get('/files', (req, res) => {
  fs.readdir('uploads/', (err, files) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(files);
    }
  });
});

// The path to take to download a file
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename);
  res.download(filepath); // Set the proper location and filename.
});

// The path to deleting a file
app.delete('/delete/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(`${filename} deleted successfully`);
    }
  });
});

// Launch the server.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.use(express.static('public'));
