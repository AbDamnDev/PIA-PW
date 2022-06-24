/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//document.addEventListener().
//validar contraseñas
$(document).ready(function () {
    $('#contrasena1').keyup(function () { //si no funciona usar keypress
        $('#strengthMessage').html(checkStrength($('#contrasena1').val()));
    });
    function checkStrength(password) {
        var strength = 0;
        if (password.length < 8) {
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Short');
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
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Weak');
            return 'Weak';
        } 
        else if (strength === 2) {
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Good');
            return 'Good';
        }
        else {
            $('#strengthMessage').removeClass();
            $('#strengthMessage').addClass('Strong');
            return 'Strong';
        }
    }
});

$(document).ready(function () {
    $('#contrasena2').keyup(function () { //si no funciona usar keypress
        $('#myequalMessage').html(checkMatch($('#contrasena2').val()));
    });
    function checkMatch(pass2){
        let pass1=document.getElementById("contrasena1").value;
        if(pass1.length===pass2.length&&pass1.length>0&&pass1.length!==null){
            if(pass1===pass2){
                $('#myequalMessage').removeClass();
                $('#myequalMessage').addClass('AlikeE');
                return 'Alike';
            }else{
                $('#myequalMessage').removeClass();
                $('#myequalMessage').addClass('UnlikeE');
                return 'Unlike';
            }
            
        }else{
            $('#myequalMessage').removeClass();
            $('#myequalMessage').addClass('UnlikeE');
            return 'Unlike';
        }
    }
});

//validar forms
$(document).ready(function() {
  $("#formLogID").validate({
      rules:{
          nomUsIniciar:{
              required: true,
              minlegth: 5
          },
          contrasena:{
              required: true,
              minlegth: 8
          }
      },
      messages:{
          nomUsIniciar:{
              required: "Escribe tu nombre de usuario",
              minlegth: "Debes escribir mínimo 5 caracteres"
          },
          contrasena:{
              required: "Escribe tu contrasena",
              minlegth: "Debes escribir mínimo 8 caracteres"
          }
      }
      
  });
});

$(document).ready(function() {
  $("#formRegID").validate({
      rules:{
          nombre:{
              required: true,
              minlegth: 3,
              pattern: "[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+"
          },
          apellidos:{
              required: true,
              minlegth: 3,
              pattern: "[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+"
          },
          correoCrear:{
              required: true,
              minlegth: 3,
              email:true
          },
          nomUs:{
              required: true,
              minlegth: 5,
              pattern: "[A-Za-z0-9\_\-\.]+"
          },
          fechNac:{
              required: true
          },
          contrasena1:{
              required: true,
              minlegth: 8,
              pattern: "[A-Za-z0-9\_\-\.]+"
          },
          contrasena2:{
              required: true,
              minlegth: 8,
              pattern: "[A-Za-z0-9\_\-\.]+"
          }
        
      },
      messages:{
          nombre:{
              required: "Escribe tu nombre",
              minlegth: "Debes escribir mínimo 3 caracteres",
              pattern: "Solo puedes escribir letras de A-Z, la ñ, acentos y espacios"
              
          },
          apellidos:{
              required: "Escribe tu nombre",
              minlegth: "Debes escribir mínimo 3 caracteres",
              pattern: "Solo puedes escribir letras de A-Z,la ñ, acentos y espacios"
          },
          correoCrear:{
              required: "Escribe tu correo",
              pattern:"[A-Za-z0-9\_\-\.\@]+",
              email: "Tu email debe tener la siguiente forma: example@mail.com"
          },
          nomUs:{
              required: "Escribe tu nombre de usuario",
              minlegth: "Debes escribir mínimo 5 caracteres",
              pattern: "Solo puedes escribir letras de A-Z, guion, guion bajo y punto"
          },
          fechNac:{
               required: "Escoge una fecha de nacimiento"
          },
          contrasena1:{
              required: "Escribe tu contraseña",
              minlegth: "Debes escribir mínimo 8 caracteres",
              pattern: "[A-Za-z0-9\_\-\.]+"
          },
          contrasena2:{
              required: "Escribe tu contraseña nuevamente",
              minlegth: "Debes escribir mínimo 8 caracteres",
              pattern: "[A-Za-z0-9\_\-\.]+"
          }
      }
      
  });
});

//enviar cosas al servlet Login por el metodo POST
$.ajax({
    async: false, //no sincronas
    data: {"accion": "revisar"},
    type: "POST",
    dataType: "json",
    url: "Login"
}).done(function (data, textEstado, jqXHR) {
    //console.log("la solicitud se ha compleado correctamente");
    console.log(data);
    if (data.Respuesta===true) {
        
        window.location.href = "Inicio.html";
    } else {
        //alert("sesion no valido");

    }
}).fail(function (jqXHR, textEstado) {
    console.log("la solicitud fallos porque: " + textEstado);
});
$(document).ready(function () {
    $("#formLogID").submit(function (event) {
        event.preventDefault(); //prevenimos  que se ejecute otra accion del form
        $.ajax({
            //data:{"correo":"Brandon", "contrasenia":"Oscar"},
            data:$(this).serialize(),
            method: "POST",
            dataType: "json",
            url: "Login"
        }).done(function (data, textEstado, jqXHR) {
            console.log("la solicitud se ha compleado correctamente");
            console.log(data);
            if (data.Respuesta===true) {
                
                window.location.href = "Inicio.html";
            } else {
                alert("usuario no valido");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("la solicitud fallos porque: " + textEstado);
        });
    });
    
    $("#formRegID").submit(function (event) {
        event.preventDefault(); //prevenimos  que se ejecute otra accion del form
        
        $.ajax({
            //data:{"correo":"Brandon", "contrasenia":"Oscar"},
            data: $(this).serialize(),
            //data: new FormData (this),
            type: "POST",
            dataType: "json",
            url: "Login"
//            cache: false,
//            contentType: false,
//            processData: false
        }).done(function (data, textEstado, jqXHR) {
            console.log("la solicitud se ha compleado correctamente");
            console.log(data);
            if (data.Respuesta) {
                alert("usuario agregado");
                window.location.href = "Inicio.html";
            } 
            else {
                alert("usuario no agregado");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log( jqXHR);
        });
    });
    
});

