let myLibrary = [];
const modal = document.querySelector('.bookAdd');
const button = document.querySelector('.addBook');
const modalClose = document.querySelector('.close');
const addBtn = document.querySelector('.add');
const bookName = document.querySelector('#book-name');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#pages');
const bookRead = document.querySelector('#read');
const library = document.querySelector('.library');

function Book(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;

    this.beenRead = function() {
        if (this.Read == 'Yes') {
            this.Read = 'No';
        } else { this.Read = 'Yes'; }
    };
}

function addBook(bookName, bookAuthor, bookPages, bookRead) {
    const newBook = new Book(bookName, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    let bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete Book';
    const readBtn = document.createElement('button');
    readBtn.textContent = 'Read/Unread';
    const lastBook = myLibrary[myLibrary.length-1];

    for(property in lastBook){
        if (typeof lastBook[property] != 'function') {
            let bookDetail = document.createElement('div');
            bookDetail.classList.add(`${property}`);
            bookDetail.textContent = `${property}: ${lastBook[property]}`;
            bookContainer.appendChild(bookDetail);
        }
    };

    delBtn.addEventListener('click', () => {
        bookContainer.remove();
        myLibrary = myLibrary.filter(function(item) {
            return item != lastBook;
        });
    });

    readBtn.addEventListener('click', () => {
        const readField = document.querySelector(`div#${lastBook.Title} div.Read`);

        lastBook.beenRead();
        readField.textContent = `Read: ${lastBook.Read}`;
    });

    bookContainer.id = `${lastBook.Title}`;
    bookContainer.appendChild(readBtn);
    bookContainer.appendChild(delBtn);
    library.appendChild(bookContainer);
}


button.addEventListener('click', () => modal.show());

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBook(bookName.value, bookAuthor.value, bookPages.value, bookRead.value);
    modal.close();
})

modalClose.addEventListener('click', () => modal.close());
