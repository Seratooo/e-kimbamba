const btnLogin = document.querySelector('.login');


window.onscroll = function setFixedHeader(){
  const Header = document.querySelector('.MainHeader');
  const HeaderContent = document.querySelector('.FirstSectionMainHeader');
  if(window.scrollY > 120){
    Header.style.position = 'fixed';
    Header.style.backgroundColor = 'White';
    Header.style.width = '100%';
    Header.style.zIndex= '99999';
    HeaderContent.style.padding= '5px 0px';
    Header.style.boxShadow ='rgb(108 108 128 / 17%) 2px 4px 8px 0px';
  }else if (window.scrollY < 120){
    Header.style.position = 'unset';
    Header.style.backgroundColor = '#E5E5E5';
    HeaderContent.style.padding= '30px 0px';
    Header.style.boxShadow ='unset';
  }

}

const AboutUsBtn = document.querySelector('.MainContent_Wrapper.AboutUs button');

AboutUsBtn.addEventListener('click',function(){
  const QuemSomos = document.querySelector('.QuemSomosMore');
  QuemSomos.style.display = 'flex';

  const closeIcon = document.querySelector('.MyContent .closeIcon');
  closeIcon.addEventListener('click',function(){
    QuemSomos.style.display = 'none';
  })

})

const PortfolioBtn = document.querySelector('.MainContent_Wrapper.Portfolio button');
PortfolioBtn.addEventListener('click',function(){
  const btnLogin = document.querySelector('.login');
  
  if(btnLogin){
     const StartSession = document.querySelector('.StartSession');
     StartSession.style.display = 'flex';
     
     const closeIcon2 = document.querySelector('.StartSession .MyContent .closeIcon');
     closeIcon2.addEventListener('click',function(){
      StartSession.style.display='none';
     });
  

  }else{
    const NossosParceiros = document.querySelector('.NossoParceiroMore');
    NossosParceiros.style.display = 'flex';
  
    const closeIcon = document.querySelector('.NossoParceiroMore .MyContent .closeIcon');
    closeIcon.addEventListener('click',function(){
      NossosParceiros.style.display = 'none';
    })
  }



})

const TrabalheConnosco =  document.querySelector('.MainHeader-nav button');
TrabalheConnosco.addEventListener('click',function(){
  const btnLogin = document.querySelector('.login');
  
  if(btnLogin){
     const StartSession = document.querySelector('.StartSession');
     StartSession.style.display = 'flex';
     
     const closeIcon2 = document.querySelector('.StartSession .MyContent .closeIcon');
     closeIcon2.addEventListener('click',function(){
      StartSession.style.display='none';
     });

    }else{
    const NossosParceiros = document.querySelector('.NossoParceiroMore');
    NossosParceiros.style.display = 'flex';
  
    const closeIcon = document.querySelector('.NossoParceiroMore .MyContent .closeIcon');
    closeIcon.addEventListener('click',function(){
      NossosParceiros.style.display = 'none';
    })
  }

})

const BtnSendMessage = document.querySelector('.MainContent-ContactForm_Input button');
BtnSendMessage.addEventListener("click",function(e){
  e.preventDefault();
  let feedBack = document.querySelector('.MessageSent');
  feedBack.style.display = 'flex';

  const Name = document.querySelector('.MainContent-ContactForm_Input input#name');
  const Email = document.querySelector('.MainContent-ContactForm_Input input#email');
  const Text = document.querySelector('.MainContent-ContactForm_Input textarea#text');

  const data = {
    name: Name.value,
    email: Email.value,
    text: Text.value
  }

   //Add Automatico
   firebase.firestore().collection('Mensagens').add(data).then(()=>{
    console.log('Adicionado')
    const loading = document.querySelector('.MessageSent .MyContent.loading');
    const message = document.querySelector('.MessageSent .MyContent.message');

    loading.style.display = 'none';
    message.style.display = 'flex';

    const closeIcon = document.querySelector('.MessageSent .MyContent.message .closeIcon');
    closeIcon.addEventListener('click',function(){
      feedBack.style.display='none';
    });

    Name.value = '';
    Email.value = '';
    Text.value = '';
  })

});


if(btnLogin){

  setInterval(function(){
   btnLogin.style.bottom = '1.4rem';
  }, 2000);
  
  setInterval(function(){
    btnLogin.style.bottom = '1rem';
   }, 2500);
}



 firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
      // User is signed in.
     const login = document.querySelector('.login');
     login.remove();
     const NameContactForm = document.querySelector('.MainContent-ContactForm_Input input#name');
     const EmailContactForm = document.querySelector('.MainContent-ContactForm_Input input#email');
     const NamePartner = document.querySelector('.NossoParceiroMore .MyContent input#Name');
     const EmailPartner = document.querySelector('.NossoParceiroMore .MyContent input#Email');
     const whatsappPartner = document.querySelector('.NossoParceiroMore .MyContent input#whatsapp');

      
     NamePartner.value = NameContactForm.value = localStorage.getItem('Name');
     EmailPartner.value =  EmailContactForm.value = localStorage.getItem('Email');
     whatsappPartner.value = localStorage.getItem('Whatsapp');

     const TrabalheConnosco =  document.querySelector('.MainHeader-nav button a');
     TrabalheConnosco.innerText = localStorage.getItem('Name');
     //return currentUser;
  } else {
      // User is signed out.


     const registerBtn = document.querySelector('#Home .MainContent-text a');
     registerBtn.removeAttribute('href');
     registerBtn.addEventListener("click",()=>{
      const StartSession = document.querySelector('.StartSession');
      StartSession.style.display = 'flex';
      
      const closeIcon = document.querySelector('.StartSession .MyContent .closeIcon');
      closeIcon.addEventListener('click',function(){
       StartSession.style.display='none';
      });
     })
  }
});

let dataRegisto = {

}
const btnContinuar = document.querySelector('.NossoParceiroMore .MyContent .btnContinuar');
btnContinuar.addEventListener("click",function(){

  dataRegisto['Name'] = localStorage.getItem('Name');
  dataRegisto['Email'] = localStorage.getItem('Email');
  dataRegisto['Whatsapp'] = localStorage.getItem('Whatsapp');

  const RbButtons = document.querySelectorAll('.NossoParceiroMore .MyContent span input');
  RbButtons.forEach(rbbutton =>{
    if(rbbutton.checked){
      dataRegisto['Cargo'] = rbbutton.value;
    }
  })
  
  const NossoParceiroMore = document.querySelector('.NossoParceiroMore');
  NossoParceiroMore.style.display = 'none';

  const NossoParceiroSection2 = document.querySelector('.NossoParceiroSection2');
  NossoParceiroSection2.style.display = 'flex';

  const  closeBtn = document.querySelector('.NossoParceiroSection2 .MyContent .closeIcon');
  closeBtn.addEventListener("click",function(){
    NossoParceiroSection2.style.display = 'none';
  })

  const btnConcluir = document.querySelector('.NossoParceiroSection2 .MyContent .btnConcluir');
  btnConcluir.addEventListener("click",function(){
    let feedBack = document.querySelector('.MessageSent');
    feedBack.style.display = 'flex';

      const Endereco = document.querySelector('.NossoParceiroSection2 .MyContent input#Endereco');
      const Data = document.querySelector('.NossoParceiroSection2 .MyContent input#Data');
      const Disponibilidade = document.querySelector('.NossoParceiroSection2 .MyContent input#Disponibilidade');
      const Genero = document.querySelector('.NossoParceiroSection2 .MyContent select#Genero');

      dataRegisto['Endereco'] = Endereco.value;
      dataRegisto['Data'] = Data.value;
      dataRegisto['Disponibilidade'] = Disponibilidade.value;
      dataRegisto['Genero'] = Genero.value;
      dataRegisto['Estado'] = 'Offline';
      dataRegisto['QntdCorridas'] = '0';
      dataRegisto['Montante'] = '0,00';
      dataRegisto['lat'] = '0';
      dataRegisto['lnt'] = '0';




      console.log(dataRegisto);
      NossoParceiroSection2.style.display = 'none';

      firebase.firestore().collection(dataRegisto['Cargo']).doc(localStorage.getItem('Email')).set(dataRegisto).then(()=>{
        
        firebase.firestore().collection('Usuarios').doc(localStorage.getItem('Email')).update(dataRegisto).then(()=>{
          console.log('Adicionado')
          const loading = document.querySelector('.MessageSent .MyContent.loading');
          const message = document.querySelector('.MessageSent .MyContent.message');
          const MyMessage = document.querySelector('.MessageSent .MyContent.message > h2');
          MyMessage.innerText = 'Colaborador Registado!';
          
          loading.style.display = 'none';
          message.style.display = 'flex';
      
          const closeIcon = document.querySelector('.MessageSent .MyContent.message .closeIcon');
          closeIcon.addEventListener('click',function(){
            feedBack.style.display='none';
          });
  
        })
        
      })



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