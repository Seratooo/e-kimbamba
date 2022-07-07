var yourDistance = 999999999999999;
var CatadorEscolhido;
getLocation();

var platform = new H.service.Platform({
  'apikey': 'Zp550HLuUPr8GMNbnwsjPMP4Io8VCMmYcD9uJwE-_1c'
});
// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:

var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 14,
      center: { lat: -8.83833, lng: 13.2344 }
    });
 // Create the default UI:
 var ui = H.ui.UI.createDefault(map, defaultLayers, 'pt-PT');
 var mapEvents = new H.mapevents.MapEvents(map);
 map.addEventListener('drag', function(evt) {
  // Log 'tap' and 'mouse' events:
  //console.log(evt.type, evt.currentPointer.type); 
  document.body.style.cursor = "grabbing";
});

map.addEventListener('dragend', function(evt) {
  // Log 'tap' and 'mouse' events:
  //console.log(evt.type, evt.currentPointer.type); 
  document.body.style.cursor = "default";
});

map.addEventListener('tap', function(evt) {
  // Log 'tap' and 'mouse' events:
  //console.log(evt.type, evt.currentPointer.type); 
  const data = evt.target.getData();
  console.log(data);
});

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);





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

 let Localizacao = document.getElementById('selectBairro').value +" "+ document.getElementById('selectProvincia').value;
 if(Localizacao!=" "){
  Localizacao +=", Angola";
  var service = platform.getSearchService();
  
   service.geocode({
     q: Localizacao
   }, (result) => {
     // Add a marker for each location found
     result.items.forEach((item) => {
       map.addObject(new H.map.Marker(item.position));
       map.setCenter(item.position);
       LAtitude = item.position.lat;
       LOngitude = item.position.lng;

     });
   }, alert);

 }else{
   LAtitude = position.coords.latitude;
   LOngitude = position.coords.longitude;

   map.addObject(new H.map.Marker({lat:LAtitude, lng:LOngitude}));
   map.setCenter({lat:LAtitude, lng:LOngitude});

   document.querySelector('#selectBairro > option').innerText = 'Localização atual selecionada';
   document.querySelector('#selectProvincia > option').innerText = 'Localização atual selecionada';

   var bubble = new H.ui.InfoBubble({lat:LAtitude, lng:LOngitude}, {
    content: '<p>Sua localização atual!</p>'
   });

    // Add info bubble to the UI:
    ui.addBubble(bubble);
    LAtitude = position.coords.latitude;
    LOngitude = position.coords.longitude;

 }



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
      base64 = reader.result.split('base64,')[1];
  }
}

const MyLocation = document.querySelector('.MainContent-Form button.MyLocation');
MyLocation.addEventListener('click',getLocation)

const RegistarBtn = document.querySelector('.MainContent-Form button.btnRegistar');
RegistarBtn.addEventListener('click',function(){
  let feedBack = document.querySelector('.SuccessoRegistro');
  feedBack.style.display = 'flex';

  let ItensColeta = []; let Url;
  const name = localStorage.getItem('Name') || '';
  const email = localStorage.getItem('Email') || '';
  const whatsapp = localStorage.getItem('Whatsapp') || '';
  const Provincia = document.querySelector('._Info-input select#selectProvincia').value || '';
  const Bairro = document.querySelector('._Info-input select#selectBairro').value || '';

  const Itens = document.querySelectorAll('.MainContent-Item.selected');
  if(Itens){
    Itens.forEach(item=>{
      ItensColeta.push(item.childNodes[3].textContent);
    })
  }
  
  if(base64){
    const id = Math.floor(Date.now() * Math.random()).toString(36);
    ref.child('imagem'+id).putString(base64,'base64',{contentType:'image/png'}).then(snapshot =>{
      ref.child('imagem'+id).getDownloadURL().then(url=>{
        Url = ""+url;

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
          Status: 'Pendente',
        }

        firebase.firestore().collection("Usuarios").get().then(function (querySnapshot) {
             querySnapshot.forEach(function (doc) {
                const dados = doc.data();
                if(dados.Cargo == 'Catador'){
                  
                  if(dados.Estado == 'Online'){
                    const d = distance(LAtitude,LOngitude, dados.lat, dados.lnt, 'K');
                    if(yourDistance > d){
                      yourDistance = d;
                      CatadorEscolhido = dados;
                    }
                  }

                }

             })
        }).finally(function(){
          firebase.firestore().collection("Usuarios").doc(CatadorEscolhido.Email).collection('Corridas').add(Data).then(()=>{
            console.log(CatadorEscolhido, yourDistance);
          });
        })

        

        //Add Automatico
        firebase.firestore().collection('Residuos').add(Data).then(()=>{
          // console.log('Adicionado')
          const loading = document.querySelector('.SuccessoRegistro .MyContent.loading');
          const message = document.querySelector('.SuccessoRegistro .MyContent.message');

          loading.style.display = 'none';
          message.style.display = 'flex';

          const closeIcon = document.querySelector('.SuccessoRegistro .MyContent.message .closeIcon');
          closeIcon.addEventListener('click',function(){
            feedBack.style.display='none';
          })
        })
        
        })
    })

  }

})



function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}