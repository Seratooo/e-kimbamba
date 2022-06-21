


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
  const NossosParceiros = document.querySelector('.NossoParceiroMore');
  NossosParceiros.style.display = 'flex';

  const closeIcon = document.querySelector('.NossoParceiroMore .MyContent .closeIcon');
  closeIcon.addEventListener('click',function(){
    NossosParceiros.style.display = 'none';
  })

})

