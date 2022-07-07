const EmailGlobal = localStorage.getItem('Email');
$('span.yourName').text(localStorage.getItem('Name'));



firebase.firestore().collection("Usuarios").doc(EmailGlobal).get().then(function (doc) {
  
  console.log(doc.data());
  const dados = doc.data();

   $('.cardName.Estado').text(dados.Estado);
   $('.numbers.corridas').text(dados.QntdCorridas);
   $('.numbers.montante').text(dados.Montante);
 });

 $('.card.estados').on('click',()=>{
    if($('.cardName.Estado').text() == 'Offline'){
      firebase.firestore().collection("Usuarios").doc(EmailGlobal).update({Estado: 'Online'}).then(function (doc) {
        $('.cardName.Estado').text('Online');
      });
      
      firebase.firestore().collection("Catador").doc(EmailGlobal).update({Estado: 'Online'}).then(function (doc) {
      });

    }else{
      firebase.firestore().collection("Usuarios").doc(EmailGlobal).update({Estado: 'Offline'}).then(function (doc) {
        $('.cardName.Estado').text('Offline');
      });
      firebase.firestore().collection("Catador").doc(EmailGlobal).update({Estado: 'Offline'}).then(function (doc) {
      });
    }
 })



 $('#logout').on('click',()=>{
  firebase.firestore().collection("Catador").doc(EmailGlobal).update({Estado: 'Offline'}).then(function (doc) {});
  firebase.firestore().collection("Usuarios").doc(EmailGlobal).update({Estado: 'Offline'}).then(function (doc) {
  
    firebase.auth().signOut()
    .then(function () {
      window.location.href='/index.html';
    }).catch(function (error) {
        // An error happened.
        window.location.href='/index.html';
    });
    localStorage.clear();

  });

 })


 setInterval(() => {

  if(($('.cardName.Estado').text()=='Online')){

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
        
        firebase.firestore().collection("Usuarios").doc(EmailGlobal).update({lat: position.coords.latitude, lnt:position.coords.longitude}).then(function (doc) {
         // console.log(position.coords.latitude, position.coords.longitude);
        })
        
        firebase.firestore().collection("Catador").doc(EmailGlobal).update({lat: position.coords.latitude, lnt:position.coords.longitude}).then(function (doc) {
        });

      });
    
    } else {
      alert("I'm sorry, but geolocation services are not supported by your browser.");
    }

  }
  
 }, 5000);

 firebase.firestore().collection("Usuarios").doc(EmailGlobal).collection('Corridas').get().then(function (querySnapshot) {
  
  // $('#residuos').html(''); 
   querySnapshot.forEach(function (doc) {
       const dados = doc.data();

       const tr = document.createElement('tr');
       tr.setAttribute('referenceId',doc.id);
       tr.innerHTML = `
       <td>${dados.name}</td>
       <td>${dados.Bairro}</td>
       <td>${dados.whatsapp}</td>
       <td><span class="status pending">${dados.Status || 'Pendente'}</span></td>
       `
       tr.addEventListener("click",()=>{
          $('.ContentPedidos').css('display','flex');

          $('.WrapperPedidos button.aceitar').on('click',(e)=>{
            tr.children[3].children[0].innerText = 'Em progresso';
            tr.children[3].children[0].classList.remove('pending');
            tr.children[3].children[0].classList.remove('delivered');
            tr.children[3].children[0].classList.add('inProgress');
            $('.ContentPedidos').css('display','none');
           })

           $('.WrapperPedidos button.concluir').on('click',()=>{
             tr.children[3].children[0].classList.remove('inProgress');
             tr.children[3].children[0].classList.remove('pending');
             tr.children[3].children[0].classList.add('delivered');
            $('.ContentPedidos').css('display','none');
            tr.children[3].children[0].innerText = 'Entregue';

           })

       })

       $('#residuos').prepend(tr);
 
    });
 })

 