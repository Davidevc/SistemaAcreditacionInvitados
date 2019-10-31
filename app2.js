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


function addCliente(ci) {
if(validar()){
    var nombre = getID("nombre");
    var apellidoP = getID("apellidoPaterno");
    var apellidoM = getID("apellidoMaterno");
    var email = getID("email");
    var genero = getID("genero");
    var dia = getID("dia");
    var mes = getID("mes");
    var cinvitante = atob(window.location.search.replace(/^.*?\=/,''));
    console.log("Document written with ID: " + cinvitante);

  db.collection("cliente").doc(btoa(email)).set({
      nombre: nombre,
      apellidoP: apellidoP,
      apellidoM: apellidoM,
      email:  email,
      genero: genero,
      dia:  dia,
      mes:  mes,
      ci : cinvitante
  })
  .then(function(docRef) {
      enviar(btoa(email));
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
}

function enviar(correo){
    window.document.location = './invitacionadd.html'+'?correo='+correo;
};
