let students = [];

window.onload = function () {
    loadStudents();
};

function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading JSON file");
            }
            return response.json();
        })
        .then(data => {
            students = data;
            displayStudents();
        })
        .catch(error => {
            showMessage(error.message, "error");
        });
}

function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    if (students.length === 0) {
        showMessage("No student records found", "error");
        return;
    }

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function addStudent() {
    const id = parseInt(studentId.value);
    const name = studentName.value;
    const course = studentCourse.value;
    const marks = parseInt(studentMarks.value);

    if (!id || !name || !course || isNaN(marks)) {
        showMessage("All fields are required!", "error");
        return;
    }

    if (students.find(s => s.id === id)) {
        showMessage("Student ID already exists!", "error");
        return;
    }

    students.push({ id, name, course, marks });
    displayStudents();
    showMessage("Student added successfully!", "success");
}

function updateStudent() {
    const id = parseInt(studentId.value);
    const course = studentCourse.value;
    const marks = parseInt(studentMarks.value);

    const student = students.find(s => s.id === id);

    if (!student) {
        showMessage("Student not found!", "error");
        return;
    }

    if (course) student.course = course;
    if (!isNaN(marks)) student.marks = marks;

    displayStudents();
    showMessage("Student updated successfully!", "success");
}

function deleteStudent() {
    const id = parseInt(studentId.value);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        showMessage("Student not found!", "error");
        return;
    }

    students.splice(index, 1);
    displayStudents();
    showMessage("Student deleted successfully!", "success");
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.className = type;
}