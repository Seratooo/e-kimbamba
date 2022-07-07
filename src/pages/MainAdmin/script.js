$('span.yourName').text(localStorage.getItem('Name'));

// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};


firebase.firestore().collection("Catador").get().then(function (querySnapshot) {
        // querySnapshot.forEach(function (doc) {
        $('.numbers.catadores').text(querySnapshot.size)
        // });
})

firebase.firestore().collection("Usuarios").get().then(function (querySnapshot) {
  // querySnapshot.forEach(function (doc) {
  $('.numbers.colaboradores').text(querySnapshot.size)
  // });
})

firebase.firestore().collection("Mensagens").get().then(function (querySnapshot) {
  // querySnapshot.forEach(function (doc) {
  $('.numbers.mensagens').text(querySnapshot.size)
  // });
})

firebase.firestore().collection("Residuos").get().then(function (querySnapshot) {
  
 // $('#residuos').html(''); 
  querySnapshot.forEach(function (doc) {
      const dados = doc.data();
      $('#residuos').prepend(`
      <tr>
      <td>${dados.name}</td>
      <td>${dados.Bairro}</td>
      <td>${dados.whatsapp}</td>
      <td><span class="status pending">${dados.Status || 'Pendente'}</span></td>
      </tr>`
      )

   });
})

firebase.firestore().collection("Catador").get().then(function (querySnapshot) {
  
  // $('#residuos').html(''); 
   querySnapshot.forEach(function (doc) {
       const dados = doc.data();
       $('#catadores').prepend(`
       <tr>
          <td width="60px">
           <ion-icon name="person-circle-outline"></ion-icon>
          </td>
          <td>
           <h4>${dados.Name} <br> <span>${dados.Whatsapp}</span></h4>
          </td>
      </tr>`
       )
 
    });
 })


 $('#logout').on('click',()=>{
 
  firebase.auth().signOut()
  .then(function () {
      
  }).catch(function (error) {
      // An error happened.
  });
  localStorage.clear();

 })