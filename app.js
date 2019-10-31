// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAm2WFRj5F1V6yaop33C7CDXJ5MkGgsIj4",
  authDomain: "lista-de-invitados-evento.firebaseapp.com",
  projectId: "lista-de-invitados-evento"
});
var db = firebase.firestore();



function getID(id){
  return document.getElementById(id).value;
}


function addCliente() {
if(validar()){
  console.log("validar: ", validar());
    var nombre = getID("nombre");
    var apellidoP = getID("apellidoPaterno");
    var apellidoM = getID("apellidoMaterno");
    var email = getID("email");
    var genero = getID("genero");
    var dia = getID("dia");
    var mes = getID("mes");

  db.collection("cliente").doc(btoa(email)).set({
      nombre: nombre,
      apellidoP: apellidoP,
      apellidoM: apellidoM,
      email:  email,
      genero: genero,
      dia:  dia,
      mes:  mes
  })
  .then(function(docRef) {
      enviar(btoa(email));
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("nombre").value ='';
      document.getElementById("apellidoPaterno").value  ='';
      document.getElementById("apellidoMaterno").value  ='';
      document.getElementById("email").value  ='';
      document.getElementById("genero").value ='Masculino';
      document.getElementById("dia").value  ='1';
      document.getElementById("mes").value  ='enero';
    })

  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
}

/*
function validar(){
    var nombre = getID("nombre");
    var apellidoP = getID("apellidoPaterno");
    var apellidoM = getID("apellidoMaterno");
    var email = getID("email");

    if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) ) {
      $("#nombre").attr("class","form-control my-3 is-invalid");
      return false;
    }else {  $("#nombre").attr("class","form-control my-3");}
    if( apellidoP == null || apellidoP.length == 0 || /^\s+$/.test(apellidoP) ) {
      $("#apellidoPaterno").attr("class","form-control my-3 is-invalid");
      return false;
    }else{  $("#apellidoPaterno").attr("class","form-control my-3");}
    if( apellidoM == null || apellidoM.length == 0 || /^\s+$/.test(apellidoM) ) {
      $("#apellidoMaterno").attr("class","form-control my-3 is-invalid");
      return false;
    }else{  $("#apellidoMaterno").attr("class","form-control my-3");}

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
    $("#email").attr("class","form-control my-3 is-valid");
    return true;
  } else if (email == null || email.length == 0 || /^\s+$/.test(email)) {
    $("#email").attr("class","form-control my-3 is-invalid");
    return false;
    }
}*/

function enviar(correo){
    window.document.location = './invitacion.html'+'?correo='+correo;
};

function Copy(varReci)
    {
    var correoInvitado = btoa(varReci)
    var aux = document.createElement("input");
    aux.setAttribute("value", 'https://lista-de-invitados-evento.web.app/invitacioninvitado.html'+'?correo='+correoInvitado);
    aux.setAttribute
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("URL copiada al portapapeles\n\n" + './invitacioninvitado.html'+'?invitadode='+correoInvitado);
    }


    $("#botonimg").click(function () {
           canvasdiv = document.getElementById('invitacion');
           html2canvas(canvasdiv,
              {
                  onrendered: function (canvas) {
                    var a = document.createElement('a');
                    // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                    a.href = canvas.toDataURL("image/png").replace("image/jpeg", "image/octet-stream");
                    a.download = 'invitacion.jpg';
                    a.click();
                  }
              });
     });



      /*==================================================================
      [ Validate ]*/
      var input = $('.validate-input input');  /* Afectara a todos los input */

      function validar(){
            check = true;
            for(var i=0; i<input.length; i++) {
                if(validate(input[i]) == false){
                    showValidate(input[i]);
                    check = false;
                }
            }
            return check;
            console.log("valor de check: "+check);
      }


      $('.validate-form input').each(function(){    /* Al hacer focus, oculta la validacion */
          $(this).focus(function(){
             hideValidate(this);
          });
      });

      function validate (input) {   /* validar si es valido el correo o nombre, de no ser valido return false */
          if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
              if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                  return false;
              }
          }
          else {
              if($(input).val().trim() == ''){
                  return false;
              }
          }
      }

      function showValidate(input) {      /* muestra alerta de ser true el check */
          var thisAlert = $(input).parent();

          $(thisAlert).addClass('alert-validate');
      }

      function hideValidate(input) {   /* oculta la alerta */
          var thisAlert = $(input).parent();

          $(thisAlert).removeClass('alert-validate');
      }
