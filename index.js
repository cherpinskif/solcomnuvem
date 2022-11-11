document.getElementById("consultaCidade").onclick = function (){

  if(document.querySelector("#inputCidade").value !== "") {
  
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

  let cidade = document.querySelector('#inputCidade').value;

    fetch('https://foreca-weather.p.rapidapi.com/location/search/'+cidade+'?lang=en&country=br', options)
      .then(dadoscidadeatual => dadoscidadeatual.json())
      .then(dadoscidadeatual => cidadeatual(dadoscidadeatual))
      .catch(err => console.error(err));

      function cidadeatual(dadoscidadeatual){      

        console.log(dadoscidadeatual)
        let id = dadoscidadeatual.locations[0].id;
        let nomeCidade = dadoscidadeatual.locations[0].name;
        document.querySelector('#nomeCidade').innerHTML = nomeCidade;
       
          fetch('https://foreca-weather.p.rapidapi.com/current/'+id+'?alt=0&lang=pt-br', options)
          .then(responseAtual => responseAtual.json())
          .then(responseAtual => situacaoAtual(responseAtual))
          .catch(err => console.error(err));

            function situacaoAtual(responseAtual){ 

              let tempAtual = responseAtual.current.temperature;
              document.querySelector('#tempAtual').innerHTML = tempAtual+"ºC";

              let sitAtual = responseAtual.current.symbolPhrase;
              let letraMaiuscula = sitAtual.charAt(0).toUpperCase()+sitAtual.slice(1);
              document.querySelector('#sitAtual').innerHTML = letraMaiuscula;

                fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/'+id+'?alt=0&periods=10 &dataset=full', options)
                .then(responseDia => responseDia.json())
                .then(responseDia => situacaoDia(responseDia))
                .catch(err => console.error(err));

                  function situacaoDia(responseDia){

                    let temperaturaMinima = responseDia.forecast[0].minTemp;
                    document.querySelector('#minTemp').innerHTML = 'Min.: '+temperaturaMinima+'ºC'
                    let temperaturaMaxima = responseDia.forecast[0].maxTemp;
                    document.querySelector('#maxTemp').innerHTML = 'Max.: '+temperaturaMaxima+'ºC'

      }      
      
    

    
         let imagens = ["d000","d100","d110","d200","d300","d400","d500","d600","d210","d310","d410","d220","d320","d420","d430","d240","d340","d440","d211","d311","d411","d221","d321","d421","d431","d212","d312","d412","d222","d322","d422","d432","n000","n100","n110","n200","n300","n400","n500","n600","n210","n310","n410","n220","n320","n420","n430","n240","n340","n440","n211","n311","n411","n221","n321","n421","n431","n212","n312","n412","n222","n322","n422","n432"]

          fetch('https://foreca-weather.p.rapidapi.com/forecast/hourly/'+id+'?alt=0&periods=12&dataset=full&history=0&lang=pt-br', options)
          .then(responseHora => responseHora.json())
          .then(responseHora => situacaoHora(responseHora))
          .catch(err => console.error(err));

          function situacaoHora(responseHora){
            
            for(i = 0; i <= 11; i++){
              let hora = new Date(responseHora.forecast[i].time).getHours()

              document.getElementById('horaTemperatura0').innerHTML = "Agora";
              document.getElementById('horaTemperatura'+i).innerHTML = hora;
              document.getElementById('icone'+i).innerHTML = responseHora.forecast[i].symbol; 
              for(let j = 0; j<=62; j++){
                responseHora.forecast[i].symbol == imagens[j] ? document.querySelector('#icone'+i).innerHTML = `<img style="width:30px; height:30px" src="https://developer.foreca.com/static/images/symbols/`+imagens[j]+`.png">` : "-";
              }
              document.getElementById('temperaturaHora'+i).innerHTML = responseHora.forecast[i].temperature;
            }
          

          fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/'+id+'?alt=0&periods=10&dataset=full&history=0&lang=pt-br', options)
          .then(responseDia => responseDia.json())
          .then(responseDia => temperaturaProximosDias(responseDia))
          .catch(err => console.error(err));

            function temperaturaProximosDias(responseDia){
              
              
              
              for(let i=0; i<=9;i++){
              let proximoDia = new Date(responseDia.forecast[i].date).getDate()+1;
              
              document.getElementById('diaDivRodape0').innerHTML = "Hoje";
              document.getElementById('diaDivRodape'+i).innerHTML = proximoDia;
              document.getElementById('divIcone'+i).innerHTML = responseDia.forecast[i].symbol;
              
              for(let j = 0; j<=62; j++){
                responseDia.forecast[i].symbol == imagens[j] ? document.querySelector('#divIcone'+i).innerHTML = `<img style="width:30px; height:30px" src="https://developer.foreca.com/static/images/symbols/`+imagens[j]+`.png">` : "-";
              }

              let temperaturaMinimaProximosDias = responseDia.forecast[i].minTemp;
              document.getElementById('temperaturaMinima'+i).innerHTML = temperaturaMinimaProximosDias;

              let temperaturaMaximaProximosDias = responseDia.forecast[i].maxTemp;
              document.getElementById('temperaturaMaxima'+i).innerHTML = temperaturaMaximaProximosDias;
              
            }
            
            let posicaoTempAtual = responseAtual.current.temperature/responseDia.forecast[0].maxTemp*100;

            const arrayTemperaturaMaxima = [];
            arrayTemperaturaMaxima[0] = responseDia.forecast[0].maxTemp;
            arrayTemperaturaMaxima[1] = responseDia.forecast[1].maxTemp;
            arrayTemperaturaMaxima[2] = responseDia.forecast[2].maxTemp;
            arrayTemperaturaMaxima[3] = responseDia.forecast[3].maxTemp;
            arrayTemperaturaMaxima[4] = responseDia.forecast[4].maxTemp;
            arrayTemperaturaMaxima[5] = responseDia.forecast[5].maxTemp;
            arrayTemperaturaMaxima[6] = responseDia.forecast[6].maxTemp;
            arrayTemperaturaMaxima[7] = responseDia.forecast[7].maxTemp;
            arrayTemperaturaMaxima[8] = responseDia.forecast[8].maxTemp;
            arrayTemperaturaMaxima[9] = responseDia.forecast[9].maxTemp; 

            const arrayTemperaturaMinima = [];
            arrayTemperaturaMinima[0] = responseDia.forecast[0].minTemp;             
            arrayTemperaturaMinima[1] = responseDia.forecast[1].minTemp;
            arrayTemperaturaMinima[2] = responseDia.forecast[2].minTemp;
            arrayTemperaturaMinima[3] = responseDia.forecast[3].minTemp;
            arrayTemperaturaMinima[4] = responseDia.forecast[4].minTemp;
            arrayTemperaturaMinima[5] = responseDia.forecast[5].minTemp;
            arrayTemperaturaMinima[6] = responseDia.forecast[6].minTemp;
            arrayTemperaturaMinima[7] = responseDia.forecast[7].minTemp;
            arrayTemperaturaMinima[8] = responseDia.forecast[8].minTemp;
            arrayTemperaturaMinima[9] = responseDia.forecast[9].minTemp; 
              
            let difTemp = Math.max(...arrayTemperaturaMaxima) - Math.min(...arrayTemperaturaMinima);

            let difTempDia0 = arrayTemperaturaMaxima[0] - arrayTemperaturaMinima[0];
            let difTempDia1 = arrayTemperaturaMaxima[1] - arrayTemperaturaMinima[1];
            let difTempDia2 = arrayTemperaturaMaxima[2] - arrayTemperaturaMinima[2];
            let difTempDia3 = arrayTemperaturaMaxima[3] - arrayTemperaturaMinima[3];
            let difTempDia4 = arrayTemperaturaMaxima[4] - arrayTemperaturaMinima[4];
            let difTempDia5 = arrayTemperaturaMaxima[5] - arrayTemperaturaMinima[5];
            let difTempDia6 = arrayTemperaturaMaxima[6] - arrayTemperaturaMinima[6];
            let difTempDia7 = arrayTemperaturaMaxima[7] - arrayTemperaturaMinima[7];
            let difTempDia8 = arrayTemperaturaMaxima[8] - arrayTemperaturaMinima[8];
            let difTempDia9 = arrayTemperaturaMaxima[9] - arrayTemperaturaMinima[9];

            
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

            minTempDia0 = arrayTemperaturaMinima[0];
            minTempDia1 = arrayTemperaturaMinima[1];
            minTempDia2 = arrayTemperaturaMinima[2];
            minTempDia3 = arrayTemperaturaMinima[3];
            minTempDia4 = arrayTemperaturaMinima[4];
            minTempDia5 = arrayTemperaturaMinima[5];
            minTempDia6 = arrayTemperaturaMinima[6];
            minTempDia7 = arrayTemperaturaMinima[7];
            minTempDia8 = arrayTemperaturaMinima[8];
            minTempDia9 = arrayTemperaturaMinima[9];

            maxTempDia0 = arrayTemperaturaMaxima[0]
            maxTempDia1 = arrayTemperaturaMaxima[1]
            maxTempDia2 = arrayTemperaturaMaxima[2]
            maxTempDia3 = arrayTemperaturaMaxima[3]
            maxTempDia4 = arrayTemperaturaMaxima[4]
            maxTempDia5 = arrayTemperaturaMaxima[5]
            maxTempDia6 = arrayTemperaturaMaxima[6]
            maxTempDia7 = arrayTemperaturaMaxima[7]
            maxTempDia8 = arrayTemperaturaMaxima[8]
            maxTempDia9 = arrayTemperaturaMaxima[9]
                     
            minTemp = Math.min(...arrayTemperaturaMinima);            
            maxTemp = Math.max(...arrayTemperaturaMaxima);

           
            let posicaoLeftDoDia0 = ((maxTemp - maxTempDia0)*difTemp/110); 
            let posicaoLeftDoDia1 = ((maxTemp - maxTempDia1)*difTemp/110); 
            let posicaoLeftDoDia2 = ((maxTemp - maxTempDia2)*difTemp/110); 
            let posicaoLeftDoDia3 = ((maxTemp - maxTempDia3)*difTemp/110); 
            let posicaoLeftDoDia4 = ((maxTemp - maxTempDia4)*difTemp/110); 
            let posicaoLeftDoDia5 = ((maxTemp - maxTempDia5)*difTemp/110); 
            let posicaoLeftDoDia6 = ((maxTemp - maxTempDia6)*difTemp/110); 
            let posicaoLeftDoDia7 = ((maxTemp - maxTempDia7)*difTemp/110); 
            let posicaoLeftDoDia8 = ((maxTemp - maxTempDia8)*difTemp/110); 
            let posicaoLeftDoDia9 = ((maxTemp - maxTempDia9)*difTemp/110); 
              
            let calcLeft0 = (posicaoLeftDoDia0);
            let calcLeft1 = (posicaoLeftDoDia1);
            let calcLeft2 = (posicaoLeftDoDia2);
            let calcLeft3 = (posicaoLeftDoDia3);
            let calcLeft4 = (posicaoLeftDoDia4);
            let calcLeft5 = (posicaoLeftDoDia5);
            let calcLeft6 = (posicaoLeftDoDia6);
            let calcLeft7 = (posicaoLeftDoDia7);
            let calcLeft8 = (posicaoLeftDoDia8);
            let calcLeft9 = (posicaoLeftDoDia9);
            
            let posicaoRightDoDia0 = ((minTempDia0 - minTemp)*difTemp/110); 
            let posicaoRightDoDia1 = ((minTempDia1 - minTemp)*difTemp/110); 
            let posicaoRightDoDia2 = ((minTempDia2 - minTemp)*difTemp/110); 
            let posicaoRightDoDia3 = ((minTempDia3 - minTemp)*difTemp/110); 
            let posicaoRightDoDia4 = ((minTempDia4 - minTemp)*difTemp/110); 
            let posicaoRightDoDia5 = ((minTempDia5 - minTemp)*difTemp/110); 
            let posicaoRightDoDia6 = ((minTempDia6 - minTemp)*difTemp/110); 
            let posicaoRightDoDia7 = ((minTempDia7 - minTemp)*difTemp/110); 
            let posicaoRightDoDia8 = ((minTempDia8 - minTemp)*difTemp/110); 
            let posicaoRightDoDia9 = ((minTempDia9 - minTemp)*difTemp/110); 

           
            let calcRight0 = (posicaoRightDoDia0);
            let calcRight1 = (posicaoRightDoDia1);
            let calcRight2 = (posicaoRightDoDia2);
            let calcRight3 = (posicaoRightDoDia3);
            let calcRight4 = (posicaoRightDoDia4);
            let calcRight5 = (posicaoRightDoDia5);
            let calcRight6 = (posicaoRightDoDia6);
            let calcRight7 = (posicaoRightDoDia7);
            let calcRight8 = (posicaoRightDoDia8);
            let calcRight9 = (posicaoRightDoDia9);

            const style = document.createElement('style');
            style.innerHTML = `
            .pontoTempAtual{
              position: absolute;
              display: flex;
              top: 0px;
              left:`+posicaoTempAtual+`px;
              height: 8.0px;
              width: 2%;
              border-radius: 10px;
              background-color: white;
              z-index: 1;
              transition: linear 2.4s;
             }
              #linhaTemp0,
              #linhaTemp1,
              #linhaTemp2,
              #linhaTemp3,
              #linhaTemp4,
              #linhaTemp5,
              #linhaTemp6,
              #linhaTemp7,
              #linhaTemp8,
              #linhaTemp9{
                position: absolute;
                display: flex;
                justify-content: center;
                height: 10px;
                border: 1px solid ;
                border-radius: 10px;
                background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
              }
              #linhaTemp0{
                left:`+calcLeft0+`;
                right:`+calcRight0+`;
                width: `+tamanhoLinhaTemp0+`px;
              }
              #linhaTemp1{
                left:`+calcLeft1+`px;
                right:`+calcRight1+`px;
                width: `+tamanhoLinhaTemp1+`px;
              }
              #linhaTemp2{
                left:`+calcLeft2+`px;
                right:`+calcRight2+`px;
                width: `+tamanhoLinhaTemp2+`px;
              }
              #linhaTemp3{
                left:`+calcLeft3+`px;
                right:`+calcRight3+`px;
                width: `+tamanhoLinhaTemp3+`px;
              }
              #linhaTemp4{
                left:`+calcLeft4+`px;
                right:`+calcRight4+`px;
                width: `+tamanhoLinhaTemp4+`px;
              }
              #linhaTemp5{
                left:`+calcLeft5+`px;
                right:`+calcRight5+`px;
                width: `+tamanhoLinhaTemp5+`px;
              }
              #linhaTemp6{
                left:`+calcLeft6+`px;
                right:`+calcRight6+`px;
                width: `+tamanhoLinhaTemp6+`px;
              }
              #linhaTemp7{
                left:`+calcLeft7+`px;
                right:`+calcRight7+`px;
                width: `+tamanhoLinhaTemp7+`px;
              }
              #linhaTemp8{
                left:`+calcLeft8+`px;
                right:`+calcRight8+`px;
                width: `+tamanhoLinhaTemp8+`px;
              }
              #linhaTemp9{
                left:`+calcLeft9+`px;
                right:`+calcRight9+`px;
                width: `+tamanhoLinhaTemp9+`px;
              }`;
            
            document.head.appendChild(style); 
            
            
            }


          }   
        

        }
      }
    
    
    
    }


   
