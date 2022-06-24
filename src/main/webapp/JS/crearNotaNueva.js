/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//document.getElementById("pencil").addEventListener("click", crearNota);
//document.getElementById("editarNota").addEventListener("click", editarNota);
//document.getElementById("Cancelar").addEventListener("click", cerrarNota);

var contenedor_nota = document.querySelector(".contenedor__nota");
var notaGrande = document.querySelector(".notaGrande");

$(document).ready(function(){
    $("#pencil").click( function(){
        $('.contenedor__nota').show();
        
    });
    $("#lupa").click(function (){
        valBusqueda();
    });
   
    
     $("#Cancelar").click( function(){
        cerrarNota();
        $('.contenedor__nota').hide();
    });
    

});

function crearNota(){
    contenedor_nota.style.display = "block";
    
}
function editarNota(indiceNota){
    contenedor_nota.style.display = "block";
    editCard=true;
    cargaNotaSimple(indiceNota);
    notaGrande.style.dislpay="none";
}

function cerrarNota(){
    document.getElementById("titulo").value = "";
    document.getElementById("hashtags").value = "";
    document.getElementById("descripcion").value = "";
    clearInputFile(document.getElementById("fotoNota"));    /*La limpia de lafoto no jala*/
    //contenedor_nota.style.display = "none";
}

function clearInputFile(f) {
    if (f.value) {
        try {
            f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
        } catch (err) {
        }
        if (f.value) { //for IE5 ~ IE10
            var form = document.createElement('form'), ref = f.nextSibling;
            form.appendChild(f);
            form.reset();
            ref.parentNode.insertBefore(f, ref);
        }
    }
}