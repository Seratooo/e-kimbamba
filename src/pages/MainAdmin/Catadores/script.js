$('span.yourName').text(localStorage.getItem('Name'));

firebase.firestore().collection("Catador").get().then(function (querySnapshot) {
  
  // $('#residuos').html(''); 
   querySnapshot.forEach(function (doc) {
       const dados = doc.data();
       $('#catadores').prepend(`
       <tr>
       <td>${dados.Name}</td>
       <td>${dados.Whatsapp}</td>
       <td>Ver Trabalho</td>
       <td><span class="status delivered">Ativo</span></td>
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