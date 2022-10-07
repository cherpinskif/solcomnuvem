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

        fetch('https://foreca-weather.p.rapidapi.com/current/'+id+'?alt=0&tempunit=C&lang=pt', options)
            .then(response => response.json())
            .then(response => info(response))
            .catch(err => console.error(err));

            function info(dadoscidade){
                             
        fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/'+id+'?alt=0&tempunit=C&periods=12&lang=pt&dataset=full', options)
        .then(response => response.json())
        .then(response => info(response))
        .catch(err => console.error(err))

        function info(dadosdosdias){

            let prevagora = document.querySelector('#prevagora');
            let situacaoatual = dadoscidade.current.symbolPhrase;
            let nomeCidade = document.querySelector('#nomeCidade');
            let tempAtual = document.querySelector('#tempAtual');
            let maxTemp = document.querySelector('#maxTemp');
            let minTemp = document.querySelector('#minTemp');

            let letraMaiuscula = situacaoatual.charAt(0).toUpperCase()+situacaoatual.slice(1); 

            nomeCidade.innerHTML = `${dados.locations[0].name}`;
            tempAtual.innerHTML = `${dadoscidade.current.temperature}º`;
            prevagora.innerHTML = `${letraMaiuscula}`;
            maxTemp.innerHTML = `Máx.: ${dadosdosdias.forecast[0].maxTemp}º`;
            minTemp.innerHTML = `Mín.: ${dadosdosdias.forecast[0].minTemp}º`;



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
              porHora.forecast[i].symbol == imagens[j] ? icone.innerHTML = `<img style="width:40px; height:40px" src="https://developer.foreca.com/static/images/symbols/`+imagens[j]+`.png">` : "-";
            }

          }    
          
        }
}
}

}
    
}
