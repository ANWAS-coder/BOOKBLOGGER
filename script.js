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

// ฟังก์ชันแสดงรายการหนังสือ
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

// ฟังก์ชันเปิดฟอร์มเพิ่มหนังสือ
function addBook() {
    document.getElementById("bookFormModal").style.display = "block";
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookCover").value = "";
    document.getElementById("bookComment").value = "";
}

// ฟังก์ชันแก้ไขข้อมูลหนังสือ
function editBook(index) {
    document.getElementById("bookFormModal").style.display = "block";
    document.getElementById("bookTitle").value = books[index].title;
    document.getElementById("bookCover").value = books[index].cover;
    document.getElementById("bookComment").value = books[index].comment;
    document.getElementById("bookFormModal").setAttribute("data-edit-index", index);
}

// ฟังก์ชันบันทึกข้อมูลหนังสือ
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

// ปิดฟอร์ม
function closeForm() {
    document.getElementById("bookFormModal").style.display = "none";
}

// เรียกฟังก์ชันแสดงหนังสือเมื่อโหลดหน้าเว็บ
window.onload = displayBooks;

// แสดงตัวอย่างหน้าปกหนังสือ
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

// ปรับฟังก์ชัน saveBook เพื่อบันทึกไฟล์รูป
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

