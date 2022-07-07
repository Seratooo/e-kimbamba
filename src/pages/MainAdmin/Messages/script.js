$('span.yourName').text(localStorage.getItem('Name'));

firebase.firestore().collection("Mensagens").get().then(function (querySnapshot) {
  
  // $('#residuos').html(''); 
   querySnapshot.forEach(function (doc) {
       const dados = doc.data();
       $('#mensagens').prepend(`
       <tr>
       <td>${dados.name}</td>
       <td>${dados.email}</td>
       <td>${dados.text}</td>
       <td><span class="status delivered">Responder</span></td>
       </tr>`
       )
 
    });
 })

 $('#logout').on('click',()=>{
 
  firebase.auth().signOut()
  .then(function () {
      window.location.href='/index.html';
  }).catch(function (error) {
      // An error happened.
      window.location.href='/index.html';
  });
  localStorage.clear();

 })