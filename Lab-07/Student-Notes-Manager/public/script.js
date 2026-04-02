const API = "http://localhost:3000/notes";


// ADD NOTE
function addNote() {

    const title = document.getElementById("title").value;
    const subject = document.getElementById("subject").value;
    const description = document.getElementById("description").value;

    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            subject,
            description
        })
    })
    .then(res => res.json())
    .then(() => {
        loadNotes();
    });

}


// VIEW NOTES
function loadNotes() {

    fetch(API)
    .then(res => res.json())
    .then(data => {

        let output = "";

        data.forEach(note => {

            output += `
            <div class="note">
                <h3>${note.title}</h3>
                <p><b>Subject:</b> ${note.subject}</p>
                <p>${note.description}</p>

                <button onclick="deleteNote('${note._id}')">Delete</button>
                <button onclick="editNote('${note._id}')">Edit</button>
            </div>
            `;

        });

        document.getElementById("notes").innerHTML = output;

    });

}


// DELETE NOTE
function deleteNote(id) {

    fetch(API + "/" + id, {
        method: "DELETE"
    })
    .then(() => loadNotes());

}


// UPDATE NOTE
function editNote(id) {

    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    fetch(API + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle,
            description: newDescription
        })
    })
    .then(() => loadNotes());

}


loadNotes();