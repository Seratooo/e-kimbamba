const vName = document.getElementById('NameI');
const vEmail = document.getElementById('EmailI');
const vPassword = document.getElementById('PasswordI');
const vWhatsapp = document.getElementById('Whatsapp');
const btnInscrever = document.getElementById('btnInscrever');

function createLogin(){
  let feedBack = document.querySelector('.MessageSent');
  feedBack.style.display = 'flex';

  var Name, Email, Password, Whatsapp;

  if(vName){
    Name = vName.value;
  }

  if(vEmail){
    Email = vEmail.value;
  }

  if(vPassword){
    Password = vPassword.value;
  }

  if(vWhatsapp){
    Whatsapp = vWhatsapp.value;
  }

  var data = {
    Name,
    Email,
    Whatsapp,
    Password, 
  }

  console.log(data);

      firebase.auth().createUserWithEmailAndPassword(Email, Password)
      .then(function (user) {
          console.log(user);

         firebase.firestore().collection('Usuarios').doc(Email).set(data).then(()=>{
            localStorage.setItem('Name', Name);
            localStorage.setItem('Email',Email);
            localStorage.setItem('Whatsapp',Whatsapp);

            
            const loading = document.querySelector('.MessageSent .MyContent.loading');
            const message = document.querySelector('.MessageSent .MyContent.message');

            const closeIcon = document.querySelector('.MessageSent .MyContent.message .closeIcon');
            closeIcon.remove();

            // loading.style.display = 'none';
            message.style.display = 'flex';

            // const closeIcon = document.querySelector('.MessageSent .MyContent.message .closeIcon');
            // closeIcon.addEventListener('click',function(){
            //   feedBack.style.display='none';
            // });
             
            setTimeout(() => {
              window.location.href='/index.html';
            }, 1000);
         });
         
      })
      .catch(function (error) {
          console.log(error);
      });

}

btnInscrever.addEventListener('click',createLogin);


const EmailE = document.getElementById('EmailE');
const PasswordE = document.getElementById('PasswordE');
const btnEntrarE = document.getElementById('btnEntrar');

function doLogin(){
  let feedBack = document.querySelector('.MessageSent');
  feedBack.style.display = 'flex';

  var vEmail, vPassword;

  if(EmailE){
    vEmail = EmailE.value;
  }

  if(PasswordE){
    vPassword = PasswordE.value;
  }
  
    
  console.log(vEmail,vPassword);

 firebase.firestore().collection('Usuarios').doc(vEmail).get().then((doc) => {
      if (doc.exists) {
          localStorage.setItem('Name',doc.data().Name);
          localStorage.setItem('Email',doc.data().Email);
          localStorage.setItem('Whatsapp',doc.data().Whatsapp);
          localStorage.setItem('Cargo',doc.data().Cargo);
          
          firebase.auth().signInWithEmailAndPassword(vEmail, vPassword)
          .then(function (user) {


            const loading = document.querySelector('.MessageSent .MyContent.loading');
            const message = document.querySelector('.MessageSent .MyContent.message');

            const closeIcon = document.querySelector('.MessageSent .MyContent.message .closeIcon');
            closeIcon.remove();

            // loading.style.display = 'none';
            message.style.display = 'flex';

            // const closeIcon = document.querySelector('.MessageSent .MyContent.message .closeIcon');
            // closeIcon.addEventListener('click',function(){
            //   feedBack.style.display='none';
            // });
          
            setTimeout(() => {
              const IsforWork = document.getElementById('isWork');
              if(IsforWork.checked){
                if(localStorage.getItem('Cargo')=='Admin'){
                  window.location.href='/MainAdmin.html';
                }
                else if(localStorage.getItem('Cargo')=='Catador'){
                  window.location.href='/AdminCatador.html';
                }
                else{
                  alert('Ups! Você não parece ser colaborador!');
                  window.location.href='/index.html';
                }
              }else{
                window.location.href='/index.html';
              }
            }, 1000);

          })
          .catch(function (error) {
      
          });
      }
  }).catch((error) => {
  console.log("Error getting document:", error);
  });

}

btnEntrarE.addEventListener('click',doLogin);