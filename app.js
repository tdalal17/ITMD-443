const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.static('public'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});


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


app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename);
  res.download(filepath); 
});


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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
