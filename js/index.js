
import { ImageUndefined } from '/js/ImageUndefined.js';
import  Store,{getBooks,addBook,removeBook} from '/js/Store.js';
class UI{
    AjoutLogo(){
        const h1title = document.querySelector("h1");
        h1title.innerHTML = `
        <img src="./images/logo.png" alt="logo" > `;
       
    }
    AjoutBtn(){
        const mybooks = document.getElementById("myBooks");
        const Hr = document.querySelector("hr");      
       
        const AjouterlivreBtn = document.createElement('div');
        AjouterlivreBtn.setAttribute("id","DivBtn");   
        AjouterlivreBtn.innerHTML = `
        <button id="AjouterBtn" type="button" class="btn btn--full-width">Ajouter un livre</button>      
        
        `;       
        mybooks.insertBefore(AjouterlivreBtn,Hr);    
    } 
    AjoutForm(){
        const mybooks = document.getElementById('myBooks');
        const Hr = document.querySelector("hr");    
		const ajoutForm = document.createElement('div');
		ajoutForm.setAttribute("id","formBook");
		ajoutForm.innerHTML = `
					
        <form class="form">
        
        <div class="form__field">
            <label class ="form__btn" >Titre du livre</label>
            <input type="text"  id="titreLivre" >
        </div>
        <div class="form__field">
            <label for="auteur">Auteur du livre</label>
            <input type="text"  id="auteurlivre" >
        </div>
        <div id="form_btn">
        <button type="submit" id="IdSearchBtn" class="IdSearchBtn btn btn--full-width">Rechercher</button>
        <button type="submit" id="IdAnnulerBtn" class="btn btn--full-width  btn--red-color" onclick="window.location.replace('index.html')">Annuler</button>
        </div>
    </form>
			
		`;
		
		mybooks.insertBefore(ajoutForm,Hr);
        const searchBtn = document.getElementById("IdSearchBtn");
        console.log(searchBtn.innerHTML);
        searchBtn.addEventListener("click", (e) => { 
            e.preventDefault();
            ui.DisplayBookSearch();
                   
        });
    } 
    
    ClickBtnAjtLvr(){
        const idBtnAjtLvr = document.getElementById("AjouterBtn");
        const idform = document.getElementById("formBook") ;
        idform.style.display = "none";
        idBtnAjtLvr.onclick= function(){
            if(idform.style.display = "none"){
                idform.style.display = "block";
			    idBtnAjtLvr.style.display = "none"; 
            }
        }
    }
    
    ListBook(id){
        const bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + id;
        
        return fetch(bookUrl)   
          
          .then((response) => {
              
            if(response.ok) {           
              return response.json();
            } else {
              throw new Error('Server response wasn\'t OK');
            }
          })
          .then((json) => {
            const result = json.items;
            return result;
          })        
    }
    MybooksListDisplay(){       
        const books = getBooks();        
		const lienDiv = document.createElement('div');
		lienDiv.setAttribute("id","liendiv");
		lienDiv.setAttribute("class","proj-grid");
		lienDiv.style.justifyContent = "space-around";
		const ui = new UI();
		const content = document.querySelector('#content');
		books.forEach((book) => ui.AddBookToList(book,lienDiv));
		content.append(lienDiv);
       
        
	}
	AddBookToList(id,content){		
        ui.ListBook(id).then((result) =>{
            var placeHldr = "/images/unavailable.png";
            for (var i = 0;i<result.length;i++){
                const item = result[i]; 
                const id = item.id;
                const titre = item.volumeInfo.title;
                const auteur = (item.volumeInfo.authors) ? item.volumeInfo.authors[0] : "nom de l'auteur manquant";
                const identifiant = item.volumeInfo.industryIdentifiers[0].identifier;
                const descript = (item.volumeInfo.description)?item.volumeInfo.description.substring(0,200)+"..." : "description manquante !";
                const imgbook = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;
 
                const row = document.createElement('div');
                row.setAttribute("class","proj-prev");
                row.innerHTML = `               	
                        <div class="proj-prev__heading ">                  
                        <p id ="idtitre"><strong>titre</strong> : ${titre}</p>  
                        <div> <img id ="${id}" class="removebook" src="./images/removebook.png" alt="toto bookmark" >  </div>              
                        </div> 
                            <div>
                                <p id ="ididentifiant" class="proj-prev__byline"> <strong>identifiant</strong>: ${identifiant}</p>
                                <p id = "idauteur" class="proj-prev__byline"> <strong>auteur</strong> : ${auteur}</p>
                                <p id="iddescription" class="proj-prev__byline" ><strong>description</strong> : ${descript} </p>
                                <div class = "proj-prev__image">
                                <img  id = "idimg" src="${imgbook}" alt="project title goes here" >
                                </div> 
                            </div>
                `;        
                content.append(row);        
            }        
            ui.deleteBookDisplay();
        });
        
	}
    deleteBookDisplayBySearch(id){
        const removeBooks = document.querySelectorAll(".removebook");  
        removeBooks.forEach((elem) => {
            if(elem.getAttribute('id') === id){
                elem.parentElement.parentElement.parentElement.remove();
            }
        }); 
    }
    deleteBookDisplay(){
        const removeBooks = document.querySelectorAll(".removebook");  
        console.log(removeBooks);
        removeBooks.forEach((elem) => {
            const id = elem.getAttribute('id');
            elem.addEventListener("click", (e) => { 
                e.target.parentElement.parentElement.parentElement.remove();
                removeBook(id);                
            });
        }); 
    }
    SearchBook(titre,auteur){

        if(titre == '' ){
            ui.showAlert('Entrer un titre ');
        }else{
        const bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + titre + auteur;        
        return fetch(bookUrl)          
          .then((response) => {              
            if(response.ok) {return response.json();} 
            else {throw new Error('Server response wasn\'t OK');}
          })
          .then((json) => {
            const result = json.items;
            
            return result; 
          }) 
        }       
    }

    DisplayBookSearch(){
    const Hr = document.querySelector("hr");
    const titleUi = document.getElementById('titreLivre').value;
    const authorUi = document.getElementById('auteurlivre').value;
    const searchlist = document.createElement('div');
    const mybooks = document.getElementById('myBooks');     
    searchlist.setAttribute("class","proj-grid");
    searchlist.setAttribute("id","idsearchlist");
   
        
    ui.SearchBook(titleUi,authorUi).then((result) =>{
        
        
        var placeHldr = "/images/unavailable.png";
        for (var i = 0;i<result.length;i++){
            const item = result[i]; 
            const titre = item.volumeInfo.title;
            const auteur = (item.volumeInfo.authors) ? item.volumeInfo.authors[0] : "nom de l'auteur manquant";
            const identifiant = item.volumeInfo.industryIdentifiers[0].identifier;
            const descript = (item.volumeInfo.description)?item.volumeInfo.description.substring(0,200)+"..." : "description manquante !";
            const imgbook = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;
            const id = item.id;
            
            const row = document.createElement('div');
            row.setAttribute("class","proj-prev");
            row.innerHTML = `               	
                    <div class="proj-prev__heading ">                  
                    <p id ="idtitre">titre : ${titre}</p>  
                    <div > <img id ="${id}" class="addbook" src="./images/bookmark.png" alt="project title goes here" >  </div>              
                    </div> 
                        <div class="card-body">
                            <p id ="ididentifiant" class="proj-prev__byline">identifiant : ${identifiant}</p>
                            <p id = "idauteur" class="proj-prev__byline"> auteur : ${auteur}</p>
                            <p id="iddescription" class="proj-prev__byline" >description : ${descript} </p>
                            <div class = "proj-prev__image">
                            <img  id = "idimg" src="${imgbook}" alt="project title goes here" >
                            </div> 
                        </div>
            `;        
            searchlist.append(row);        
        }
        mybooks.insertBefore(searchlist,Hr);
       ui.AddRemoveBook();
      
        
    });
     
    document.getElementById('titreLivre').value= "";   
    document.getElementById('auteurlivre').value= "";   
   }

    AddRemoveBook(){
        const content = document.getElementById('liendiv');
        const addBooks = document.querySelectorAll(".addbook");  
        addBooks.forEach((elem) => {
        elem.addEventListener("click", (e) => {   
          
            const storages = getBooks();
            const idbook = elem.getAttribute('id');
             
               
                if(ui.checkExist(storages, idbook) === false) {
                    addBook(idbook);
                    ui.AddBookToList(idbook,content);    
                    ui.showAlert('Ajout avec succès')  ;            
                }else{
                    removeBook(idbook);  
                    ui.deleteBookDisplayBySearch(idbook);              
                    ui.showAlert('Suppression avec succès');

                    
                }            
            });
        });  
        
    }
    checkExist(arr, val) {
        return arr.some(arrVal => val === arrVal);
    } 
    showAlert(message) {
        const div = document.createElement('div');
        div.setAttribute("id","alert");
        div.appendChild(document.createTextNode(message));
        const container = document.getElementById('myBooks');
        const form = document.getElementById('DivBtn');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('#alert').remove(), 2000);
      }
}

const ui = new UI();

// Event : Display Add book Button
document.addEventListener('DOMContentLoaded', () =>{
    ui.AjoutLogo();
    ui.AjoutBtn();
    ui.AjoutForm();
    ui.ClickBtnAjtLvr();

    ui.MybooksListDisplay();


    
});

