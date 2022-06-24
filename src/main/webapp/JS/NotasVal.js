/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var inicio=true;
var buscNorm=false;
var buscHash=false;
var buscFech=false;

var fecha1Bus=0;
var fecha2Bus=0;
var titBus=0;
var etiqBus=0;

var totalNotas=0;
var cantMostrar=10;
var paginasTotal=0;
var indicepos=0;

var indiceNota=0;
var editCard=false;
var clickedCard=false;
var deleteCard=false;

function ValNotes(){
  //document.getElementById("accion").value="registrar";
  var accion_not=document.getElementById("accionNota").value;
  if(accion_not==="modificar"){
      EditNotes();
  }else{
  
  
  
  var titulo_not=document.getElementById("titulo").value;
  var desc_not=document.getElementById("descripcion").value;
  var hashtags_not=document.getElementById("hashtags").value;
  let OK1=false;
  let OK2 =false;
  let OK3=false;
  
  accion_not="registrar";
    if(titulo_not===0||titulo_not===null){
         alert("tiene que escribir un titulo");
        return 0;
    }
    else{
        for(let i=0; i<titulo_not.length;i++){
            if (!(titulo_not.charCodeAt(i)>192 &&titulo_not.charCodeAt(i)<253
                   || titulo_not.charCodeAt(i)>31 &&titulo_not.charCodeAt(i)<127)){
            alert("Titulo con caracteres no validos");
            return 0;
            }
        }
        OK1=true;
    }
    
    if(desc_not===0||desc_not===null){
         alert("tiene que escribir una descripcion");
        return 0;
    }
    else{
        for(let i=0; i<desc_not.length;i++){
            if (!(desc_not.charCodeAt(i)>192 &&desc_not.charCodeAt(i)<253
                   || desc_not.charCodeAt(i)>31 &&desc_not.charCodeAt(i)<127)){
            alert("Descripcion con caracteres no validos");
            return 0;
            }
        }
        OK2=true;
    }
    
    
    let hashs=0;
    if(hashtags_not===0||hashtags_not===null){
        OK3=true;
    }
    else{
        for(let i=0; i<hashtags_not.length;i++){
            if (!( hashtags_not.charCodeAt(i)===35||hashtags_not.charCodeAt(i)===32 ||
                    hashtags_not.charCodeAt(i)>64 &&hashtags_not.charCodeAt(i)<91
                   || hashtags_not.charCodeAt(i)>96 &&hashtags_not.charCodeAt(i)<123)){
            alert("Hashtags con caracteres no validos, solo letras");
            return 0;
            }else if(hashtags_not.charCodeAt(i)===35){
                hashs++; 
            }
        }
        if(hashs>0){
        OK3=true;
        }
    }
  
    
    
    
        if(OK1===true&&OK2===true){
            if((accion_not==="registrar" &&OK3===true)||(OK3===false &&(hashtags_not.length===0))){
                $('#formNotaID').submit();
            }
        }else{
            alert("algo fallo");
            return 0;
        }
    }
}

function EditNotes(){
  //var accion_not=document.getElementById("accionNota").value;
  var id_not=$("#idnota").text();
  var titulo_not=document.getElementById("titulo").value;
  var desc_not=document.getElementById("descripcion").value;
  var hashtags_not=document.getElementById("hashtags").value;
  let OK1=false;
  let OK2 =false;
  let OK3=false;
  let OK4=false;
  
    if(titulo_not===0||titulo_not===null){
         alert("tiene que escribir un titulo");
        return 0;
    }
    else{
        for(let i=0; i<titulo_not.length;i++){
            if (!(titulo_not.charCodeAt(i)>192 &&titulo_not.charCodeAt(i)<251
                   || titulo_not.charCodeAt(i)>31 &&titulo_not.charCodeAt(i)<127)){
            alert("Titulo con caracteres no validos");
            return 0;
            }
        }
        OK1=true;
    }
    
    if(desc_not===0||desc_not===null){
         alert("tiene que escribir una descripcion");
        return 0;
    }
    else{
        for(let i=0; i<desc_not.length;i++){
            if (!(desc_not.charCodeAt(i)>192 &&desc_not.charCodeAt(i)<251
                   || desc_not.charCodeAt(i)>31 &&desc_not.charCodeAt(i)<127)){
            alert("Descripcion con caracteres no validos");
            return 0;
            }
        }
        OK2=true;
    }
    
    
    let hashs=0;
    if(hashtags_not===0||hashtags_not===null){
        OK3=true;
    }
    else{
        for(let i=0; i<hashtags_not.length;i++){
            if (!( hashtags_not.charCodeAt(i)===35||hashtags_not.charCodeAt(i)===32 ||
                    hashtags_not.charCodeAt(i)>64 &&hashtags_not.charCodeAt(i)<91
                   || hashtags_not.charCodeAt(i)>96 &&hashtags_not.charCodeAt(i)<123)){
            alert("Hashtags con caracteres no validos, solo letras");
            return 0;
            }else if(hashtags_not.charCodeAt(i)===35){
                hashs++; 
            }
        }
        if(hashs>0){
        OK3=true;
        }
    }
    
    if(id_not>0){
        OK4=true;
    }
  
    
    
    
    if(OK1===true&&OK2===true&&OK4===true){
         $('#formNotaID').submit();
     }
    
}

function valFechaNotes(){
  var fecha_Ant=document.getElementById("fechaAnt").value;
  var fecha_Des=document.getElementById("fechaDesp").value;
  let Hoy;
  
  let OK1=false;
  let OK2=false;
  
    if((fecha_Ant.length===0||fecha_Ant===null)&&(fecha_Des.length===0||fecha_Des===null)){
       alert("debe escoger al menos una fecha");
        return 0;
    }
    else{
        var AnyoFecha;
        var MesFecha; 
        var DiaFecha; 
        
        var AnyoHoy;
        var MesHoy; 
        var DiaHoy; 
        
        
       if(fecha_Ant!==null){
        var Fecha1 = new Date(fecha_Ant);
        Fecha1.valueOf();
        if (isNaN(Fecha1)){
	OK1=false;
	}
	else{
        
        Hoy = new Date();//Fecha actual del sistema
 
        AnyoFecha = Fecha1.getFullYear();
        MesFecha = Fecha1.getMonth()+1;
        DiaFecha = Fecha1.getDate();

        AnyoHoy = Hoy.getFullYear();
        MesHoy = Hoy.getMonth()+1;
        DiaHoy = Hoy.getDate();
        
            if((DiaFecha<1||DiaFecha>31)||(MesFecha<1||MesFecha>12)||(AnyoFecha<1900||AnyoFecha>AnyoHoy)){
                alert("La fecha no es valida");
                return 0;
            }
            if (!(AnyoFecha<1900 || AnyoFecha>AnyoHoy))
            {
                if (AnyoFecha <=AnyoHoy){
                    if(MesFecha<=MesHoy){
                        if(DiaFecha<=DiaHoy){
                            OK1=Boolean(true);
                        }else{
                            alert("No puede buscar fechas futuras");
                            return 0;
                        }
                    }else{
                        if(AnyoFecha<AnyoHoy){//aunque mes sea mayor, si el año es menor no hay problema
                            OK1=Boolean(true);
                        }else{//si el año no es menor no pasa
                            alert("No puede buscar fechas futuras");
                            return 0;
                        }
                    }

                }else{
                    alert("No puede buscar fechas futuras");
                    return 0;
                }  
            }else{
                alert("No son fechas validas");
                return 0;
            }
        }
        
    }
    //aqui termina de validar fecha 1
        if(fecha_Des!==null){
        var Fecha2 = new Date(fecha_Des);
        Fecha2.valueOf();
        if (isNaN(Fecha2)){
		OK2=false;
	}
	else{
        
        Hoy = new Date();//Fecha actual del sistema
 
        AnyoFecha = Fecha2.getFullYear();
        MesFecha = Fecha2.getMonth()+1;
        DiaFecha = Fecha2.getDate();

        AnyoHoy = Hoy.getFullYear();
        MesHoy = Hoy.getMonth()+1;
        DiaHoy = Hoy.getDate();
        
            if((DiaFecha<1||DiaFecha>31)||(MesFecha<1||MesFecha>12)||(AnyoFecha<1900||AnyoFecha>AnyoHoy)){
                alert("La fecha no es valida");
                return 0;
            }
            if (!(AnyoFecha<1900 || AnyoFecha>AnyoHoy))
            {
                if (AnyoFecha <=AnyoHoy){
                    if(MesFecha<=MesHoy){
                        if(DiaFecha<=DiaHoy){
                            OK2=Boolean(true);
                        }else{
                            alert("No puede buscar fechas futuras");
                            return 0;
                        }
                    }else{
                        if(AnyoFecha<AnyoHoy){//aunque mes sea mayor, si el año es menor no hay problema
                            OK2=Boolean(true);
                        }else{//si el año no es menor no pasa
                            alert("No puede buscar fechas futuras");
                            return 0;
                        }
                    }

                }else{
                    alert("No puede buscar fechas futuras");
                    return 0;
                }  
            }else{
                alert("No son fechas validas");
                return 0;
            }
        }
        
        
        }
        
    }
    if(OK1===true||OK2===true){
        $('#formFilFecha').submit();
    }else{
        alert("algo no se reviso");
    }
    
}

function DeleteNotes(){
    deleteCard=true;
    notaGrande.style.dislpay="none";
    if(indiceNota!==null &&indiceNota>0){
        eliminarNota(indiceNota);
    }
}

function cargaPaginaSimple(indice,cantidad){
    
        const fd=new FormData();
        fd.append('accion','listarPSimple');
        fd.append('indice',indice);
        fd.append('cantidad',cantidad);
        const options = {
            method: 'POST',
            body:fd
        };
        const grid = document.querySelector('.grid');
        const cardTemplate = document.getElementById('card-template');
//        for (let i = 0; i < 10; i++) {
//            grid.append(cardTemplate.content.cloneNode(true));
//        }
        fetch("Notas",options)
                .then(res => res.json())
                .then(respuesta => {
                    grid.innerHTML = '';
                   
                    respuesta.notas.forEach(nota => {
                        const div = cardTemplate.content.cloneNode(true);
                        //div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('#myID').value=nota.idNota; //solo asi podremos obtener el id
                        div.querySelector('[data-title]').textContent = nota.tituloNota;
                        div.querySelector('[data-body]').textContent = nota.descNota;
                        if(nota.fotoString!==0&& nota.fotoString!=="-1"){
                            div.querySelector('[data-image]').src=nota.fotoString;
                        }else{//cuando no hay imagen pone la default de internet
                            div.querySelector('[data-image]').src="https://source.unsplash.com/100x100/?nature";
                        }
                        grid.append(div);
                    });
                $('.card').click( function(){
                    indiceNota=$(this).find("#myID").text();
                     $('#editarNota .card').on("click", function(e){
                        editCard=true;
                      });
                    //let edit=$("#editarNota").click();
                    if(editCard===true){
                        editarNota(indiceNota);
                    }else if(deleteCard===true){
                        DeleteNotes();
                    }
                    else{
                        clickedCard=true;
                        agrandarNota(indiceNota);
                    }   
                   
                });
                }).catch(console.error);
    
    
    
}
//cargar la paginacion para busqueda por fecha
function cargaBusFecha(indice,cantidad,fecha1,fecha2){
    const fdBFL=new FormData();
        fdBFL.append('accion','listarBFecha');
        fdBFL.append('indice',indice);
        fdBFL.append('cantidad',cantidad);
        fdBFL.append('fecha1',fecha1);
        fdBFL.append('fecha2',fecha2);
        const options = {
            method: 'POST',
            body:fdBFL
        };
        const grid = document.querySelector('.grid');
        const cardTemplate = document.getElementById('card-template');
//        for (let i = 0; i < 10; i++) {
//            grid.append(cardTemplate.content.cloneNode(true));
//        }
        fetch("Notas",options)
                .then(res => res.json())
                .then(respuesta => {
                    grid.innerHTML = '';
                   
                    respuesta.notas.forEach(nota => {
                        const div = cardTemplate.content.cloneNode(true);
                        //div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('#myID').value=nota.idNota; //solo asi podremos obtener el id
                        div.querySelector('[data-title]').textContent = nota.tituloNota;
                        div.querySelector('[data-body]').textContent = nota.descNota;
                        if(nota.fotoString!==0&& nota.fotoString!=="-1"){
                            div.querySelector('[data-image]').src=nota.fotoString;
                        }else{//cuando no hay imagen pone la default de internet
                            div.querySelector('[data-image]').src="https://source.unsplash.com/100x100/?nature";
                        }
                        grid.append(div);
                    });
                $('.card').click( function(){
                    indiceNota=$(this).find("#myID").text();
                     $('#editarNota .card').on("click", function(e){
                        editCard=true;
                      });
                    //let edit=$("#editarNota").click();
                    if(editCard===true){
                        editarNota(indiceNota);
                    }else if(deleteCard===true){
                        DeleteNotes();
                    }
                    else{
                        clickedCard=true;
                        agrandarNota(indiceNota);
                    }   
                   
                });
                }).catch(console.error);
    
    fecha1Bus=fecha1;
    fecha2Bus=fecha2;
    
}

function cargaBusTitulo(indice,cantidad,titBus1){
     const fdBTL=new FormData();
        fdBTL.append('accion','listarBTit');
        fdBTL.append('indice',indice);
        fdBTL.append('cantidad',cantidad);
        fdBTL.append('titulo',titBus1);
        const options = {
            method: 'POST',
            body:fdBTL
        };
        const grid = document.querySelector('.grid');
        const cardTemplate = document.getElementById('card-template');
        fetch("Notas",options)
         .then(res => res.json())
                .then(respuesta => {
                    grid.innerHTML = '';
                   
                    respuesta.notas.forEach(nota => {
                        const div = cardTemplate.content.cloneNode(true);
                        //div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('#myID').value=nota.idNota; //solo asi podremos obtener el id
                        div.querySelector('[data-title]').textContent = nota.tituloNota;
                        div.querySelector('[data-body]').textContent = nota.descNota;
                        if(nota.fotoString!==0&& nota.fotoString!=="-1"){
                            div.querySelector('[data-image]').src=nota.fotoString;
                        }else{//cuando no hay imagen pone la default de internet
                            div.querySelector('[data-image]').src="https://source.unsplash.com/100x100/?nature";
                        }
                        grid.append(div);
                    });
                $('.card').click( function(){
                    indiceNota=$(this).find("#myID").text();
                     $('#editarNota .card').on("click", function(e){
                        editCard=true;
                      });
                    //let edit=$("#editarNota").click();
                    if(editCard===true){
                        editarNota(indiceNota);
                    }else if(deleteCard===true){
                        DeleteNotes();
                    }
                    else{
                        clickedCard=true;
                        agrandarNota(indiceNota);
                    }   
                   
                });
                }).catch(console.error);
    
    titBus=titBus1;
  
}

function cargaBusEtiq(indice,cantidad,etiqueta){
    const fdBEL=new FormData();
        fdBEL.append('accion','listarBEtiq');
        fdBEL.append('indice',indice);
        fdBEL.append('cantidad',cantidad);
        fdBEL.append('etiqueta',etiqueta);
        const options = {
            method: 'POST',
            body:fdBEL
        };
        const grid = document.querySelector('.grid');
        const cardTemplate = document.getElementById('card-template');
        fetch("Notas",options)
         .then(res => res.json())
                .then(respuesta => {
                    grid.innerHTML = '';
                   
                    respuesta.notas.forEach(nota => {
                        const div = cardTemplate.content.cloneNode(true);
                        //div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('[data-id]').textContent=nota.idNota;
                        div.querySelector('#myID').value=nota.idNota; //solo asi podremos obtener el id
                        div.querySelector('[data-title]').textContent = nota.tituloNota;
                        div.querySelector('[data-body]').textContent = nota.descNota;
                        if(nota.fotoString!==0&& nota.fotoString!=="-1"){
                            div.querySelector('[data-image]').src=nota.fotoString;
                        }else{//cuando no hay imagen pone la default de internet
                            div.querySelector('[data-image]').src="https://source.unsplash.com/100x100/?nature";
                        }
                        grid.append(div);
                    });
                $('.card').click( function(){
                    indiceNota=$(this).find("#myID").text();
                     $('#editarNota .card').on("click", function(e){
                        editCard=true;
                      });
                    //let edit=$("#editarNota").click();
                    if(editCard===true){
                        editarNota(indiceNota);
                    }else if(deleteCard===true){
                        DeleteNotes();
                    }
                    else{
                        clickedCard=true;
                        agrandarNota(indiceNota);
                    }   
                   
                });
                }).catch(console.error);
    
    etiqBus=etiqueta;
    
}

//este lo carga en notaGrande o en el form de Editar Nota
function cargaNotaSimple(indiceNota){
        const fdNS=new FormData();
        fdNS.append('accion','traerNota');
        fdNS.append('indiceNota',indiceNota);
        const options = {
            method: 'POST',
            body:fdNS
        };
        fetch("Notas",options)
                .then(res => res.json())
                .then(respuesta => {
                if(respuesta.nota!=null){
                    if(clickedCard===true){
                    
                    $("#idnotaG").text(respuesta.nota.idNota);
                    //document.getElementById("idnotaG").value=respuesta.nota.idNota;
                    $("#TituloNotaGrande").text(respuesta.nota.tituloNota);
                    //document.getElementById("TituloNotaGrande").value=respuesta.nota.tituloNota;
                    $("#EtiquetasNotaGrande").text(respuesta.nota.hashTagsNota);
                    //document.getElementById("TituloNotaGrande").value=respuesta.nota.tituloNota;
                    $("#CuerpoNotaGrande").text(respuesta.nota.descNota);
                    if(respuesta.nota.fotoString=="-1") {
                        $('#imgNotaG').attr("src","Images/placeholder-img.png");
                    }else if (respuesta.nota.foto !== null) {
                        $('#imgNotaG').attr("src", respuesta.nota.fotoString);
                    }
                    
                    //al final setear en falso
                    clickedCard=false;
                }else if(editCard===true){
                    $("#idnota").val(respuesta.nota.idNota);
                    $("#idnota").text(respuesta.nota.idNota);
                    $("#accionNota").val("modificar");
                    $("#titulo").val(respuesta.nota.tituloNota);
                    $("#hashtags").val(respuesta.nota.hashTagsNota);
                    $("#descripcion").val(respuesta.nota.descNota);
                    
                    var $input = $("#fotoNota");

                    $input.replaceWith($input.val('').clone(true));
                    
                    clearInputFile(document.getElementById("fotoNota"));
                    //resetFile();
                    
                    //file no lo vamos a poder setear
                    //lo que estaria bien seria poner un img
                    //al final setear en falso
                    editCard=false;
                }
                indiceNota=0;
                }
            
        }).catch(console.error);
        
        
        
}

function eliminarNota(indiceNota){
    const fdDN=new FormData();
        fdDN.append('accion','eliminar');
        fdDN.append('indiceNota',indiceNota);
        const options = {
            method: 'POST',
            body:fdDN
        };
        fetch("Notas",options)
                .then(res=>res.json())
                .then(respuesta=>{
                    
                    if (respuesta.Respuesta===true){
                        alert("Se eliminó su nota");
                        window.location.reload();
                        inicio=true;
                    }else{
                        alert("hubo un error");
                    }
                     deleteCard=false;
                     indiceNota=0;
        }).catch(console.error);
        
        
        }

function resetFile() {
  const file = document.querySelector('.file');
  file.value = '';
}

function valBusqueda(){
    var busqueda=document.getElementById("busqueda").value;
    if(busqueda===0||busqueda===null){
         alert("tiene que escribir algo para buscar");
        return 0;
    }else{
        let hashs=0;
        for(let i=0; i<busqueda.length;i++){
            if ((!(busqueda.charCodeAt(i)>192 &&busqueda.charCodeAt(i)<253
                   || busqueda.charCodeAt(i)>31 &&busqueda.charCodeAt(i)<127))){
            alert("Busqueda con caracteres no validos");
            return 0;
            }else if(busqueda.charCodeAt(i)===35){
                hashs++; 
            }
        }
        if(hashs>0){
            //var accion_busqueda=document.getElementById("accionBusqueda").value;
            if (hashs==1){
                //aqui manda a llamar al form y asigna el valor accion a busqueda por etiqueta
                //accion_busqueda="buscarEtiquetaC";
                sessionStorage.accion="buscarEtiquetaC";
                $('#formBus').submit();
                
            }else{
                alert("Busque una etiqueta a la vez");
                return 0;
            }
        
        }else{ //si no tiene ningun hashtag se busca normal
            sessionStorage.accion="buscarTituloC";
            //accion_busqueda="buscarTituloC";
            $('#formBus').submit();
            
        }
        
        
        
    }
    
    
}


 //cargar paginacion simple, al iniciar o al resetear
$(document).ready(function () {
    var busquedaPage=sessionStorage.getItem('busqueda');
    if(!(busquedaPage===0||busquedaPage===null)){
        $("#busqueda").val(busquedaPage);
        valBusqueda();
        sessionStorage.clear();
    }
   
    if(inicio===true){
    
        $.ajax({
        async: false, //no sincronas
        data: {"accion": "listarP"},
        method: "POST",
        dataType: "json",
        url: "Notas"
    }).done(function (data, textEstado, jqXHR){
        console.log(data);
            if (data.Respuesta===true) {
               if(data.items>0){
                    totalNotas=data.items;
                    
                    
                    document.querySelectorAll('.navBtn').forEach(e => e.remove());
                    if(totalNotas%cantMostrar===0){
                        paginasTotal=totalNotas/cantMostrar;
                    }else{
                        paginasTotal=Math.ceil(totalNotas/cantMostrar);
                    }
                    
                    var str='<button class="navBtn" id="prev">◄Prev</button>';
                    
                    for(let i=1;i<=paginasTotal;i++){
                        str+='<button class="navBtn indice" valor='+i+'>'+i+'</button>';
                    }
                    str+='<button class="navBtn" id="next">Next►</button>';
                    $("#paginacion").html(str);
                    $("#paginacion").css('display','flex');
                    
                    $("#paginacionFecha").hide();
                    $("#paginacionTitulo").hide();
                    $("#paginacionEtiqueta").hide();
                    cargaPaginaSimple(0,cantMostrar);
                    inicio=false;
                    buscNorm=false;
                    buscHash=false;
                    buscFech=false;
                    fecha1Bus=0;
                    fecha2Bus=0;
                    titBus=0;
                    etiqBus=0;
                    editCard=false;
                    clickedCard=false;
                    deleteCard=false;
                    $(".navFecha").removeClass("active");
                    $(".navTit").removeClass("active");
                    $(".navEti").removeClass("active");
                    
               }else{
                   alert("aun no hay notas");
               }
            } else {
                alert("hubo un error");
            }
        }
                ).fail(function (jqXHR, textEstado) {
                    console.log("la solicitud fallos porque: " + textEstado);
                });
    
    }
    
    });


//registrar O MODIFICAR nota
$(document).ready(function () {
    $("#formNotaID").submit(function (event) {
        event.preventDefault(); //prevenimos  que se ejecute otra accion del form
        event.stopImmediatePropagation();
        var formData1 = new FormData(event.target);
        $.ajax({
            async: false, //esto es lo que realmente evita que se inserte doble
            data: formData1,
            dataType: "json",
            url: "Notas",
            contentType: false,
            method: "POST",
            cache:false,
            processData: false
        }).done(function (data, textEstado, jqXHR) {
            if (data.Respuesta===true) {
                alert("se registró su nota");
                cerrarNota();
                window.location.reload();
                inicio=true; //al setear esta variable en true, se recargan las tarjetas
            } else {
                alert("no se pudo registrar su nota");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("la solicitud fallos porque: " + textEstado);
        });
    });
    
    $("#formFilFecha").submit(function (event){
        event.preventDefault(); //prevenimos  que se ejecute otra accion del form
        event.stopImmediatePropagation();
        const fdBF=new FormData(event.target);
        fdBF.append('accion','busFechaCant');
        $.ajax({
            async: false, //esto es lo que realmente evita que se inserte doble
            data: fdBF,
            dataType: "json",
            url: "Notas",
            contentType: false,
            method: "POST",
            cache:false,
            processData: false
        }).done(function (data, textEstado, jqXHR) {
            if (data.Respuesta===true) {
                //aqui se debe cargar la cantidad y hacer lo mismo de llenar los botones de la pagina
                if(data.items>0){
                    totalNotas=data.items;
                   
                   document.querySelectorAll('.navFecha').forEach(e => e.remove());
                    if(totalNotas%cantMostrar===0){
                        paginasTotal=totalNotas/cantMostrar;
                    }else{
                        paginasTotal=Math.ceil(totalNotas/cantMostrar);
                    }
                    
                    var str='<button class="navFecha" id="prevF">◄Prev</button>';
                    
                    for(let i=1;i<=paginasTotal;i++){
                        
                        str+='<button class="navFecha indiceF"  valor='+i+'>'+i+'</button>';
                        
                    }
                    str+='<button class="navFecha" id="nextF">Next►</button>';
                    $("#paginacionFecha").html(str);
                    
                    $("#paginacionFecha").css('display','flex');
                    $("#paginacion").hide();
                    $("#paginacionTitulo").hide();
                    $("#paginacionEtiqueta").hide();
                    
                    cargaBusFecha(0,cantMostrar,data.fecha1,data.fecha2);
                    inicio=false;
                    buscFech=true;
                   $(".navBtn").removeClass("active");
                   $(".navTit").removeClass("active");
                   $(".navEti").removeClass("active");
                   
                    
               }else{
                   alert("aun no hay notas");
               }
            } else {
                alert("no hay notas que coincidan con las fechas");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("la solicitud fallos porque: " + textEstado);
        });
        
        
        
    });
    
    $('#formBus').submit( function (event){
        event.preventDefault(); //prevenimos  que se ejecute otra accion del form
        event.stopImmediatePropagation();
        const fdBG=new FormData(event.target);
        fdBG.append('accion',sessionStorage.accion);
        sessionStorage.clear();
        $.ajax({
            async: false, //esto es lo que realmente evita que se inserte doble
            data:fdBG ,
            dataType: "json",
            url: "Notas",
            contentType: false,
            method: "POST",
            cache:false,
            processData: false
        }).done(function (data, textEstado, jqXHR) {
            if (data.Respuesta===true) {
                //aqui se debe cargar la cantidad y hacer lo mismo de llenar los botones de la pagina
                if(data.items>0){
                    totalNotas=data.items;
                    if(totalNotas%cantMostrar===0){
                        paginasTotal=totalNotas/cantMostrar;
                    }else{
                        paginasTotal=Math.ceil(totalNotas/cantMostrar);
                    }
                   if(data.bus=="etiqueta"){
                    document.querySelectorAll('.navEti').forEach(e => e.remove());
                   
                    
                    var str='<button class="navEti" id="prevE">◄Prev</button>';
                    
                    for(let i=1;i<=paginasTotal;i++){
                        
                        str+='<button class="navEti indiceE"  valor='+i+'>'+i+'</button>';
                        
                    }
                    str+='<button class="navEti" id="nextE">Next►</button>';
                    $("#paginacionEtiqueta").html(str);
                    
                    $("#paginacionEtiqueta").css('display','flex');
                    $("#paginacion").hide();
                    $("#paginacionTitulo").hide();
                    $("#paginacionFecha").hide();
                    
                    //cargaBusFecha(0,cantMostrar,data.fecha1,data.fecha2);
                    cargaBusEtiq(0,cantMostrar,data.variable);
                    
                    etiqBus=data.variable;
                    buscNorm=false;
                    buscHash=true;
                }
                   else if(data.bus=="tit"){
                    document.querySelectorAll('.navTit').forEach(e => e.remove());
                   
                    
                    var str='<button class="navTit" id="prevT">◄Prev</button>';
                    
                    for(let i=1;i<=paginasTotal;i++){
                        
                        str+='<button class="navTit indiceT"  valor='+i+'>'+i+'</button>';
                        
                    }
                    str+='<button class="navTit" id="nextT">Next►</button>';
                    $("#paginacionTitulo").html(str);
                    
                    $("#paginacionTitulo").css('display','flex');
                    $("#paginacion").hide();
                    $("#paginacionEtiqueta").hide();
                    $("#paginacionFecha").hide();
                    
                    //aqui mandamos a llamar cargar resultados 
                    cargaBusTitulo(0,cantMostrar,data.variable);
                    titBus=data.variable;
                    
                    buscNorm=true;
                    buscHash=false;
                }
                    inicio=false;
                    buscFech=false;
                    
                   $(".navBtn").removeClass("active");
                   $(".navTit").removeClass("active");
                   $(".navEti").removeClass("active");
                   $(".navFecha").removeClass("active");
                   
                    
               }else{
                   alert("aun no hay notas");
               }
            } else {
                alert("no hay notas que coincidan con la busqueda");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("la solicitud fallos porque: " + textEstado);
        });
        
        
    });
    
    });

//botones de la paginacion
$(document).ready(function () {
    //paginacion por fecha
    $(document).on("click",".indiceF",function(){
        $(".navFecha").removeClass("active");
        $(this).addClass("active");
        indicepos=$(this).attr("valor");
        if (indicepos==1){
            if(buscFech===true){
                cargaBusFecha(0,cantMostrar,fecha1Bus,fecha2Bus);
            }
        }else{
            if(buscFech===true){
                cargaBusFecha(((indicepos-1)*cantMostrar),cantMostrar,fecha1Bus,fecha2Bus);
            }
            
        }
        
    });
    $(document).on("click","#prevF",function(){
        $(".navFecha").removeClass("active");
        
        if(indicepos>0&&indicepos!=1){ //no activa el prev si solo hay 1
            indicepos--;
            $(".navFecha:nth-child("+indicepos+")").addClass("active");
            if(buscFech===true){
                cargaBusFecha(((indicepos-1)*cantMostrar),cantMostrar,fecha1Bus,fecha2Bus);
            }
        }
    });
    $(document).on("click","#nextF",function(){
         $(".navFecha").removeClass("active");
        //revisar que pasa si mi indice + 1 *cantMostrar es mayor a total de notas
        if((indicepos+1)*cantMostrar< totalNotas||(indicepos+1)*cantMostrar> totalNotas &&(indicepos+1)*cantMostrar <totalNotas+10){
            indicepos++;
            $(".navFecha:nth-child("+indicepos+")").addClass("active");
            if(buscFech===true){
                cargaBusFecha(((indicepos-1)*cantMostrar),cantMostrar,fecha1Bus,fecha2Bus);
            }
            
        }
    });
    
    //paginacion por titulo o contenido
    $(document).on("click",".indiceT",function(){
        $(".navTit").removeClass("active");
        $(this).addClass("active");
        indicepos=$(this).attr("valor");
        if (indicepos==1){
            if(buscNorm===true){
                
                cargaBusTitulo(0,cantMostrar,titBus);
            }
        }else{
            if(buscNorm===true){
                cargaBusTitulo(((indicepos-1)*cantMostrar),cantMostrar,titBus);
            }
            
        }
        
    });
    $(document).on("click","#prevT",function(){
        $(".navTit").removeClass("active");
        
        if(indicepos>0&&indicepos!=1){ //no activa el prev si solo hay 1
            indicepos--;
            $(".navTit:nth-child("+indicepos+")").addClass("active");
            if(buscNorm===true){
                cargaBusTitulo(((indicepos-1)*cantMostrar),cantMostrar,titBus);
            }
        }
    });
    $(document).on("click","#nextT",function(){
         $(".navTit").removeClass("active");
        //revisar que pasa si mi indice + 1 *cantMostrar es mayor a total de notas
        if((indicepos+1)*cantMostrar< totalNotas||(indicepos+1)*cantMostrar> totalNotas &&(indicepos+1)*cantMostrar <totalNotas+10){
            indicepos++;
            $(".navTit:nth-child("+indicepos+")").addClass("active");
            if(buscNorm===true){
                cargaBusTitulo(((indicepos-1)*cantMostrar),cantMostrar,titBus);
            }
            
        }
    });
    
    //paginacion por etiquetas  navEti
    $(document).on("click",".indiceE",function(){
        $(".navEti").removeClass("active");
        $(this).addClass("active");
        indicepos=$(this).attr("valor");
        if (indicepos==1){
            if(buscHash===true){
                
                cargaBusEtiq(0,cantMostrar,etiqBus);
            }
        }else{
            if(buscHash===true){
                cargaBusEtiq(((indicepos-1)*cantMostrar),cantMostrar,etiqBus);
                
            }
            
        }
        
    });
    $(document).on("click","#prevE",function(){
        $(".navEti").removeClass("active");
        
        if(indicepos>0&&indicepos!=1){ //no activa el prev si solo hay 1
            indicepos--;
            $(".navEti:nth-child("+indicepos+")").addClass("active");
            if(buscHash===true){
                cargaBusEtiq(((indicepos-1)*cantMostrar),cantMostrar,etiqBus);
            }
        }
    });
    $(document).on("click","#nextE",function(){
         $(".navEti").removeClass("active");
        //revisar que pasa si mi indice + 1 *cantMostrar es mayor a total de notas
        if((indicepos+1)*cantMostrar< totalNotas||(indicepos+1)*cantMostrar> totalNotas &&(indicepos+1)*cantMostrar <totalNotas+10){
            indicepos++;
            $(".navEti:nth-child("+indicepos+")").addClass("active");
            if(buscHash===true){
                cargaBusEtiq(((indicepos-1)*cantMostrar),cantMostrar,etiqBus);
            }
            
        }
    });
    
    //ya funciona, solo falta hacer que cargue la paginacion segun las busquedas
    $(".indice").click(function(){
        $(".navBtn").removeClass("active");
        $(this).addClass("active");
        indicepos=$(this).attr("valor");
        if (indicepos==1){
           
            cargaPaginaSimple(0,cantMostrar);
        
        }else{
            
            cargaPaginaSimple(((indicepos-1)*cantMostrar),cantMostrar);
            
        }
    });
    $("#prev").click(function(){
        $(".navBtn").removeClass("active");
        
        if(indicepos>0&&indicepos!=1){ //no activa el prev si solo hay 1
            indicepos--;
            $(".navBtn:nth-child("+indicepos+")").addClass("active");
            
                cargaPaginaSimple(((indicepos-1)*cantMostrar),cantMostrar);
            
        }
    });
    $("#next").click(function(){
        $(".navBtn").removeClass("active");
        //revisar que pasa si mi indice + 1 *cantMostrar es mayor a total de notas
        if((indicepos+1)*cantMostrar< totalNotas||(indicepos+1)*cantMostrar> totalNotas &&(indicepos+1)*cantMostrar <totalNotas+10){
            indicepos++;
            $(".navBtn:nth-child("+indicepos+")").addClass("active");
            
                cargaPaginaSimple(((indicepos-1)*cantMostrar),cantMostrar);
        }
    });
    

});



