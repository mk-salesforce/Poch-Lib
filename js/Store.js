// Store Class: Handles Storage
export default class Store {
}
const store = new Store();
export function getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      return JSON.parse(localStorage.getItem('books'));
    }    
  }

export function addBook(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
export function removeBook(titre) {
    const books = getBooks();
    books.forEach((book, index) => {
      if(book === titre) {
        books.splice(index, 1);
      }else{
        console.log("aucune correspondance")
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
  