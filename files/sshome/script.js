const fileList = document.getElementById('file-list');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const editorContainer = document.getElementById('editor-container');
const backBtn = document.getElementById('back-btn');
const createFileBtn = document.getElementById('create-file-btn');
const createFolderBtn = document.getElementById('create-folder-btn');

let currentPath = '../';

createFileBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Enter the name of the new file',
        input: 'text',
        inputPlaceholder: 'e.g., example.txt',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            const fileName = result.value;
            fetch('./api/create-file', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: currentPath, fileName }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire('Success!', 'File created successfully!', 'success');
                        fetchFiles(currentPath);
                    } else {
                        Swal.fire('Error!', data.error, 'error');
                    }
                });
        }
    });
});


// ฟังก์ชันสร้างโฟลเดอร์ใหม่
createFolderBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Enter the name of the new folder',
        input: 'text',
        inputPlaceholder: 'Folder name',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            const folderName = result.value;
            fetch('./api/create-folder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: currentPath, folderName }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire('Success!', 'Folder created successfully!', 'success');
                        fetchFiles(currentPath);
                    } else {
                        Swal.fire('Error!', data.error, 'error');
                    }
                });
        }
    });
});



// Helper: แสดงแจ้งเตือน
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

// โหลดไฟล์และโฟลเดอร์
function fetchFiles(path) {
    fetch(`./api/files?path=${encodeURIComponent(path)}`)
        .then(res => res.json())
        .then(data => {
            currentPath = path;
            fileList.innerHTML = '';
            // อัปเดตสถานะปุ่ม Back
            backBtn.classList.toggle('hidden', currentPath === './');

            data.forEach(file => {
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer';
                li.innerHTML = `
                    <span>${file.name}</span>
                    <div class="flex items-center space-x-2">
                        <button class="view-btn px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">View</button>
                        <button class="delete-btn px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                    </div>
                `;
                // กด View (สำหรับเปิดไฟล์หรือเข้าโฟลเดอร์)
                li.querySelector('.view-btn').addEventListener('click', () => {
                    if (file.isDirectory) {
                        fetchFiles(`${path}/${file.name}`);
                    } else {
                        openEditor(`${path}/${file.name}`);
                    }
                });
                // กด Delete
                li.querySelector('.delete-btn').addEventListener('click', () => deleteFile(`${path}/${file.name}`));
                fileList.appendChild(li);
            });
        });
}

// อัพโหลดไฟล์
uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        return Swal.fire('Error', 'Please select a file to upload.', 'error');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetPath', currentPath);

    fetch('./api/upload', { method: 'POST', body: formData })
        .then(res => res.json())
        .then(() => {
            Swal.fire('Success!', 'File uploaded successfully!', 'success');
            fetchFiles(currentPath);
        });
});


// เปิดตัวแก้ไขไฟล์
function openEditor(filePath) {
    fetch(`./api/file?path=${encodeURIComponent(filePath)}`)
        .then(res => res.json())
        .then(data => {
            editorContainer.querySelector('h3').textContent = `Editing: ${filePath}`;
            document.getElementById('editor').value = data.content;
            editorContainer.classList.remove('hidden');
        });
}

// บันทึกไฟล์
editorContainer.querySelector('#save-btn').addEventListener('click', () => {
    const content = document.getElementById('editor').value;
    fetch('./api/file', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: editorContainer.querySelector('h3').textContent.replace('Editing: ', ''), content }),
    }).then(() => {
        showAlert('File saved successfully!');
        editorContainer.classList.add('hidden');
    });
});

// ยกเลิกการแก้ไข
editorContainer.querySelector('#cancel-btn').addEventListener('click', () => {
    editorContainer.classList.add('hidden');
});

// ลบไฟล์
function deleteFile(filePath) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/api/file?path=${encodeURIComponent(filePath)}`, { method: 'DELETE' })
                .then(() => {
                    Swal.fire('Deleted!', 'File deleted successfully!', 'success');
                    fetchFiles(currentPath);
                });
        }
    });
}


backBtn.addEventListener('click', () => {
    const segments = currentPath.split('/').filter(segment => segment && segment !== '.');
    segments.pop(); // เอาโฟลเดอร์สุดท้ายออก
    const newPath = segments.length > 0 ? `./${segments.join('/')}` : './';
    fetchFiles(newPath);
});

// เริ่มต้นโหลดไฟล์
fetchFiles(currentPath);
