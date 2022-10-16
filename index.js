document.getElementById("consultaCidade").onclick = function (){

  if(document.querySelector("#inputCidade").value > "") {
  
  (buscaPrevisaoDoTempo())
  }
  else{ alert("Informe a cidade")
}
}

function buscaPrevisaoDoTempo() {

  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a971acd304mshf02c547d61db721p1659b6jsn24258aa44cba',
        'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
    }
  };
  
  fetch('https://foreca-weather.p.rapidapi.com/location/search/atibaia?lang=pt-br&country=br', options)
  
  fetch('https://foreca-weather.p.rapidapi.com/current/103460598?alt=0&tempunit=C&windunit=MS&lang=pt-br', options)
  .then(dadoscidadeatual => dadoscidadeatual.json())
  .then(dadoscidadeatual => cidadeatual(dadoscidadeatual))
  .catch(err => console.error(err));
  
          function cidadeatual(dadoscidadeatual){
  
            console.log(dadoscidadeatual)
            hora = new Date(dadoscidadeatual.current.time).getHours();
            
            // new Date(dadoscidadeatual.current.time).getHours()
  
          if (hora >= 5 && hora<=18){
            const style = document.createElement('style');
          style.innerHTML = `
          body{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh; 
            width: 100%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            transition: linear 3s;
            background-color: rgb(56, 135, 239);
          }
          #consultaCidade{
            border-radius: 20px;
            border: 0px;
            width: 150px;
            height: 30px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.292);
            background-color: white;
            transition: linear 1s;
          }
          .prevhoraria{
            position: sticky;
            display: flex;
            justify-content: left;
          
            width: 100%;
            left: 0%;
            padding-left: 22px;
            background-color: white;
            color: gray;
            z-index: 1;
            transition: linear 1s;
          }
          .prevdezdias{
            position: sticky;
            display: flex;
            justify-content: left;
            top:0%;
            padding-left: 22px;
            background-color: white;
            color: gray;
            z-index:1 ;
            transition: linear 1s;
          }
          .linhaMedia{
            position: relative;
            display: flex;
            justify-content: center;
            height: 10px;
            width: 110px;
            background-color: white;
            border-radius: 10px;
            transition: linear 3s;
          }
          .linhaTemp{
            position: relative;
            display: flex;
            justify-content: center;
            height: 10px;
            width: 100px;
            border: 1px solid gray;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
            transition: linear 3s;
          }`;
  
          document.head.appendChild(style);
          }
          else{
            const style = document.createElement('style');
            style.innerHTML = `
            }body{
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              min-height: 100vh; 
              width: 100%;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              transition: linear 3s;
              background-color: rgb(11, 2, 45);
            }
            #consultaCidade{
              border-radius: 20px;
              border: 0px;
              width: 150px;
              height: 30px;
              box-shadow: 0 0 3px rgba(0, 0, 0, 0.292);
              background-color: white;
              transition: linear 1s;
            }
            .prevhoraria{
              position: sticky;
              display: flex;
              justify-content: left;
            
              width: 100%;
              left: 0%;
              padding-left: 22px;
              background-color: white;
              color: gray;
              z-index: 1;
              transition: linear 1s;
            }
            .prevdezdias{
              position: sticky;
              display: flex;
              justify-content: left;
              top:0%;
              padding-left: 22px;
              background-color: white;
              color: gray;
              z-index:1 ;
              transition: linear 1s;
            }
            .linhaMedia{
              position: relative;
              display: flex;
              justify-content: center;
              height: 10px;
              width: 110px;
              background-color: white;
              border-radius: 10px;
              transition: linear 3s;
            }
            .linhaTemp{
              position: relative;
              display: flex;
              justify-content: center;
              height: 10px;
              width: 100px;
              border: 1px solid gray;
              border-radius: 10px;
              background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
              transition: linear 3s;
            }
            `
            ;
            document.head.appendChild(style);
          }
     
   
  document.getElementById("consultaCidade").onclick = function(){
  
        let cidade = document.getElementById("inputCidade").value;
        
      fetch('https://foreca-weather.p.rapidapi.com/location/search/'+cidade+'?lang=pt&country=br', options)
  
      .then(resposta => resposta.json())
      .then(resposta => localizacao(resposta))
      .catch(erro => console.error(erro))
      
      
  
      function localizacao(dados){
        
        
        let id = dados.locations[0].id;
  
        
        fetch('https://foreca-weather.p.rapidapi.com/current/'+id+'?alt=0&tempunit=C&windunit=MS&lang=pt-br', options)
        .then(dadoscidadeatual => dadoscidadeatual.json())
        .then(dadoscidadeatual => cidadeatual(dadoscidadeatual))
        .catch(err => console.error(err));
  
          function cidadeatual(dadoscidadeatual){
  
          fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/'+id+'?alt=0&tempunit=C&periods=10&lang=pt&dataset=full', options)
          .then(dadosdosdias => dadosdosdias.json())
          .then(dadosdosdias => info(dadosdosdias))
          .catch(err => console.error(err))
  
          function info(dadosdosdias){
           
              let prevagora = document.querySelector('#prevagora');
              let situacaoatual = dadoscidadeatual.current.symbolPhrase
              let nomeCidade = document.querySelector('#nomeCidade');
              let tempAtual = document.querySelector('#tempAtual');
              let maxTemp = document.querySelector('#maxTemp');
              let minTemp = document.querySelector('#minTemp');
  
              let letraMaiuscula = situacaoatual.charAt(0).toUpperCase()+situacaoatual.slice(1); 
  
              nomeCidade.innerHTML = `${dados.locations[0].name}`;
              tempAtual.innerHTML = `${dadoscidadeatual.current.temperature}º`;
              prevagora.innerHTML = `${letraMaiuscula}`;
              maxTemp.innerHTML = `Máx.: ${dadosdosdias.forecast[0].maxTemp}º`;
              minTemp.innerHTML = `Mín.: ${dadosdosdias.forecast[0].minTemp}º`;
  
  /*Área da previsão para os próximos dias*/
  
              for(periodo = 0; periodo <= 9; periodo++){
  
                let dia = "dia"+periodo;
                dia = new Date(dadosdosdias.forecast[periodo].date).getDate()+1;
  
                let diaDivRodape = "diaDivRodape"+periodo;
                diaDivRodape = document.querySelector('#diaDivRodape'+periodo);
                diaDivRodape.innerHTML = `${dia}`;
  
                let temperaturaMinima = "temperaturaMinima1"+periodo;
                temperaturaMinima = document.querySelector('#temperaturaMinima'+periodo);
                temperaturaMinima.innerHTML = `${dadosdosdias.forecast[periodo].minTemp}`
  
                let temperaturaMaxima = "temperaturaMaxima"+periodo;
                temperaturaMaxima = document.querySelector('#temperaturaMaxima'+periodo);
                temperaturaMaxima.innerHTML = `${dadosdosdias.forecast[periodo].maxTemp}`
  
                let icone = "divIcone"+periodo;
                icone = document.querySelector('#divIcone'+periodo);
                icone.innerHTML = `${dadosdosdias.forecast[periodo].symbol}`
  
                let imagens = ["d000","d100","d200","d300","d400","d500","d600","d210","d310","d410","d220","d320","d420","d430","d240","d340","d440","d211","d311","d411","d221","d321","d421","d431","d212","d312","d412","d222","d322","d422","d432","n000","n100","n200","n300","n400","n500","n600","n210","n310","n410","n220","n320","n420","n430","n240","n340","n440","n211","n311","n411","n221","n321","n421","n431","n212","n312","n412","n222","n322","n422","n432"]
            
                for(let simbolo = 0; simbolo <=61; simbolo++){
                  dadosdosdias.forecast[periodo].symbol === imagens[simbolo] ? icone.innerHTML = `<img style="width:30px; height:30px" src="https://developer.foreca.com/static/images/symbols/`+imagens[simbolo]+`.png">` : "-";
                }
              
              }
             
  
            
              
  
  
  /*fim da previsão para os próximos dias */
  
          fetch('https://foreca-weather.p.rapidapi.com/forecast/hourly/'+id+'?lang=pt&country=br&alt=0&periods=12&dataset=full&history=0', options)
          .then(response => response.json())
          .then(response => hourly(response))
          .catch(err => console.error(err));
  
          function hourly(porHora){
          
            for(let i = 0; i <= 11; i++){
              let hora = "hora"+i;
              hora = new Date(porHora.forecast[i].time).getHours()
                 
              let horaTemperatura = "horaTemperatura"+i;
              horaTemperatura = document.querySelector('#horaTemperatura'+i);
  
              horaTemperatura.innerHTML = `${hora}`;
  
              let icone = "icone"+i;
              icone = document.querySelector('#icone'+i);
              icone.innerHTML = `${porHora.forecast[i].symbol}`
              
              let temperaturaHora = "temperaturaHora"+i;
              temperaturaHora = document.querySelector('#temperaturaHora'+i);
              temperaturaHora.innerHTML = `${porHora.forecast[i].temperature}º`
  
  
              let imagens = ["d000","d100","d200","d300","d400","d500","d600","d210","d310","d410","d220","d320","d420","d430","d240","d340","d440","d211","d311","d411","d221","d321","d421","d431","d212","d312","d412","d222","d322","d422","d432","n000","n100","n200","n300","n400","n500","n600","n210","n310","n410","n220","n320","n420","n430","n240","n340","n440","n211","n311","n411","n221","n321","n421","n431","n212","n312","n412","n222","n322","n422","n432"]
            
              for(let j = 0; j<=61; j++){
                porHora.forecast[i].symbol == imagens[j] ? icone.innerHTML = `<img style="width:30px; height:30px" src="https://developer.foreca.com/static/images/symbols/`+imagens[j]+`.png">` : "-";
              }
  
            }    
            
          }
  
  
  
  /*Posição da barra branca da temperatura atual */
  
             tempAtual = dadoscidadeatual.current.temperature;
             maxTemp = dadosdosdias.forecast[0].maxTemp;
             let posicaoTempAtual = tempAtual/maxTemp*100;
  
  
              const temperaturaMaximadois = [];
              temperaturaMaximadois[0] = dadosdosdias.forecast[0].maxTemp;
              temperaturaMaximadois[1] = dadosdosdias.forecast[1].maxTemp;
              temperaturaMaximadois[2] = dadosdosdias.forecast[2].maxTemp;
              temperaturaMaximadois[3] = dadosdosdias.forecast[3].maxTemp;
              temperaturaMaximadois[4] = dadosdosdias.forecast[4].maxTemp;
              temperaturaMaximadois[5] = dadosdosdias.forecast[5].maxTemp;
              temperaturaMaximadois[6] = dadosdosdias.forecast[6].maxTemp;
              temperaturaMaximadois[7] = dadosdosdias.forecast[7].maxTemp;
              temperaturaMaximadois[8] = dadosdosdias.forecast[8].maxTemp;
              temperaturaMaximadois[9] = dadosdosdias.forecast[9].maxTemp; 
  
              
              const temperaturaMinimadois = [];
              temperaturaMinimadois[0] = dadosdosdias.forecast[0].minTemp;             temperaturaMinimadois[1] = dadosdosdias.forecast[1].minTemp;
              temperaturaMinimadois[2] = dadosdosdias.forecast[2].minTemp;
              temperaturaMinimadois[3] = dadosdosdias.forecast[3].minTemp;
              temperaturaMinimadois[4] = dadosdosdias.forecast[4].minTemp;
              temperaturaMinimadois[5] = dadosdosdias.forecast[5].minTemp;
              temperaturaMinimadois[6] = dadosdosdias.forecast[6].minTemp;
              temperaturaMinimadois[7] = dadosdosdias.forecast[7].minTemp;
              temperaturaMinimadois[8] = dadosdosdias.forecast[8].minTemp;
              temperaturaMinimadois[9] = dadosdosdias.forecast[9].minTemp; 
  
  
              let difTemp = Math.max(...temperaturaMaximadois) - Math.min(...temperaturaMinimadois); 
  
            
              let difTempDia0 = temperaturaMaximadois[0] - dadosdosdias.forecast[0].minTemp;
              let difTempDia1 = temperaturaMaximadois[1] - dadosdosdias.forecast[1].minTemp;
              let difTempDia2 = temperaturaMaximadois[2] - dadosdosdias.forecast[2].minTemp;
              let difTempDia3 = temperaturaMaximadois[3] - dadosdosdias.forecast[3].minTemp;
              let difTempDia4 = temperaturaMaximadois[4] - dadosdosdias.forecast[4].minTemp;
              let difTempDia5 = temperaturaMaximadois[5] - dadosdosdias.forecast[5].minTemp;
              let difTempDia6 = temperaturaMaximadois[6] - dadosdosdias.forecast[6].minTemp;
              let difTempDia7 = temperaturaMaximadois[7] - dadosdosdias.forecast[7].minTemp;
              let difTempDia8 = temperaturaMaximadois[8] - dadosdosdias.forecast[8].minTemp;
              let difTempDia9 = temperaturaMaximadois[9] - dadosdosdias.forecast[9].minTemp;
               
              let tamanhoLinhaTemp0 = (difTempDia0/difTemp)*110;
              let tamanhoLinhaTemp1 = (difTempDia1/difTemp)*110;
              let tamanhoLinhaTemp2 = (difTempDia2/difTemp)*110;
              let tamanhoLinhaTemp3 = (difTempDia3/difTemp)*110;
              let tamanhoLinhaTemp4 = (difTempDia4/difTemp)*110;
              let tamanhoLinhaTemp5 = (difTempDia5/difTemp)*110;
              let tamanhoLinhaTemp6 = (difTempDia6/difTemp)*110;
              let tamanhoLinhaTemp7 = (difTempDia7/difTemp)*110;
              let tamanhoLinhaTemp8 = (difTempDia8/difTemp)*110;
              let tamanhoLinhaTemp9 = (difTempDia9/difTemp)*110; 
              
              minTempDia0 = temperaturaMinimadois[0];
              minTempDia1 = temperaturaMinimadois[1];
              minTempDia2 = temperaturaMinimadois[2];
              minTempDia3 = temperaturaMinimadois[3];
              minTempDia4 = temperaturaMinimadois[4];
              minTempDia5 = temperaturaMinimadois[5];
              minTempDia6 = temperaturaMinimadois[6];
              minTempDia7 = temperaturaMinimadois[7];
              minTempDia8 = temperaturaMinimadois[8];
              minTempDia9 = temperaturaMinimadois[9];
  
              
            
                minTemp = Math.min(...temperaturaMinimadois); 
                let posicaoDoDia0 = ((minTempDia1-minTemp)/minTemp*100); 
                let posicaoDoDia1 = ((minTempDia1-minTemp)/minTemp*100); 
                let posicaoDoDia2 = ((minTempDia2-minTemp)/minTemp*100); 
                let posicaoDoDia3 = ((minTempDia3-minTemp)/minTemp*100); 
                let posicaoDoDia4 = ((minTempDia4-minTemp)/minTemp*100); 
                let posicaoDoDia5 = ((minTempDia5-minTemp)/minTemp*100); 
                let posicaoDoDia6 = ((minTempDia6-minTemp)/minTemp*100); 
                let posicaoDoDia7 = ((minTempDia7-minTemp)/minTemp*100); 
                let posicaoDoDia8 = ((minTempDia8-minTemp)/minTemp*100); 
                let posicaoDoDia9 = ((minTempDia9-minTemp)/minTemp*100); 
                
                let calc0 = (posicaoDoDia0);
                let calc1 = (posicaoDoDia1);
                let calc2 = (posicaoDoDia2);
                let calc3 = (posicaoDoDia3);
                let calc4 = (posicaoDoDia4);
                let calc5 = (posicaoDoDia5);
                let calc6 = (posicaoDoDia6);
                let calc7 = (posicaoDoDia7);
                let calc8 = (posicaoDoDia8);
                let calc9 = (posicaoDoDia9);
  
          const style = document.createElement('style');
          style.innerHTML = `
          .pontoTempAtual{
            position: absolute;
            display: flex;
            top: 0px;
            left:`+posicaoTempAtual+`%;
            height: 8.0px;
            width: 2%;
            border-radius: 10px;
            background-color: white;
            z-index: 1;
            transition: linear 2.4s;
          }
          #linhaTemp0{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc0+`%;
            width: `+tamanhoLinhaTemp0+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp1{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc1+`%;
            width: `+tamanhoLinhaTemp1+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp2{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc2+`%;
            width: `+tamanhoLinhaTemp2+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp3{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc3+`%;
            width: `+tamanhoLinhaTemp3+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp4{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc4+`%;
            width: `+tamanhoLinhaTemp4+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp5{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc5+`%;
            width: `+tamanhoLinhaTemp5+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp6{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc6+`%;
            width: `+tamanhoLinhaTemp6+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp7{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc7+`%;
            width: `+tamanhoLinhaTemp7+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp8{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc8+`%;
            width: `+tamanhoLinhaTemp8+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }
          #linhaTemp9{
            position: absolute;
            display: flex;
            justify-content: center;
            height: 10px;
            left:`+calc9+`%;
            width: `+tamanhoLinhaTemp9+`px;
            border: 1px solid ;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
          }`;
          
          document.head.appendChild(style);
  
  
          
          
          console.log(dadoscidadeatual)
          hora = 19;
          if (hora >= 5 && hora<=18){
            const style = document.createElement('style');
          style.innerHTML = `
          body{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh; 
            width: 100%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            transition: linear 3s;
            background-color: rgb(56, 135, 239);
          }
          #consultaCidade{
            border-radius: 20px;
            border: 0px;
            width: 150px;
            height: 30px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.292);
            transition: linear 1s;
          }
          .prevhoraria{
            position: sticky;
            display: flex;
            justify-content: left;
          
            width: 100%;
            left: 0%;
            padding-left: 22px;
            background-color: white;
            color: gray;
            z-index: 1;
            transition: linear 1s;
          }
          .prevdezdias{
            position: sticky;
            display: flex;
            justify-content: left;
            top:0%;
            padding-left: 22px;
            background-color: white;
            color: gray;
            z-index:1 ;
            transition: linear 1s;
          }
          .linhaMedia{
            position: relative;
            display: flex;
            justify-content: center;
            height: 10px;
            width: 110px;
            background-color: white;
            border-radius: 10px;
            transition: linear 3s;
          }
          .linhaTemp{
            position: relative;
            display: flex;
            justify-content: center;
            height: 10px;
            width: 100px;
            border: 1px solid gray;
            border-radius: 10px;
            background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
            transition: linear 3s;
          }
          `
          ;
          document.head.appendChild(style);
          }
          else{
            const style = document.createElement('style');
            style.innerHTML = `
            }body{
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              min-height: 100vh; 
              width: 100%;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              transition: linear 3s;
              background-color: rgb(11, 2, 45);
            }
            #consultaCidade{
              border-radius: 20px;
              border: 0px;
              width: 150px;
              height: 30px;
              box-shadow: 0 0 3px rgba(0, 0, 0, 0.292);
              background-color: white;
              transition: linear 1s;
            }
            .prevhoraria{
              position: sticky;
              display: flex;
              justify-content: left;
            
              width: 100%;
              left: 0%;
              padding-left: 22px;
              background-color: white;
              color: gray;
              z-index: 1;
              transition: linear 1s;
            }
            .prevdezdias{
              position: sticky;
              display: flex;
              justify-content: left;
              top:0%;
              padding-left: 22px;
              background-color: white;
              color: gray;
              z-index:1 ;
              transition: linear 1s;
            }
            .linhaMedia{
              position: relative;
              display: flex;
              justify-content: center;
              height: 10px;
              width: 110px;
              background-color: white;
              border-radius: 10px;
              transition: linear 3s;
            }
            .linhaTemp{
              position: relative;
              display: flex;
              justify-content: center;
              height: 10px;
              width: 100px;
              border: 1px solid gray;
              border-radius: 10px;
              background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
              transition: linear 3s;
            }
            `
            ;
            document.head.appendChild(style);
          }
        }
  
      
  
  
  }
  
      
  }
  }
          }
          

}