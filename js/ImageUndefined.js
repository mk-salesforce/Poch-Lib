export function ImageUndefined(imgbook){
    
    if (typeof imgbook === 'undefined' ){
        imgbook = '/images/unavailable.png'; 
    }
return imgbook;
}

//export{imageUndefind};