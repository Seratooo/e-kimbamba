$('span.yourName').text(localStorage.getItem('Name'));

firebase.firestore().collection("Catador").get().then(function (querySnapshot) {
  
  // $('#residuos').html(''); 
   querySnapshot.forEach(function (doc) {

       const dados = doc.data();
       console.log(dados);
       $('#catadores').prepend(`
       <tr>
       <td>${dados.Name}</td>
       <td>${dados.Whatsapp}</td>
       <td>Ver Trabalho</td>
       <td><span class="status delivered">${dados.Estado}</span></td>
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