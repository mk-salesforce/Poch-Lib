

import {getBooks,addBook,removeBook} from '/js/Store.js';
import UI from '/js/UI.js';


const ui = new UI();

document.addEventListener('DOMContentLoaded',()=>{
    ui.AjoutLogo();
    ui.AjoutBtn();
    ui.AjoutForm();
    ui.ClickBtnAjtLvr();
    ui.MybooksListDisplay();   
});

