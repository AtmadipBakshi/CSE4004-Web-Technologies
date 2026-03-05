const API = "http://localhost:3000";

function displayBooks(data) {

    let output = "";

    data.forEach(book => {

        output += `
        <div>
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <p>Price: ${book.price}</p>
        <p>Rating: ${book.rating}</p>
        <hr>
        </div>
        `;
    });

    document.getElementById("books").innerHTML = output;
}


// Search Books
function searchBook() {

    const title = document.getElementById("title").value;

    fetch(API + "/books/search?title=" + title)
        .then(res => res.json())
        .then(displayBooks);
}


// Filter Category
function filterCategory(cat) {

    fetch(API + "/books/category/" + cat)
        .then(res => res.json())
        .then(displayBooks);
}


// Sort Price
function sortPrice() {

    fetch(API + "/books/sort/price")
        .then(res => res.json())
        .then(displayBooks);
}


// Sort Rating
function sortRating() {

    fetch(API + "/books/sort/rating")
        .then(res => res.json())
        .then(displayBooks);
}


// Top Rated
function topBooks() {

    fetch(API + "/books/top")
        .then(res => res.json())
        .then(displayBooks);
}


// Pagination
function loadPage(page) {

    fetch(API + "/books?page=" + page)
        .then(res => res.json())
        .then(displayBooks);
}