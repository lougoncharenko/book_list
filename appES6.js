class Book{
    constructor(title, author, isbn){
         this.title=title;
         this.author=author;
         this.isbn=isbn;
    }
}

class UI{

    
    addBooktoList(book){
        const list=document.getElementById('book-list');
        const row=document.createElement('tr') //create tr element
        //insert columns
        row.innerHTML=`
        <td> ${book.title}</td>
        <td> ${book.author}</td>
        <td> ${book.isbn}</td>
        <td> <a href="#" class='delete'>X<a></td>`
    
     list.appendChild(row);
     
      };


    showAlert(message,className){
        //create div
   const div=document.createElement('div');
   //add classes
   div.className= `alert ${className}`;
   //add text
   div.appendChild(document.createTextNode(message));
   //ger parent
   const container=document.querySelector('.container');
   const form=document.querySelector('#book-form');
  //insert alert
   container.insertBefore(div, form);
   //disapear after 3 seconds
   setTimeout(function(){
       document.querySelector('.alert').remove();

   }, 3000);
    };



    deleteBook(target){
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
        };
    }

    clearFields(){
        document.getElementById('title').value=" ";
        document.getElementById('author').value=" ";
        document.getElementById('isbn').value=" ";
    }

}

//local storage class
class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books')=== null){
             books=[];
        }else {
            books=JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach(function(book){
            const ui=new UI;
            //add book to ui
            ui.addBooktoList(book);
        })

    }

    static addBook(book){
        const books=Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach(function(book, index){
         if(book.isbn === isbn) {
          books.splice(index, 1);
         }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }
    }


//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks );

//event listners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    //get form values
    const title=document.getElementById('title').value,
          author=document.getElementById('author').value,
          isbn=document.getElementById('isbn').value

    //instantiating book
    const book= new Book(title, author, isbn)
          

    //instantiate UI
    const ui= new UI();

    //validate
    if(title=== " " || author === " " || isbn === " "){
        //error alert
        ui.showAlert('Please fill in all fileds', "error")
    } else{
      //add book to list
    ui.addBooktoList(book);

    //add to local storage
    Store.addBook(book);

    //show success
    ui.showAlert('Book added!', 'success');

    //clear fields
    ui.clearFields();  
    }

    //local storage
   
    

    e.preventDefault();
})

//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    const ui= new UI();
    ui.deleteBook(e.target);

    //remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //show book deleted alert
    ui.showAlert('Book deleted', 'error')

    e.preventDefault();
})


