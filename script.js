/* eslint-disable func-names */
/* eslint-disable no-script-url */
const addNewBook = document.querySelector('.addNewBook');
const library = document.querySelector('.library');

const bookStore = [
  {
    title: 'JavaScript: The Hidden Parts',
    author: 'Milecia McGregor',
    pages: 157,
  },
  {
    title: 'Learning JavaScript Design Patters, 2nd Edition',
    author: 'Addy Osmani',
    pages: 286,
  },
  {
    title: 'Data Visualization with Python and JavaScript, 2nd Edition',
    author: 'Kyran Dale',
    pages: 566,
  },
  {
    title: 'JavaScript Absolute Beginners Guide, 3rd Edition',
    author: 'Kirupa Chinnathambi',
    pages: 624,
  },
  {
    title:
      'Programming for Absolute Beginners: Using the JavaScript Programming Language',
    author: 'Jonathan Barlett',
    pages: 332,
  },
  {
    title:
      'The Essential Guide to HTML5: Using Games to Learn HTML5 and JavaScript',
    author: 'Jeanine Meyer',
    pages: 501,
  },
  {
    title: 'JavaScript from Frontend to Backend',
    author: 'Eric Sarrion',
    pages: 336,
  },
  {
    title:
      'Learn Enough JavaScript to Be Dangeorus: Write PRograms, Publish Packages, and Develop Interactive Websites with JavaScript',
    author: 'Michael Hartl',
    pages: 304,
  },
  {
    title: 'Essential Cryptography for JavaScript Developers',
    author: 'Alessandro Segala',
    pages: 220,
  },
  {
    title: 'Mordern Asynchronous JavaScript',
    author: 'Faraz K.Kelhini',
    pages: 77,
  },
  {
    title: 'JavaScript from Beginner to Professional',
    author: 'Laurence Lars Svekis, Maaike van Putten and Rob Percival',
    pages: 757,
  },
  {
    title:
      'Build Your Own 2D Game Engine and Create Greate Web Games: Using HTML5, JavaScript, and WebGL2',
    author: 'Kelvin Sung, Jebediah Pavleas, Matthew Munson, and Jason Pace',
    pages: 757,
  },
  {
    title:
      'Pro Data Visualization Using R and JavaScript: Analyze and Visualize Key Data on the Web',
    author: 'Tom Barker and Jon Westfall',
    pages: 278,
  },
  {
    title: 'Multithreaded JavaScript',
    author: 'Thomas Hunter and Bryan English',
    pages: 211,
  },
  {
    title: 'Begin to Code with JavaScript',
    author: 'Rob Miles',
    pages: 512,
  },
  {
    title: 'Learning PHP, MySQL & JavaScript, 6th Edition',
    author: 'Robin Nixon',
    pages: 823,
  },
  {
    title: 'JavaScript Cookbook, 3rd Edition',
    author: 'Adam D. Scott, Matthew MacDonald, and Shelley Powers',
    pages: 535,
  },
];

const myLibrary = [];

function Book(title, author, pages, read, isbn) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.isbn = isbn;
}

Book.prototype.remove = function remove() {
  const bookIndex = myLibrary.indexOf(this);
  myLibrary.splice(bookIndex, 1);
};

Book.prototype.toggleRead = function toggleRead() {
  this.read = !this.read;
  return this;
};

Book.newISBN = function newISBN() {
  const min = 10 ** 12;
  const max = 10 ** 13 - 1;
  const isbn = Math.floor(Math.random() * (max - min + 1)) + min;
  return isbn;
};

function addBookToLibrary(book) {
  const newBook = new Book(
    book.title,
    book.author,
    book.pages,
    book.read,
    book.isbn
  );
  myLibrary.push(newBook);
}

function removeBookfromLibrary(isbn) {
  const bookIndex = myLibrary.findIndex((book) => book.isbn === isbn);
  myLibrary[bookIndex].remove();
}

function updateBookReadState(isbn) {
  const bookIndex = myLibrary.findIndex((book) => book.isbn === isbn);
  return myLibrary[bookIndex].toggleRead();
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book');
  bookCard.setAttribute('data-isbn', book.isbn);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('book-deleteButton');
  bookCard.appendChild(deleteButton);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('book-property');
  const titleKey = document.createElement('span');
  titleKey.classList.add('book-key-title');
  titleKey.textContent = 'Title :';
  titleDiv.appendChild(titleKey);
  const titleValue = document.createElement('span');
  titleValue.classList.add('book-value-title');
  titleValue.textContent = book.title;
  titleDiv.appendChild(titleValue);
  bookCard.appendChild(titleDiv);

  const authorDiv = document.createElement('div');
  authorDiv.classList.add('book-property');
  const authorKey = document.createElement('span');
  authorKey.classList.add('book-key-author');
  authorKey.textContent = 'Author :';
  authorDiv.appendChild(authorKey);
  const authorValue = document.createElement('span');
  authorValue.classList.add('book-value-author');
  authorValue.textContent = book.author;
  authorDiv.appendChild(authorValue);
  bookCard.appendChild(authorDiv);

  const pagesDiv = document.createElement('div');
  pagesDiv.classList.add('book-property');
  const pagesKey = document.createElement('span');
  pagesKey.classList.add('book-key-pages');
  pagesKey.textContent = 'Pages :';
  pagesDiv.appendChild(pagesKey);
  const pagesValue = document.createElement('span');
  pagesValue.classList.add('book-value-pages');
  pagesValue.textContent = book.pages;
  pagesDiv.appendChild(pagesValue);
  bookCard.appendChild(pagesDiv);

  const readDiv = document.createElement('div');
  readDiv.classList.add('book-property');
  const readKey = document.createElement('span');
  readKey.classList.add('book-key-read');
  readKey.textContent = 'Read :';
  readDiv.appendChild(readKey);
  const readValue = document.createElement('input');
  readValue.classList.add('book-value-read');
  readValue.setAttribute('type', 'checkbox');
  readValue.checked = book.read;
  readDiv.appendChild(readValue);
  bookCard.appendChild(readDiv);

  return bookCard;
}

function getRandomBook() {
  if (bookStore.length === 0) {
    this.location.reload();
  }
  const randomIndex = Math.floor(Math.random() * bookStore.length);
  const randomBook = bookStore.splice(randomIndex, 1)[0];
  const isbn = Book.newISBN();
  const read = Math.floor(Math.random() * 2);
  randomBook.isbn = isbn;
  randomBook.read = Boolean(read);
  return randomBook;
}

function getNewBook() {
  const randomBook = getRandomBook();
  const bookCard = createBookCard(randomBook);
  addBookToLibrary(randomBook);
  library.appendChild(bookCard);
}

addNewBook.addEventListener('click', getNewBook);
library.addEventListener('click', (e) => {
  const { nodeName } = e.target;
  if (nodeName === 'BUTTON') {
    const { isbn } = e.target.parentNode.dataset;
    removeBookfromLibrary(Number(isbn));
    library.removeChild(e.target.parentNode);
  }
});

library.addEventListener('change', (e) => {
  const { nodeName, type } = e.target;
  if (nodeName === 'INPUT' && type === 'checkbox') {
    const { isbn } = e.target.parentNode.parentNode.dataset;
    updateBookReadState(Number(isbn));
  }
});
