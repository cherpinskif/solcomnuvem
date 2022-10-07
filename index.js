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
        .catch(err => console.error(err));

        function info(dadosdosdias){
            console.log(dadosdosdias);
            console.log(dadoscidade);
            console.log(dados.locations[0]);

           
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
            
            
            var data00 = new Date (dadosdosdias.forecast[0].date);
            var data0 = ((data00.getDate() + 1 )) + "/" + ((data00.getMonth() + 1))
  
            var data01 = new Date (dadosdosdias.forecast[1].date);
            var data1 = ((data01.getDate() + 1 )) + "/" + ((data01.getMonth() + 1))
  
            var data02 = new Date (dadosdosdias.forecast[2].date);          
            var data2 = ((data02.getDate() + 1 )) + "/" + ((data02.getMonth() + 1))

            var data03 = new Date (dadosdosdias.forecast[3].date);
            var data3 = ((data03.getDate() + 1 )) + "/" + ((data03.getMonth() + 1))
  
            var data04 = new Date (dadosdosdias.forecast[4].date);
            var data4 = ((data04.getDate() + 1 )) + "/" + ((data04.getMonth() + 1))
  
            var data05 = new Date (dadosdosdias.forecast[5].date);
            var data5 = ((data05.getDate() + 1 )) + "/" + ((data05.getMonth() + 1))
  
            var data06 = new Date (dadosdosdias.forecast[6].date);
            var data6 = ((data06.getDate() + 1 )) + "/" + ((data06.getMonth() + 1))
  
            var data07 = new Date (dadosdosdias.forecast[7].date);
            var data7 = ((data07.getDate() + 1 )) + "/" + ((data07.getMonth() + 1))
  
            var data08 = new Date (dadosdosdias.forecast[8].date);
            var data8 = ((data08.getDate() + 1 )) + "/" + ((data08.getMonth() + 1))
  
            var data09 = new Date (dadosdosdias.forecast[9].date);
            var data9 = ((data09.getDate() + 1 )) + "/" + ((data09.getMonth() + 1))
  
            var data10 = new Date (dadosdosdias.forecast[10].date);
            var data010 = ((data10.getDate() + 1 )) + "/" + ((data10.getMonth() + 1))
  
            var data11 = new Date (dadosdosdias.forecast[11].date);
            var data011 = ((data11.getDate() + 1 )) + "/" + ((data11.getMonth() + 1))

            let proximosdias = document.querySelector('.proximosdias');
            proximosdias.innerHTML = 
            `Situação do tempo para os proximos dias:
            <br> 
            Dia: ${data0} - Situação: ${dadosdosdias.forecast[0].symbolPhrase} - Max: ${dadosdosdias.forecast[0].maxTemp}ºC - Min: ${dadosdosdias.forecast[0].minTemp}ºC
            <br> 
            Dia: ${data1} - Situação: ${dadosdosdias.forecast[1].symbolPhrase} - Max: ${dadosdosdias.forecast[1].maxTemp}ºC - Min: ${dadosdosdias.forecast[1].minTemp}ºC
            <br> 
            Dia: ${data2} - Situação: ${dadosdosdias.forecast[2].symbolPhrase} - Max: ${dadosdosdias.forecast[2].maxTemp}ºC - Min: ${dadosdosdias.forecast[2].minTemp}ºC
            <br> 
            Dia: ${data3} - Situação: ${dadosdosdias.forecast[3].symbolPhrase} - Max: ${dadosdosdias.forecast[3].maxTemp}ºC - Min: ${dadosdosdias.forecast[3].minTemp}ºC
            <br> 
            Dia: ${data4} - Situação: ${dadosdosdias.forecast[4].symbolPhrase} - Max: ${dadosdosdias.forecast[4].maxTemp}ºC - Min: ${dadosdosdias.forecast[4].minTemp}ºC
            <br> 
            Dia: ${data5} - Situação: ${dadosdosdias.forecast[5].symbolPhrase} - Max: ${dadosdosdias.forecast[5].maxTemp}ºC - Min: ${dadosdosdias.forecast[5].minTemp}ºC
            <br> 
            Dia: ${data6} - Situação: ${dadosdosdias.forecast[6].symbolPhrase} - Max: ${dadosdosdias.forecast[6].maxTemp}ºC - Min: ${dadosdosdias.forecast[6].minTemp}ºC
            <br> 
            Dia: ${data7} - Situação: ${dadosdosdias.forecast[7].symbolPhrase} - Max: ${dadosdosdias.forecast[7].maxTemp}ºC - Min: ${dadosdosdias.forecast[7].minTemp}ºC
            <br> 
            Dia: ${data8} - Situação: ${dadosdosdias.forecast[8].symbolPhrase} - Max: ${dadosdosdias.forecast[8].maxTemp}ºC - Min: ${dadosdosdias.forecast[8].minTemp}ºC
            <br> 
            Dia: ${data9} - Situação: ${dadosdosdias.forecast[9].symbolPhrase} - Max: ${dadosdosdias.forecast[9].maxTemp}ºC - Min: ${dadosdosdias.forecast[9].minTemp}ºC
            <br> 
            Dia: ${data010} - Situação: ${dadosdosdias.forecast[10].symbolPhrase} - Max: ${dadosdosdias.forecast[10].maxTemp}ºC - Min: ${dadosdosdias.forecast[10].minTemp}ºC
            <br> 
            Dia: ${data011} - Situação: ${dadosdosdias.forecast[11].symbolPhrase} - Max: ${dadosdosdias.forecast[11].maxTemp}ºC - Min: ${dadosdosdias.forecast[11].minTemp}ºC
            `



        fetch('https://foreca-weather.p.rapidapi.com/forecast/hourly/'+id+'?lang=pt&country=br&alt=0&periods=12&dataset=full&history=0', options)
        .then(response => response.json())
        .then(response => hourly(response))
        .catch(err => console.error(err));

        function hourly(porHora){
          console.log(porHora.forecast[0]);
          
          let hora = new Date(porHora.forecast[0].time).getHours();
          let hora1 = new Date(porHora.forecast[1].time).getHours();
          let hora2 = new Date(porHora.forecast[2].time).getHours();
          let hora3 = new Date(porHora.forecast[3].time).getHours();
          let hora4 = new Date(porHora.forecast[4].time).getHours();
          let hora5 = new Date(porHora.forecast[5].time).getHours();
          let hora6 = new Date(porHora.forecast[6].time).getHours();
          let hora7 = new Date(porHora.forecast[7].time).getHours();
          let hora8 = new Date(porHora.forecast[8].time).getHours();
          let hora9 = new Date(porHora.forecast[9].time).getHours();
          let hora10 = new Date(porHora.forecast[10].time).getHours();
          let hora11 = new Date(porHora.forecast[11].time).getHours(); 
          
          let horaTemperatura0 = document.querySelector('#horaTemperatura0');
          let horaTemperatura1 = document.querySelector('#horaTemperatura1');
          let horaTemperatura2 = document.querySelector('#horaTemperatura2');
          let horaTemperatura3 = document.querySelector('#horaTemperatura3');
          let horaTemperatura4 = document.querySelector('#horaTemperatura4');
          let horaTemperatura5 = document.querySelector('#horaTemperatura5');
          let horaTemperatura6 = document.querySelector('#horaTemperatura6');
          let horaTemperatura7 = document.querySelector('#horaTemperatura7');
          let horaTemperatura8 = document.querySelector('#horaTemperatura8');
          let horaTemperatura9 = document.querySelector('#horaTemperatura9');
          let horaTemperatura10 = document.querySelector('#horaTemperatura10');
          let horaTemperatura11 = document.querySelector('#horaTemperatura11'); 

          horaTemperatura0.innerHTML = `${hora}`
          horaTemperatura1.innerHTML = `${hora1}`
          horaTemperatura2.innerHTML = `${hora2}`
          horaTemperatura3.innerHTML = `${hora3}`
          horaTemperatura4.innerHTML = `${hora4}`
          horaTemperatura5.innerHTML = `${hora5}`
          horaTemperatura6.innerHTML = `${hora6}`
          horaTemperatura7.innerHTML = `${hora7}`
          horaTemperatura8.innerHTML = `${hora8}`
          horaTemperatura9.innerHTML = `${hora9}`
          horaTemperatura10.innerHTML = `${hora10}`
          horaTemperatura11.innerHTML = `${hora11}` 
          
          
          let icone0 = document.querySelector('#icone0');
          icone0.innerHTML = `${porHora.forecast[0].symbolPhrase}`
          let icone1 = document.querySelector('#icone1');
          icone1.innerHTML = `${porHora.forecast[1].symbolPhrase}`
          let icone2 = document.querySelector('#icone2');
          icone2.innerHTML = `${porHora.forecast[2].symbolPhrase}`
          let icone3 = document.querySelector('#icone3');
          icone3.innerHTML = `${porHora.forecast[3].symbolPhrase}`
           let icone4 = document.querySelector('#icone4');
          icone4.innerHTML = `${porHora.forecast[4].symbolPhrase}`
          let icone5 = document.querySelector('#icone5');
          icone5.innerHTML = `${porHora.forecast[5].symbolPhrase}`
          let icone6 = document.querySelector('#icone6');
          icone6.innerHTML = `${porHora.forecast[6].symbolPhrase}`
          let icone7 = document.querySelector('#icone7');
          icone7.innerHTML = `${porHora.forecast[7].symbolPhrase}`
          let icone8 = document.querySelector('#icone8');
          icone8.innerHTML = `${porHora.forecast[8].symbolPhrase}`
          let icone9 = document.querySelector('#icone9');
          icone9.innerHTML = `${porHora.forecast[9].symbolPhrase}`
          let icone10 = document.querySelector('#icone10');
          icone10.innerHTML = `${porHora.forecast[10].symbolPhrase}`
          let icone11 = document.querySelector('#icone11');
          icone11.innerHTML = `${porHora.forecast[11].symbolPhrase}` 
          

          let temperaturaHora0 = document.querySelector('#temperaturaHora0');
          temperaturaHora0.innerHTML = `${porHora.forecast[0].temperature}`
          let temperaturaHora1 = document.querySelector('#temperaturaHora1');
          temperaturaHora1.innerHTML = `${porHora.forecast[1].temperature}`
          let temperaturaHora2 = document.querySelector('#temperaturaHora2');
          temperaturaHora2.innerHTML = `${porHora.forecast[2].temperature}`
          let temperaturaHora3 = document.querySelector('#temperaturaHora3');
          temperaturaHora3.innerHTML = `${porHora.forecast[3].temperature}`
          let temperaturaHora4 = document.querySelector('#temperaturaHora4');
          temperaturaHora4.innerHTML = `${porHora.forecast[4].temperature}`
          let temperaturaHora5 = document.querySelector('#temperaturaHora5');
          temperaturaHora5.innerHTML = `${porHora.forecast[5].temperature}`
          let temperaturaHora6 = document.querySelector('#temperaturaHora6');
          temperaturaHora6.innerHTML = `${porHora.forecast[6].temperature}`
          let temperaturaHora7 = document.querySelector('#temperaturaHora7');
          temperaturaHora7.innerHTML = `${porHora.forecast[7].temperature}`
          let temperaturaHora8 = document.querySelector('#temperaturaHora8');
          temperaturaHora8.innerHTML = `${porHora.forecast[8].temperature}`
          let temperaturaHora9 = document.querySelector('#temperaturaHora9');
          temperaturaHora9.innerHTML = `${porHora.forecast[9].temperature}`
          let temperaturaHora10 = document.querySelector('#temperaturaHora10');
          temperaturaHora10.innerHTML = `${porHora.forecast[10].temperature}`
          let temperaturaHora11 = document.querySelector('#temperaturaHora11');
          temperaturaHora11.innerHTML = `${porHora.forecast[11].temperature}` 

        }
}
}

}
}
