let xmlDoc;

window.onload = function () {
    loadBooks();
};

function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onload = function () {
        if (this.status === 200) {
            xmlDoc = this.responseXML;

            if (!xmlDoc) {
                showMessage("Malformed XML!", "error");
                return;
            }

            displayBooks();
        } else {
            showMessage("Error loading XML file", "error");
        }
    };
    xhr.send();
}

function displayBooks() {
    const table = document.getElementById("bookTable");
    table.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    if (books.length === 0) {
        showMessage("No books available", "error");
        return;
    }

    for (let i = 0; i < books.length; i++) {
        const availability = books[i].getElementsByTagName("availability")[0].textContent;

        const row = `
            <tr>
                <td>${books[i].getElementsByTagName("id")[0].textContent}</td>
                <td>${books[i].getElementsByTagName("title")[0].textContent}</td>
                <td>${books[i].getElementsByTagName("author")[0].textContent}</td>
                <td class="${availability === 'Available' ? 'available' : 'not-available'}">
                    ${availability}
                </td>
            </tr>
        `;

        table.innerHTML += row;
    }
}

function addBook() {
    const id = bookId.value;
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const status = bookStatus.value;

    if (!id || !title || !author || !status) {
        showMessage("All fields are required!", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            showMessage("Book ID already exists!", "error");
            return;
        }
    }

    const book = xmlDoc.createElement("book");

    const idNode = xmlDoc.createElement("id");
    idNode.textContent = id;

    const titleNode = xmlDoc.createElement("title");
    titleNode.textContent = title;

    const authorNode = xmlDoc.createElement("author");
    authorNode.textContent = author;

    const statusNode = xmlDoc.createElement("availability");
    statusNode.textContent = status;

    book.appendChild(idNode);
    book.appendChild(titleNode);
    book.appendChild(authorNode);
    book.appendChild(statusNode);

    xmlDoc.getElementsByTagName("library")[0].appendChild(book);

    displayBooks();
    showMessage("Book added successfully!", "success");
}

function updateBook() {
    const id = bookId.value;
    const status = bookStatus.value;

    if (!id || !status) {
        showMessage("Provide Book ID and Status!", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].getElementsByTagName("availability")[0].textContent = status;
            displayBooks();
            showMessage("Availability updated!", "success");
            return;
        }
    }

    showMessage("Book not found!", "error");
}

function deleteBook() {
    const id = bookId.value;

    if (!id) {
        showMessage("Enter Book ID!", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].parentNode.removeChild(books[i]);
            displayBooks();
            showMessage("Book deleted successfully!", "success");
            return;
        }
    }

    showMessage("Book not found!", "error");
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.className = type;
}