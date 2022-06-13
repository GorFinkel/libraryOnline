//json-server --watch db.json

let server = " http://localhost:3000/posts/";

function Book(title, author, pages, read, id) {
    return { title, author, pages, read, id };
}
let myLibrary = [];
let newBook;
let title = document.querySelector(".title");
let author = document.querySelector(".author");
let pages = document.querySelector(".pages");
let read = document.querySelector(".read");
let readCheck;
let reedIt = document.getElementById("reedIt");

function AddNewBook() {
    let id = myLibrary.length;
    document.querySelector(".bu").addEventListener("click", () => {
        if (reedIt.className === "fa fa-square-o") {
            readCheck = false;
        } else if (reedIt.className === "fa fa-check-square-o") {
            readCheck = true;
        }
        if (title.value.length) {
            newBook = new Book(title.value, author.value, pages.value, readCheck, id);
            myLibrary.push(newBook);
            console.log(myLibrary);
            setData(newBook);
            restore();
            deleteValue();
        } else if (!title.value.length) {
            newBook = new Book(
                title.placeholder,
                author.placeholder,
                pages.placeholder,
                readCheck,
                id,
            );
            myLibrary.push(newBook);
            console.log(myLibrary);
            setData(newBook);
            restore();

            deleteValue();
        }
        console.log("Thank You! Book added succesfully.");
    });
}
AddNewBook();

function deleteValue() {
    title.value = "";
    author.value = "";
    pages.value = "";
}

let book1 = new Book("Voina i Mir", "Tolstoi", "2000", " not read");
let book2 = new Book("Zolotaja Ribka", "Pushkin", "9", " read");
let book3 = new Book("Aolotaja Ribka", "ashkin", "9", " read");

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

// ubiraet vsjo chtobi mochno bilo post vsje zanovo iz bibliotieki
function deleteOnScreen() {
    document.querySelector(".lib").innerHTML = "";
}

// postit iz biblioteki po function createWindow. delaet vsje knigi iz library po tipy createWindow
function postOnScreen() {
    console.log(myLibrary);
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title) {
            createWindow(myLibrary[i], i);
        }
    }
}
//kachdaja kniga imeet takie properties
function createWindow(item, number) {
    let parent = document.createElement("div");
    let content = document.createElement("div");
    let library = document.querySelector(".lib");
    let check = document.createElement("button");
    let checkI = document.createElement("i");
    parent.className = "container book-cell task"; //css ramka dlja parent
    content.innerHTML =
        "<b>Title: </b>" +
        item.title +
        "<br>" +
        "<b> Author: </b>" +
        item.author +
        " " +
        "<br> " +
        "<h5>" +
        item.pages +
        " pages" +
        "</h5>";
    parent.append(content);

    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    parent.append(deleteButton);
    let faItem = document.createElement("i");
    faItem.className = "fa fa-times";
    deleteButton.append(faItem);
    check.className = "deleteButton";

    parent.append(check);
    if (item.read === true) {
        checkI.className = "fa fa-check-square-o";
    } else if (item.read === false) {
        checkI.className = "fa fa-square-o";
    }
    checkI.id = `k${number}`;
    checkI.onclick = function() {
        const checkBox = document.getElementById(`k${number}`);
        if (checkBox.className === "fa fa-square-o") {
            checkBox.className = "fa fa-check-square-o";
            // item.read=true
            updateRead(number, true);
        } else {
            checkBox.className = "fa fa-square-o";
            // item.read=false
            updateRead(number, false);
        }
    };
    check.append(checkI);
    library.append(parent);
    deleteButton.addEventListener("click", () => {
        let deleter = myLibrary.indexOf(item);
        console.log(myLibrary[item]);

        deleteOnScreen();
        postOnScreen();
        deleteData(number);
        restore();
    });
}

function updateRead(number, value) {
    numb = number + 1;

    fetch(`${server}${numb}`, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
        method: "PATCH",
        body: JSON.stringify({ read: value }),
    });
}

//json-server --watch db.json
function setData() {
    fetch(server, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
        method: "POST",
        body: JSON.stringify(newBook),
    });
}

function deleteData(number) {
    numb = number + 1;
    fetch(`${server}${numb}`, {
        headers: { "Content-type": "application/json; charset=UTF-8" },
        method: "PUT",
    });
    //   updateId(number)

    restore();
}

function restore() {
    fetch(server)
        .then((response) => response.json())
        .then((data) => {
            myLibrary = data
            deleteOnScreen();
            postOnScreen();
            console.log(myLibrary);
        });
}
restore();
console.log(myLibrary);

function checkInOut() {
    const checkBox = document.getElementById(`reedIt`);
    if (checkBox.className === "fa fa-square-o") {
        checkBox.className = "fa fa-check-square-o";
    } else {
        checkBox.className = "fa fa-square-o";
    }
}
