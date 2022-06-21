var map = L.map('map').setView([-8.83833,13.2344], 13);
var LAtitude, LOngitude;
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Voce clicou aqui - " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


const Itens = document.querySelectorAll('.MainContent-Item');

Itens.forEach(function(Item){
  Item.addEventListener('click',function(e){
      Item.classList.toggle('selected');
  })
});


window.onscroll = function setFixedHeader(){
  const Header = document.querySelector('.HeaderRegisto');
  const HeaderContent = document.querySelector('.wrapperRegisto');
  if(window.scrollY > 120){
    Header.style.position = 'fixed';
    Header.style.backgroundColor = 'White';
    Header.style.width = '100%';
    Header.style.zIndex= '99999';
    Header.style.boxShadow ='rgb(108 108 128 / 17%) 2px 4px 8px 0px';
    HeaderContent.style.padding= '5px 0px';
  }else if (window.scrollY < 120){
    Header.style.position = 'unset';
    Header.style.backgroundColor = '#E5E5E5';
    HeaderContent.style.padding= '30px 0px';
    Header.style.boxShadow ='unset';
  }

}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function setPosition(position) {
 L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
 map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 8);
 LAtitude = position.coords.latitude;
 LOngitude = position.coords.longitude;
 return position;
}

var inputImg = document.querySelector('#file-img');
var ref = firebase.storage().ref('arquivos');
var base64;
inputImg.onchange = function(event){
  var arquivo = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(arquivo);
  
  reader.onload = function(){
    //console.log(reader.result);
      base64 = reader.result.split('base64,')[1];
  }
}

const MyLocation = document.querySelector('.MainContent-Form button.MyLocation');
MyLocation.addEventListener('click',getLocation)

const RegistarBtn = document.querySelector('.MainContent-Form button.btnRegistar');
RegistarBtn.addEventListener('click',function(){
  
  let ItensColeta = []; let Url;
  const name = document.querySelector('._Info-input input#name').value || '';
  const email = document.querySelector('._Info-input input#email').value || '';
  const whatsapp = document.querySelector('._Info-input input#whatsapp').value || '';
  const Provincia = document.querySelector('._Info-input input#Provincia').value || '';
  const Bairro = document.querySelector('._Info-input input#Bairro').value || '';

  const Itens = document.querySelectorAll('.MainContent-Item.selected');
  if(Itens){
    Itens.forEach(item=>{
      ItensColeta.push(item.childNodes[3].textContent);
    })
  }
  
  if(base64){

    ref.child('imagem').putString(base64,'base64',{contentType:'image/png'}).then(snapshot =>{
      ref.child('imagem').getDownloadURL().then(url=>{
        Url = ""+url;
        //console.log('string para download: ',url);

        var Data = {
          name,
          email,
          whatsapp,
          Provincia,
          Bairro,
          ItensColeta,
          LAtitude,
          LOngitude,
          Url,
        }

        //Add Automatico
        firebase.firestore().collection('Residuos').add(Data).then(()=>{
          console.log('Adicionado')
        })
        
        const Sucess = document.querySelector('.SuccessoRegistro');
        Sucess.style.display='flex';

        const closeIcon = document.querySelector('.SuccessoRegistro .MyContent .closeIcon');
        closeIcon.addEventListener('click',function(){
            Sucess.style.display='none';
        })

        })
    })

  }

})