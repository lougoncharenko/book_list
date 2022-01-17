//book constructor
function Book(title, author, isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}


//UI constructor
function UI(){}

//add method to constructor
UI.prototype.addBooktoList=function(book){
    const list=document.getElementById('book-list');
    //create tr element
    const row=document.createElement('tr')
    //insert columns
    row.innerHTML=`
    <td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> ${book.isbn}</td>
    <td> <a href="#" class='delete'>X<a></td>`

 list.appendChild(row);

 // show alert
 UI.prototype.showAlert= function(message, className){
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

 }

 //clear fields
 UI.prototype.clearFields=function(){
     document.getElementById('title').value=" ";
     document.getElementById('author').value=" ";
     document.getElementById('isbn').value=" ";
 }
}

//event listners
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

    //show success
    ui.showAlert('Book added!', 'success');

    //clear fields
    ui.clearFields();  
    }

    

    e.preventDefault();
})