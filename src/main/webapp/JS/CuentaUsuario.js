/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('#nPCuenta1').keyup(function () { //si no funciona usar keypress
        $('#strengthMessage').html(checkStrength($('#nPCuenta1').val()));
    });
    function checkStrength(password) {
        var strength = 0;
        if (password.length < 8) {
            $('#strengthMessage1').removeClass();
            $('#strengthMessage1').addClass('Short');
            return 'Too short';
        }
        if (password.length > 8) strength += 1;
        // If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
        // If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
        // If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        // If it has two special characters, increase strength value.
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        // Calculated strength value, we can return messages
        // If value is less than 2
        if (strength < 2) {
            $('#strengthMessage1').removeClass();
            $('#strengthMessage1').addClass('Weak');
            return 'Weak';
        } 
        else if (strength === 2) {
            $('#strengthMessage1').removeClass();
            $('#strengthMessage1').addClass('Good');
            return 'Good';
        }
        else {
            $('#strengthMessage1').removeClass();
            $('#strengthMessage1').addClass('Strong');
            return 'Strong';
        }
    }
});

$(document).ready(function () {
    $('#nPCuenta2').keyup(function () { //si no funciona usar keypress
        $('#myequalMessage1').html(checkMatch($('#nPCuenta2').val()));
    });
    function checkMatch(pass2){
        let pass1=document.getElementById("nPCuenta1").value;
        if(pass1.length===pass2.length&&pass1.length>0&&pass1.length!==null){
            if(pass1===pass2){
                $('#myequalMessage1').removeClass();
                $('#myequalMessage1').addClass('AlikeE');
                return 'Alike';
            }else{
                $('#myequalMessage1').removeClass();
                $('#myequalMessage1').addClass('UnlikeE');
                return 'Unlike';
            }
            
        }else{
            $('#myequalMessage1').removeClass();
            $('#myequalMessage1').addClass('UnlikeE');
            return 'Unlike';
        }
    }
});

$(document).ready(function () {
$("#NewProfPic").change(function(e) {

    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

        var file = e.originalEvent.srcElement.files[i];

        
        var reader = new FileReader();
        reader.onloadend = function() {
            $('#ProfPic').attr("src",reader.result); 
        };
        reader.readAsDataURL(file);
    }
});

$('#fechNacCuenta').change(function() {
    var date = $(this).val();
    
    let edad= getAge(date);
    $("#Edad").text("Edad: "+edad);
});

$("#lupa").click(function (){
    var busquedaPage=document.getElementById("busqueda").value;
    if(!(busquedaPage===0||busquedaPage===null)){
        sessionStorage.setItem('busqueda', busquedaPage);
        window.location.href = "Inicio.html";
    }else{
        window.location.href = "Inicio.html";
    }
        //sessionStorage.getItem('label')
        
    });

function getAge(birthDate){
    let age= Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
    return age;
}
$.ajax({
    async: false, //no sincronas
    data: {"accion": "revisar"},
    type: "POST",
    dataType: "json",
    url: "Login"
}).done(function (data, textEstado, jqXHR) {
    console.log(data);
    if (data.Respuesta) {
      
        $("#nombreCuenta").val(data.usuario.nameUsuario);
        $("#apellidosCuenta").val(data.usuario.lastNameUsuario);
        $("#correoCuenta").val(data.usuario.correoUsuario);
        $("#nomUsCuenta").val(data.usuario.usuario);
        //$("#fechNacCuenta").val(data.usuario.cumpleUsuarioS);
        document.getElementById("fechNacCuenta").valueAsDate = new Date(data.usuario.cumpleUsuarioS);
        var birthDateS=data.usuario.cumpleUsuarioS;
        //const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
        let edad= getAge(birthDateS);
        $("#Edad").text("Edad: "+edad);
    
       // document.getElementById("Edad").value="Edad : "+ edad.toString();
        //revisar como cargar la foto
        if(data.usuario.fotoString=="-1") {
            $('#ProfPic').attr("src","Images/User.png");
        }else  {
            $('#ProfPic').attr("src", data.usuario.fotoString);
        }
    }
    else {
        alert("sesion no valido");
        window.location.href = "index.html";
    }
}
        ).fail(function (jqXHR, textEstado) {
    console.log("la solicitud fallos porque: " + textEstado);
});

 $("#formModID").submit(function (event) {
        event.preventDefault(); 
        var formData = new FormData(event.target);
        
        
        $.ajax({
            data: formData,
            dataType: "json",
            url: "Login",
            contentType: false,
            method: "POST",
            cache:false,
            processData: false
            }).done(function (data, textEstado, jqXHR){
                console.log(data);
                console.log(textEstado);
                if (data.Respuesta) {
                    alert("usuario modificado exitosamente");
                } else {
                    alert("no se pudo guardar los cambios.");
                }

            }).fail(function (jqXHR, textEstado){
                console.log( jqXHR);

                });

        });
});

function goBackInicio(){
    window.location.href="Inicio.html";
}

function valModCuenta(){
    let OK=new Boolean(false);
    let OK1=new Boolean(false);
    let OK2=new Boolean(false);
    let OK3=new Boolean(false);
    let OK4=new Boolean(false);
    
    
    let OKCPass=new Boolean(false);
    
    var name_mod=document.getElementById("nombreCuenta").value;
    var lastname_mod=document.getElementById("apellidosCuenta").value;
    var correo_mod=document.getElementById("correoCuenta").value;
    var user_mod=document.getElementById("nomUsCuenta").value;
    var fechNac_mod=document.getElementById("fechNacCuenta").value;
    var accion_mod=document.getElementById("accion").value;

    var pass_mod=document.getElementById("nPCuenta1").value;
    var pass2_mod=document.getElementById("nPCuenta2").value;
    
    var regexName=/^[ñÑa-zA-ZÁ-ÿ\s]+$/i;
    var regexCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if(name_mod===0||name_mod===null){
         alert("tiene que escribir su nombre");
        return 0;
    }
    else{
        for(let i=0; i<name_mod.length;i++){
            if (!(name_mod.charCodeAt(i)>64 &&name_mod.charCodeAt(i)<91||name_mod.charCodeAt(i)>96 &&name_mod.charCodeAt(i)<123|| 
                    name_mod.charCodeAt(i)===32 ||
                   name_mod.charCodeAt(i)>192 &&name_mod.charCodeAt(i)<251)){
            alert("El nombre solo puede contener letras, acentos y espacios");
            return 0;
            }
        }
        if (!(/^[ñÑa-zA-ZÁ-ÿ\s]+$/i.test(name_mod))){
            alert("tiene que escribir un nombre valido");
        return 0;
        }
        else{
            OK=Boolean(true);
        }
    }

    if(lastname_mod===0||lastname_mod===null){
         alert("tiene que escribir su apellido");
        return 0;
    }
    else{
        for(let i=0; i<lastname_mod.length;i++){
            if (!(lastname_mod.charCodeAt(i)>64 &&lastname_mod.charCodeAt(i)<91||lastname_mod.charCodeAt(i)>96 &&lastname_mod.charCodeAt(i)<123|| 
                    lastname_mod.charCodeAt(i)===32||
                   lastname_mod.charCodeAt(i)>192 &&lastname_mod.charCodeAt(i)<251)){
            alert("El apellido solo puede contener letras, acentos y espacios");
            return 0;
            }
        }
        if (!(regexName.test(lastname_mod))){
            alert("tiene que escribir un apellido valido");
        return 0;
        }else{
            OK1=Boolean(true);
        }
    }
    
    if(correo_mod===0||correo_mod===null){
         alert("tiene que escribir su correo");
        return 0;
    }
    else{
        for(let i=0; i<correo_mod.length;i++){
            if (!(correo_mod.charCodeAt(i)>63 &&correo_mod.charCodeAt(i)<91||correo_mod.charCodeAt(i)>96 &&correo_mod.charCodeAt(i)<123|| correo_mod.charCodeAt(i)>44&&correo_mod.charCodeAt(i)<47||correo_mod.charCodeAt(i)>47&&correo_mod.charCodeAt(i)<58||correo_mod.charCodeAt(i)===95)){
            alert("El correo solo puede contener letras, numeros, arroba, punto, guion y guion bajo");
            return 0;
            }
        }
        if (!(regexCorreo.test(correo_mod))){
        alert("tiene que escribir un correo valido");
        return 0;
        }
        else{
            OK2=Boolean(true);
          
        }
    }
    
    if(user_mod.length===0||user_mod===null){
        alert("tiene que escribir su nombre de usuario");
        return 0;
    }
    else{
        if (!(user_mod.length>=5)){
        alert("tiene que escribir su nombre de usuario con minimo 5 caracteres");
        return 0;
        }else{
                for(let i=0;i<user_mod.length;i++){
                    if (!(user_mod.charCodeAt(i)>64 &&user_mod.charCodeAt(i)<91||user_mod.charCodeAt(i)>96 &&user_mod.charCodeAt(i)<123|| user_mod.charCodeAt(i)>44&&user_mod.charCodeAt(i)<47||user_mod.charCodeAt(i)>47&&user_mod.charCodeAt(i)<58|| user_mod.charCodeAt(i)===95)){
                     alert("tiene que escribir su nombre de usuario valido");
                     return 0;
                    }
                }
                  OK3=Boolean(true);
        }
    }
    
    if(fechNac_mod.length===0||fechNac_mod===null){
        alert("tiene que elegir una fecha de nacimiento");
        return 0;
    }
    else{
       
        var Fecha1 = new Date(fechNac_mod);
        Fecha1.valueOf();
        if (isNaN(Fecha1)){
		alert("Fecha introducida incorrecta");
		return 0;
	}
	else{
        
        Hoy = new Date();//Fecha actual del sistema
 
        var AnyoFecha = Fecha1.getFullYear();
        var MesFecha = Fecha1.getMonth()+1;
        var DiaFecha = Fecha1.getDate();

        var AnyoHoy = Hoy.getFullYear();
        var MesHoy = Hoy.getMonth()+1;
        var DiaHoy = Hoy.getDate();
        
        if((DiaFecha<1||DiaFecha>31)||(MesFecha<1||MesFecha>12)||(AnyoFecha<1900||AnyoFecha>AnyoHoy)){
            alert("La fecha no es valida");
            return 0;
        }
        if (!(AnyoFecha<1900 || AnyoFecha>AnyoHoy)){
        if (AnyoFecha < AnyoHoy&&AnyoHoy-AnyoFecha>=13){
            OK4=Boolean(true);
        }
        else{
        alert("Los usuarios deben ser mayores de 13 años");
        return 0;
        	
	}  
        }
        else{
            alert("El año no es valido");
            return 0;
        }
    }
    }
    
    if(pass_mod.length===0|| pass_mod===null){
        pass_mod.value=null;
        pass2_mod.value=null;
    }
    else{
        let alpA=0;
        let alpa=0;
        let num=0;
        let spec=0;
        let anyElse=0;
        for(let i=0;i<pass_mod.length;i++){
            if (pass_mod.charCodeAt(i)>64 &&pass_mod.charCodeAt(i)<91){
                alpA++;
            }else if(pass_mod.charCodeAt(i)>96 &&pass_mod.charCodeAt(i)<123){
                alpa++;
            }else if(pass_mod.charCodeAt(i)>47 &&pass_mod.charCodeAt(i)<58){
                num++;
            }else if(pass_mod.charCodeAt(i)===33||pass_mod.charCodeAt(i)===42||pass_mod.charCodeAt(i)===95||pass_mod.charCodeAt(i)===126||pass_mod.charCodeAt(i)>62&&pass_mod.charCodeAt(i)<65||pass_mod.charCodeAt(i)>34&&pass_mod.charCodeAt(i)<39){
                spec++;
            }else{
                anyElse++;
                alert("tiene que escribir caracteres permitidos");
                return 0;
            }
         }
         if(pass_mod.length>7&&alpA>0&&alpa>0&&num>0&&spec>0){
            if(pass2_mod.length===0|| pass2_mod===null){
                  if(pass_mod!==null){
                      alert("tiene que escribir la confimación de su contraseña");
                      return 0;
                      }
            }else{
                  if (pass_mod.length===pass2_mod.length){
                      if (pass_mod===pass2_mod){
                           OKCPass=Boolean(true);
                      }
                  }else{
                      alert("las contraseñas son diferentes");
                      return 0;
                  }
            }
         }
        
        
    }
    
    if(OK===true&&OK1===true&&OK2===true&&OK3===true&&OK4===true&&OKCPass===true){
         $('#formModID').submit();
    }else if(OKCPass!==true &&(pass_mod.length===0&&pass2_mod.length===0)){
        if (accion_mod==="modCuenta"){
         $('#formModID').submit();
     }
    }else{
        alert("algo fallo");
        return 0;
    }
}
