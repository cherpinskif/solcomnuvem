document.getElementById("consultaCidade").onclick = function (){

  document.querySelector("#inputCidade").value !== "" ? buscaPrevisaoDoTempo() : alert("Informe a cidade");


}



function buscaPrevisaoDoTempo() {


const options = {
  method: 'GET',
  headers: {
      'X-RapidAPI-Key': 'a971acd304mshf02c547d61db721p1659b6jsn24258aa44cba',
      'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
  }
};

  var cidade = document.querySelector('#inputCidade').value;

    fetch('https://foreca-weather.p.rapidapi.com/location/search/'+cidade+'?lang=en&lang=pt-br', options)
      .then(dadoscidadeatual => dadoscidadeatual.json())
      .then(dadoscidadeatual => cidadeatual(dadoscidadeatual))
      .catch(err => console.error(err));

      function cidadeatual(dadoscidadeatual){      

        console.log(dadoscidadeatual)
        var id = dadoscidadeatual.locations[0].id;
        var nomeCidade = dadoscidadeatual.locations[0].name;
        document.querySelector('#nomeCidade').innerHTML = nomeCidade;
       
          fetch('https://foreca-weather.p.rapidapi.com/current/'+id+'?alt=0&lang=pt-br', options)
          .then(responseAtual => responseAtual.json())
          .then(responseAtual => situacaoAtual(responseAtual))
          .catch(err => console.error(err));

            function situacaoAtual(responseAtual){ 

              console.log(responseAtual);
              let tempAtual = responseAtual.current.temperature;
              document.querySelector('#tempAtual').innerHTML = tempAtual+"ºC";

              let sitAtual = responseAtual.current.symbolPhrase;
              let letraMaiuscula = sitAtual.charAt(0).toUpperCase()+sitAtual.slice(1);
              document.querySelector('#sitAtual').innerHTML = letraMaiuscula;

                fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/'+id+'?alt=0&periods=10&dataset=full', options)
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
              
              let horaatual = new Date().getHours();
             
              const styleBackgroundNoite = "rgb(19, 4, 73)";
              const styleBackgroundDia = "rgb(135, 206, 235)";

              var DiaNoite = horaatual > responseDia.forecast[0].sunrise.slice(0,2) && horaatual < responseDia.forecast[0].sunset.slice(0,2) ? styleBackgroundDia : styleBackgroundNoite;  
              
              var horaEmMinuto = (new Date().getHours()*60);
              var minutoEmSegundo = (horaEmMinuto + (new Date().getMinutes()))*60;
              var HoraAtualEmSegundos = minutoEmSegundo + (new Date().getSeconds());
                            
              var horarioPorDoSol = (((+responseDia.forecast[0].sunset.slice(0,2)*60)+(+responseDia.forecast[0].sunset.slice(3,5)))*60+(+responseDia.forecast[0].sunset.slice(6,8)));
              
              var horarioNascerdoSol = ((+responseDia.forecast[0].sunrise.slice(0,2)*60)+(+responseDia.forecast[0].sunrise.slice(3,5)))*60+(+responseDia.forecast[0].sunrise.slice(6,8));
              
              var horarioSol = horarioPorDoSol - horarioNascerdoSol;
              var umgrau = horarioSol / 180;
              var descobrirGrau = ((horarioNascerdoSol - HoraAtualEmSegundos)/umgrau);
              
              let a = Math.sin(descobrirGrau*0.017453)*48;
              let b = -Math.cos(descobrirGrau*0.017453)*48;
              
              document.querySelector('.horarioNascerDoSol').innerHTML = `Nascer do Sol: ${responseDia.forecast[0].sunrise}`;

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

            var indiceUV = responseAtual.current.uvIndex; 
            document.querySelector('.valorIndiceUV').innerHTML = indiceUV;

            indiceUV >= 0 && indiceUV <=2 ? document.querySelector('.classificacaoIndiceUV').innerHTML = 'Baixo' :
            indiceUV >= 3 && indiceUV <=5 ? document.querySelector('.classificacaoIndiceUV').innerHTML = 'Moderado' :
            indiceUV >= 6 && indiceUV <=7 ? document.querySelector('.classificacaoIndiceUV').innerHTML = 'Alto' :
            indiceUV >= 8 && indiceUV <=10 ? document.querySelector('.classificacaoIndiceUV').innerHTML = 'Muito Alto' :
            indiceUV >= 11 ? document.querySelector('.classificacaoIndiceUV').innerHTML = 'Extremo' : document.querySelector('.classificacaoIndiceUV').innerHTML = ""
            
            indiceUV >= 0 && indiceUV <=2 ? document.querySelector('.recomendacaoIndiceUV').innerHTML = 'Use de proteção solar' :
            indiceUV >= 3 && indiceUV <=5 ? document.querySelector('.recomendacaoIndiceUV').innerHTML = 'Utilize óculos de Sol e camisa UV' :
            indiceUV >= 6 && indiceUV <=7 ? document.querySelector('.recomendacaoIndiceUV').innerHTML = 'Utilize óculos de Sol e camisa UV de manga longa.' :
            indiceUV >= 8 && indiceUV <=10 ? document.querySelector('.recomendacaoIndiceUV').innerHTML = 'Não é recomendada a exposição ao Sol por mais de 15 minutos' :
            indiceUV >= 11 ? document.querySelector('.recomendacaoIndiceUV').innerHTML = 'Evite o Sol principalmente perto do meio dia' : document.querySelector('.recomendacaoIndiceUV').innerHTML = ""

            var posicaoPontoIndiceUV =  indiceUV*5.65625;

            var deg = responseAtual.current.windDir
            var velocidadeVento = responseAtual.current.windSpeed
            document.querySelector('.velocidadeVento').innerHTML = `${velocidadeVento*3.6+`km/h`}`;

            const style = document.createElement('style');
            style.innerHTML = `
            body{
              background-color: `+DiaNoite+`;
            }
            .divCabecalho{
              background-color: `+DiaNoite+`;
            }
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
              }
              .setaBussola{
                transform:rotateZ(`+deg+`deg) scale(1.8);
              }
              .linhaIndiceUV{
                position: relative;
                display: flex;
                height: 10px;
                width: 100px;
                border: 1px solid ;
                border-radius: 10px;
                background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
                transition: linear 5s;
              }
              .pontoIndiceUVAtual{
                position: relative;
                display: flex;
                top: 0%;
                left:`+posicaoPontoIndiceUV+`px;
                height: 8.5px;
                width: 8.5px;
                border-radius: 8.5px;
                background-color: white; 
                transition: linear 5s;
              }
              body{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                min-height: 100vh; 
                width: 100%;
                font-family: 'Roboto', sans-serif;
                transition: linear 5s;
                background-color: rgb(135, 206, 235);
                color: white;
              }
              
              *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              
              /*------------------------------------------------*/
              /*------------------------------------------------*/
              
              /*------------Area - divCabecalho---------*/
              .divCabecalho{
                position: sticky;
                top:0;
                display: flex;
                width: 100%;
                justify-content: start;
                align-items: center;
                flex-direction: column;
                background-color: rgb(135, 206, 235);
                z-index: 10;
              }
              
              .infoInputDivCabecalho{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                width: 100%;
                margin-bottom: 15px;
              }
              
              .infoLabelDivCabecalho{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                width: 100%;
                height: 100px;
              }
              
              /*-----------Elementos - divCabecalho---------*/
              
              .elementoDivCabecalho{
                position: relative;
                font-family:'Segoe UI';
                text-align: center;
              }
              
              h1{
                font-size: 18px;
              }
              
              #inputCidade{
                border-radius: 20px;
                border-width: 0px;
                font-family:'Segoe UI';
                width: 250px;
                height: 40px;
                margin-bottom: 7px;
              
              }
              
              #consultaCidade{
                border-radius: 20px;
                border: 0px;
                width: 150px;
                height: 30px;
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.292);
              }
              
              #nomeCidade{
                position: relative;
                font-size: 25px;
                margin-top: -15px;
              }
              
              #tempAtual{
                font-size: 32px;
              }
              
              .labelDivCabecalho{
                margin: 0px;
              }
              
              #consultaCidade:hover{
                background: gray;
              }
              
              /*-----------------------------------------------*/
              /*-----------------------------------------------*/
              
              /*------------Area - divCentral---------*/
              .divCentral{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                top:10px;
                margin: 0px;
                padding: 10px;
                height: 23%;
                width: 100%;
              }
              
              .containerDivCentral{
                position: relative;
                height: 180px;
                width: 330px;
                display: flex;
                flex-direction: column;
              }
              
              .prevhoraria{
                position: sticky;
                top: 215px;
                display: flex;
                justify-content: left;
                padding-left: 22px;
                background-color: grey;
                color: rgb(162, 161, 161);
                z-index: 1;
                border-radius: 15px 15px 0 0;
              }
              
              .containerScrollLateral{
                position: absolute;
                display: flex;
                flex-direction:row;
                
                overflow-x: scroll;
                background: rgba(64, 64, 64, 0.232);
                text-align: center;
              
                height: 100%;
                width: 100%;
                border: 0px solid black;
                border-radius: 15px; 
              }
              
              
              /*-----------Elementos - divCabecalho---------*/
              
              .scrollTemperatura,
              .scrollIcone,
              .scrollHora
              {
                display: grid;
                grid-auto-flow: column;
                place-content: center;
                width: 90px;
                padding: 3px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 20px;
                height: 100%;
              }
              
              .scrollLateralDivCentral{
                position: relative;
                display: flex;
                flex-direction: column;
                font-size: 20px;
                transition: linear 5s;
              }
              
              /*-----------------------------------------------*/
              /*-----------------------------------------------*/
              
              /*------------Area - divRodape---------*/
              .divRodape{
                position: relative;
                display: flex;
                justify-content: start;
                align-items: center;
                flex-direction: column;
                top:65%;
                margin: 20px 0 20px 0;
                width: 330px;
                transition: linear 5s;
              }
              
              .containerDivRodape{
                display: flex;
                flex-direction: column;
                background: rgba(64, 64, 64, 0.232);
                text-align: center;
                width: 100%;
                border-radius: 15px;
                transition: linear 5s;
              }
              
              .scrollVerticalDivCentral{
                position: relative;
                display: flex;
                justify-content: center;
                align-items:center;
                flex-direction: row;
                font-size: 20px;
                height: 40px;
                padding-top: 10px;
                padding-bottom: 10px;
                padding-left: 19px;
                padding-right: 12px;
                transition: linear 5s;
              }
              
              .scrollDiaSemana,
              .scrollNuvem{
                display: flex;
                justify-content: center;
                width: 15%;
              }
              
              .scrollTempMin,
              .scrollTempMax{
                display: flex;
                justify-content: center;
                width: 25%;
                padding-right: 5px;
                padding-left: 5px;
                transition: linear 5s;
              }
              
              .range{
                background: firebrick; 
              }
              
              .linhatemperatura{
                position: relative;
                display: flex;
                justify-content: start;
                align-items: center;
                flex-direction: column;
                top:105%;
                padding: 10px;
                height: 5px;
                width: 100%;
                z-index: -1;
                transition: linear 5s;
              }
              
              .linhaMedia{
                position: relative;
                display: flex;
                justify-content: center;
                height: 10px;
                width: 110px;
                background-color: grey;
                border-radius: 10px;
                transition: linear 5s;
              }
              
              /* .linhaTemp{
                position: relative;
                display: flex;
                justify-content: center;
                height: 10px;
                width: 100px;
                border: 1px solid ;
                border-radius: 10px;
                background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
                transition: linear 5s;
              } */
              
              .pontoTempAtual{
                position: relative;
                display: flex;
                top: 0%;
                left: 49%;
                height: 8.5px;
                width: 2%;
                border-radius: 10px;
                background-color: white; 
                transition: linear 5s;
              }
              
              .prevdezdias{
                position: sticky;
                top: 215px;
                display: flex;
                justify-content: left;
                padding-left: 22px;
                background-color: grey;
                border-radius: 15px 15px 0 0;
                color: rgb(162, 161, 161);
                z-index:1 ;
                transition: linear 5s;
              }
              
              .fa-calendar,
              .fa-clock{
                top:50%;
                margin-top: 3px;
                margin-right: 3px;
                transition: linear 5s;
              }
              
              .divisoriaTotal{
                position: relative;
                display: flex;
                justify-content: center;
                height: 10px;
                width: 100%;
                background-color: rgba(255, 255, 255, 0);
                border-radius: 10px;
                transition: linear 5s;
              }
              
              .divisoria{
                position: relative;
                display: flex;
                justify-content: center;
                height: 2.1px;
                width: 88%;
                border-radius: 10px;
                background-color: rgba(255, 255, 255, 0.427);
                transition: linear 5s;
              }
              
              
              /*----Outros Itens------*/
              .outrosItens{
                position: relative;
                flex-direction: row;
                justify-content: center;
                display: flex;
                margin: 5px;
                height: 750px;
                width: 100%;
              }
              
              .colunaUm,
              .colunaDois{
                position: relative;  
                flex-direction: column;
                display: flex;
                height: 100%;
                width: 90%;
                border: 1px solid white;
              }
              
              .indiceUV,
              .porDoSol,
              .vento,
              .precipitacaoChuva,
              .sensacaoTermica,
              .umidade,
              .visibilidade,
              .pressao{
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 170px;
                width: 160px;
                margin: 35px 10px 0px 5px ;
                border: 1px solid white;
                border-radius: 15px;
                background: rgba(64, 64, 64, 0.232);
                overflow-y: scroll;
              }
              
              .tituloBox{
                position: sticky;
                top:0px;
                height: 18px;
                width: 100%;
                display: flex;
                justify-content: left;
                padding-left: 22px;
                background-color: grey;
                color: rgb(162, 161, 161);
                border-radius: 15px 15px 0 0;
                z-index: 1;
              }
              
              .conteudoBox{
                position: absolute;
                height: 100%;
                width: 100%;
                border: 1px solid black;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 0 0 15px 15px;
              }
              
              .valorIndiceUV,
              .classificacaoIndiceUV,
              .nivelIndiceUV,
              .recomendacaoIndiceUV{
                margin: 5px;
              }
              
              .recomendacaoIndiceUV{
                font-size: 13px;
                display: flex;
                justify-content: center;
                align-content: center;
              }
              
              .linhaMediaIndiceUV{
                position: relative;
                display: flex;
                justify-content: center;
                height: 10px;
                width: 100px;
                border: 1px solid ;
                background-color: grey;
                border-radius: 10px;
                transition: linear 5s;
              }
              
              /* .linhaIndiceUV{
                position: absolute;
                display: flex;
                height: 10px;
                width: 100px;
                border: 1px solid ;
                border-radius: 10px;
                background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
                transition: linear 5s;
              } */
              
              .pontoIndiceUVAtual{
                position: absolute;
                display: flex;
                top: 0%;
                left: 49%;
                height: 8.5px;
                width: 8.5px;
                border-radius: 8.5px;
                border: 1px solid black;
                background-color: white; 
                transition: linear 5s;
              }
              
              .circuloVento{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                height: 100px;
                width: 100px;
                border-radius: 100px;
                border:5px dashed rgba(0, 0, 0, 0.521);
              }
              
              #direcaoBussola{
                background: rgba(64, 64, 64);
                margin: -3px;
                font-size: 20px;
              }
              
              .bussolaVentoX{
                position: absolute;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: 100px;
                width: 100px;
              
              }
              
              .bussolaVentoY{
                position: absolute;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                height: 100px;
                width: 100px;
              }
              
              .velocidadeVento{
                position: relative;
                margin: 4px;
              }

              .pontoAtualdoSol{
                position: absolute;
                display: flex;
                height: 8px;
                width: 8px;
                border-radius: 8px; 
                background-color: white;
                box-shadow: 0 0 3px 1px yellow;
                transform: translate(`+b+`px, `+a+`px);
                transition: linear 1s;
              }

              .linhaAtualdoSol{
                position: absolute;
                display: flex;
                top: 82px;
                height: 85px;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.189); 
              }`
              ;
            
            document.head.appendChild(style); 
            
            
            }

   
          }   
        

        }
      }
    
      
    
    }


   
