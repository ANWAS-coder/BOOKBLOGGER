document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("nav ul li a:not(:only-child)").forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const siblingDropdown = this.nextElementSibling;
            if (siblingDropdown && siblingDropdown.classList.contains("nav-dropdown")) {

                siblingDropdown.classList.toggle("show");

                document.querySelectorAll(".nav-dropdown").forEach(function(dropdown) {
                    if (dropdown !== siblingDropdown) {
                        dropdown.classList.remove("show");
                    }
                })
            }
            e.stopPropagation();
        })
    })

    document.addEventListener("click", function() {
        document.querySelectorAll(".nav-dropdown").forEach(function(dropdown) {
            dropdown.classList.remove("show");
        });
    })
})

function toggleMenuIcon(el) {
    el.classList.toggle("change");
}

const menuIcon = document.getElementById("menuIcon");
const navParent = document.getElementById("navParent");

menuIcon.addEventListener("click", function() {
    if (navParent.style.display === "block") {
        navParent.style.display = "none";
    } else {
        navParent.style.display = "block";
    }
})

let books = [];

function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookItem.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" onclick="editBook(${index})">
            <p>${book.title}</p>
        `;
        bookList.appendChild(bookItem);
    });
}

function addBook() {
    document.getElementById("bookFormModal").style.display = "block";
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookCover").value = "";
    document.getElementById("bookComment").value = "";
}

function editBook(index) {
    document.getElementById("bookFormModal").style.display = "block";
    document.getElementById("bookTitle").value = books[index].title;
    document.getElementById("bookCover").value = books[index].cover;
    document.getElementById("bookComment").value = books[index].comment;
    document.getElementById("bookFormModal").setAttribute("data-edit-index", index);
}

function saveBook() {
    const title = document.getElementById("bookTitle").value;
    const cover = document.getElementById("bookCover").value;
    const comment = document.getElementById("bookComment").value;
    const editIndex = document.getElementById("bookFormModal").getAttribute("data-edit-index");

    if (editIndex) {
        books[editIndex] = { title, cover, comment };
        document.getElementById("bookFormModal").removeAttribute("data-edit-index");
    } else {
        books.push({ title, cover, comment });
    }
    
    closeForm();
    displayBooks();
}

function closeForm() {
    document.getElementById("bookFormModal").style.display = "none";
}

window.onload = displayBooks;

function previewCover() {
    const file = document.getElementById("bookCoverInput").files[0];
    const preview = document.getElementById("bookCoverPreview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    } else {
        preview.style.display = "none";
    }
}

function saveBook() {
    const title = document.getElementById("bookTitle").value;
    const cover = document.getElementById("bookCoverPreview").src;
    const comment = document.getElementById("bookComment").value;
    const editIndex = document.getElementById("bookFormModal").getAttribute("data-edit-index");

    if (editIndex) {
        books[editIndex] = { title, cover, comment };
        document.getElementById("bookFormModal").removeAttribute("data-edit-index");
    } else {
        books.push({ title, cover, comment });
    }
    
    closeForm();
    displayBooks();
}

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const bookItem = button.closest('.book-item'); 
      bookItem.remove(); 
    });
  });

