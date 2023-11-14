document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      fetchFiles(); // It's time to update the file list.
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
  function fetchFiles() {
    fetch('/files')
      .then(response => response.json())
      .then(files => {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = ''; 
        files.forEach(file => {
          const li = document.createElement('li');
          li.textContent = file;
          const downloadBtn = document.createElement('button');
          downloadBtn.textContent = 'Download';
          downloadBtn.onclick = function() { window.location.href = '/download/' + file; };
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.onclick = function() { deleteFile(file); };
          li.appendChild(downloadBtn);
          li.appendChild(deleteBtn);
          fileList.appendChild(li);
        });
      });
  }
  
  function deleteFile(filename) {
    fetch('/delete/' + filename, { method: 'DELETE' })
      .then(response => response.text())
      .then(data => {
        alert(data);
        fetchFiles(); // Refresh the file list
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // When the page loads, the first files are retrieved.
  fetchFiles();
  