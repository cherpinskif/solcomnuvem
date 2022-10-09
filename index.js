document.getElementById("consultaCidade").onclick = function(){

	let cidade = document.getElementById("inputCidade").value;
	    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a971acd304mshf02c547d61db721p1659b6jsn24258aa44cba',
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
        }
    };
    
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
           

           /* Encontrar Tamanho da linhaTemp para cada dia
              1- Calcular tempMax 10 dias - tempMin 10 dias = DifTemp
              2- DifTemp = 130px
              3- Calcular tempMax dia - tempMin dia = difTempDia
              4- difTempDia / difTemp * 130   
           */


          
           
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
        #linhaTemp{
          position: absolute;
          display: flex;
          justify-content: center;
          height: 10px;
          width: 100px;
          border: 1px solid ;
          border-radius: 10px;
          background-image: linear-gradient(to right, rgb(132, 210, 252),orange, red);
        }
         `;
        document.head.appendChild(style);
}
}

    
}
}
