let xmlDoc;

window.onload = function () {
    loadEmployees();
};

function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onload = function () {
        if (this.status === 200) {
            xmlDoc = this.responseXML;
            displayEmployees();
        } else {
            showMessage("Error loading XML file", "error");
        }
    };
    xhr.send();
}

function displayEmployees() {
    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No employees found", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        const row = `
            <tr>
                <td>${employees[i].getElementsByTagName("id")[0].textContent}</td>
                <td>${employees[i].getElementsByTagName("name")[0].textContent}</td>
                <td>${employees[i].getElementsByTagName("department")[0].textContent}</td>
                <td>${employees[i].getElementsByTagName("salary")[0].textContent}</td>
            </tr>
        `;
        table.innerHTML += row;
    }
}

function addEmployee() {
    const id = empId.value;
    const name = empName.value;
    const dept = empDept.value;
    const salary = empSalary.value;

    if (!id || !name || !dept || !salary) {
        showMessage("All fields are required!", "error");
        return;
    }

    const employee = xmlDoc.createElement("employee");

    const idNode = xmlDoc.createElement("id");
    idNode.textContent = id;

    const nameNode = xmlDoc.createElement("name");
    nameNode.textContent = name;

    const deptNode = xmlDoc.createElement("department");
    deptNode.textContent = dept;

    const salaryNode = xmlDoc.createElement("salary");
    salaryNode.textContent = salary;

    employee.appendChild(idNode);
    employee.appendChild(nameNode);
    employee.appendChild(deptNode);
    employee.appendChild(salaryNode);

    xmlDoc.getElementsByTagName("employees")[0].appendChild(employee);

    displayEmployees();
    showMessage("Employee added successfully!", "success");
}

function updateEmployee() {
    const id = empId.value;
    const dept = empDept.value;
    const salary = empSalary.value;

    const employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {
            if (dept)
                employees[i].getElementsByTagName("department")[0].textContent = dept;
            if (salary)
                employees[i].getElementsByTagName("salary")[0].textContent = salary;

            displayEmployees();
            showMessage("Employee updated successfully!", "success");
            return;
        }
    }

    showMessage("Employee not found!", "error");
}

function deleteEmployee() {
    const id = empId.value;
    const employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {
            employees[i].parentNode.removeChild(employees[i]);
            displayEmployees();
            showMessage("Employee deleted successfully!", "success");
            return;
        }
    }

    showMessage("Employee not found!", "error");
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.className = type;
}