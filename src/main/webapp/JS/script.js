/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function varLog(){
    let OK= new Boolean(false);
    let OK1=new Boolean(false);
    var user_log=document.getElementById("nomUsIniciar").value;
    var pass_log=document.getElementById("contrasena").value;
    var accion_in=document.getElementById("accion").value;
    if(user_log.length===0||user_log===null){
        alert("tiene que escribir su nombre de usuario");
        return 0;
    }else{
        if( user_log.length>=5){
            OK=Boolean(true);
        }
    }
    if(pass_log.length===0|| pass_log===null){
        alert("tiene que escribir su contraseña");
        return 0;
    }else{
       if( pass_log.length>7){
        OK1=Boolean(true);
    }
    }
    
    
    if(OK===true&&OK1===true){
        if (accion_in==="login"){
         $('#formLogID').submit();
    }
    //document.formLog.submit();
    //$('#formLogID').submit();
}
}

function varReg(){
    
    var OK= new Boolean(false);//nombre
    var OK1=new Boolean(false); //apellidos
    var OK2=new Boolean(false); //correo
    var OK3=new Boolean(false); //username
    var OK4=new Boolean(false); //fecha de nacimiento
    var OK5=new Boolean(false); //contraseña
    var OK6=new Boolean(false); //confirmar contraseña
    
    var name_reg=document.getElementById("nombre").value;
    var lastname_reg=document.getElementById("apellidos").value;
    var correo_reg=document.getElementById("correoCrear").value;
    var user_reg=document.getElementById("nomUs").value;
    var fechNac_reg=document.getElementById("fechNac").value;
    var pass_reg=document.getElementById("contrasena1").value;
    var cpass_reg=document.getElementById("contrasena2").value;
    var accion_Regin=document.getElementById("accionRegIn").value;
    
    var regexName=/^[ñÑa-zA-ZÁ-ÿ\s]+$/i;
    var regexCorreo = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    
    if(name_reg===0||name_reg===null){
         alert("tiene que escribir su nombre");
        return 0;
    }
    else{
        for(let i=0; i<name_reg.length;i++){
            if (!(name_reg.charCodeAt(i)>64 &&name_reg.charCodeAt(i)<91||name_reg.charCodeAt(i)>96 &&name_reg.charCodeAt(i)<123|| 
                    name_reg.charCodeAt(i)===32 ||
                   name_reg.charCodeAt(i)>192 &&name_reg.charCodeAt(i)<251)){
            alert("El nombre solo puede contener letras, acentos y espacios");
            return 0;
            }
        }
        if (!(/^[ñÑa-zA-ZÁ-ÿ\s]+$/i.test(name_reg))){
            alert("tiene que escribir un nombre valido");
        return 0;
        }
        else{
            OK=Boolean(true);
        }
    }

    if(lastname_reg===0||lastname_reg===null){
         alert("tiene que escribir su apellido");
        return 0;
    }
    else{
        for(let i=0; i<lastname_reg.length;i++){
            if (!(lastname_reg.charCodeAt(i)>64 &&lastname_reg.charCodeAt(i)<91||lastname_reg.charCodeAt(i)>96 &&lastname_reg.charCodeAt(i)<123|| 
                    lastname_reg.charCodeAt(i)===32||
                   lastname_reg.charCodeAt(i)>192 &&lastname_reg.charCodeAt(i)<251)){
            alert("El apellido solo puede contener letras, acentos y espacios");
            return 0;
            }
        }
        if (!(regexName.test(lastname_reg))){
            alert("tiene que escribir un apellido valido");
        return 0;
        }else{
            OK1=Boolean(true);
        }
    }
    
    if(correo_reg===0||correo_reg===null){
         alert("tiene que escribir su correo");
        return 0;
    }
    else{
        for(let i=0; i<correo_reg.length;i++){
            if (!(correo_reg.charCodeAt(i)>63 &&correo_reg.charCodeAt(i)<91||correo_reg.charCodeAt(i)>96 &&correo_reg.charCodeAt(i)<123|| correo_reg.charCodeAt(i)>44&&correo_reg.charCodeAt(i)<47||correo_reg.charCodeAt(i)>47&&correo_reg.charCodeAt(i)<58||correo_reg.charCodeAt(i)===95)){
            alert("El correo solo puede contener letras, numeros, arroba, punto, guion y guion bajo");
            return 0;
            }
        }
        if (!(regexCorreo.test(correo_reg))){
        alert("tiene que escribir un correo valido");
        return 0;
        }
        else{
            OK2=Boolean(true);
          
        }
    }
    
    if(user_reg.length===0||user_reg===null){
        alert("tiene que escribir su nombre de usuario");
        return 0;
    }
    else{
        if (!(user_reg.length>=5)){
        alert("tiene que escribir su nombre de usuario con minimo 5 caracteres");
        return 0;
        }else{
                for(let i=0;i<user_reg.length;i++){
                    if (!(user_reg.charCodeAt(i)>64 &&user_reg.charCodeAt(i)<91||user_reg.charCodeAt(i)>96 &&user_reg.charCodeAt(i)<123|| user_reg.charCodeAt(i)>44&&user_reg.charCodeAt(i)<47||user_reg.charCodeAt(i)>47&&user_reg.charCodeAt(i)<58|| user_reg.charCodeAt(i)===95)){
                     alert("tiene que escribir su nombre de usuario valido");
                     return 0;
                    }
                }
                  OK3=Boolean(true);
        }
    }
    
    if(fechNac_reg.length===0||fechNac_reg===null){
        alert("tiene que elegir una fecha de nacimiento");
        return 0;
    }
    else{
       
        var Fecha1 = new Date(fechNac_reg);
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
    if(pass_reg.length===0|| pass_reg===null){
        alert("tiene que escribir su contraseña");
        return 0;
    }
    else{
        let alpA=0;
        let alpa=0;
        let num=0;
        let spec=0;
        let anyElse=0;
        for(let i=0;i<pass_reg.length;i++){
            if (pass_reg.charCodeAt(i)>64 &&pass_reg.charCodeAt(i)<91){
                alpA++;
            }else if(pass_reg.charCodeAt(i)>96 &&pass_reg.charCodeAt(i)<123){
                alpa++;
            }else if(pass_reg.charCodeAt(i)>47 &&pass_reg.charCodeAt(i)<58){
                num++;
            }else if(pass_reg.charCodeAt(i)===33||pass_reg.charCodeAt(i)===42||pass_reg.charCodeAt(i)===95||pass_reg.charCodeAt(i)===126||pass_reg.charCodeAt(i)>62&&pass_reg.charCodeAt(i)<65||pass_reg.charCodeAt(i)>34&&pass_reg.charCodeAt(i)<39){
                spec++;
            }else{
                anyElse++;
                alert("tiene que escribir caracteres permitidos");
                return 0;
            }
         }
         if(pass_reg.length>7&&alpA>0&&alpa>0&&num>0&&spec>0){
             OK5=Boolean(true);
         }
        
        if(cpass_reg.length===0|| cpass_reg===null){
        alert("tiene que escribir la confimación de su contraseña");
        return 0;
        }else{
            if (pass_reg.length===cpass_reg.length){
                if (pass_reg===cpass_reg){
                     OK6=Boolean(true);
                }
            }else{
                alert("las contraseñas son diferentes");
                return 0;
            }
        }
    }
    
    if(OK===true&&OK1===true&&OK2===true&&OK3===true&&OK4===true&&OK5===true&&OK6===true){

    if(accion_Regin==="registar"){
        
    $('#formRegID').submit();
}
    }else{
        alert("Algo olvidaste");
    }
}
