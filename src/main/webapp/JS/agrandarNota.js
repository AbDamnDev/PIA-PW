/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//document.getElementById("notaId").addEventListener("click", agrandarNota,false);
//document.getElementById("Cerrar").addEventListener("click", cerrarNotaGrande,false);

var nota_grande = document.querySelector(".notaGrande");
$(document).ready(function(){

    $("#Cerrar").click( function(){
        $('.notaGrande').hide();
    });
   

});

function agrandarNota(indiceNota){
    nota_grande.style.display = "block";
    cargaNotaSimple(indiceNota);
}

function cerrarNotaGrande(){
    nota_grande.style.display = "none";
}

