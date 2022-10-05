document.getElementById("consultaCidade").onclick = function(){

	let cidade = document.getElementById("cidade").value;
	    
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
                
                let label = document.querySelector('#label');
                let situacaoatual = dadoscidade.current.symbolPhrase;
                label.innerHTML = 
                `Situação atual do tempo: ${situacaoatual}
                <br> 
                Temperatura atual: ${dadoscidade.current.temperature}ºC
                `

                if (situacaoatual = "encoberto"){
                    
                    var style = document.createElement('style');
                      style.innerHTML = 
                      `
                      *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                      }
                      
                      body{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 1hv;
                        width: auto;
                      }
                      
                      .divisaotopo{
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top:0px;
                        margin: 20px;
                        padding: 20px;
                        height: 130px;
                        width: 100%;
                      }
                      
                      .info{
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        left:0;
                        top:0;
                        margin: 5px;
                      }
                      
                      input{
                        margin: 5px;
                      }
                      
                      .divisaocentral{
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        top:130px;
                        margin: 20px;
                        padding: 20px;
                        height: 400px;
                        width: 100%;
                      }
                      
                      .container{
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top:0px;
                        height: 300px;
                        width: 330px;
                        margin: 20px;
                        background: rgb(57, 152, 241);
                        animation: raio linear infinite;
                        border-bottom: 1px solid green;
                        filter: blur(3px);
                      }
                      
                      .container-2{
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top:0px;
                        margin: 20px;
                        height: 300px;
                        width: 330px;
                      }
                      
                      .nuvem{
                        display: flex;
                        position: absolute;
                        top:120px;
                        width: 320px;
                        height: 100px;
                        background: #fff;
                        border-radius: 50px; 
                      }
                      
                      .nuvem::before {
                        display: flex;
                        position: absolute;
                        top: -50%;
                        left: 15%;
                        content: '';
                        width: 110px;
                        height: 110px;
                        background-color: #fff;
                        border-radius: 50%;
                        box-shadow: 90px 0 0 30px #fff;
                      }
                      
                      .sol{
                        display: flex;
                        position: absolute;
                        top: 10%;
                        left: 50px;
                        width: 100px;
                        height: 100px;
                        background: rgb(230, 212, 51);
                        border-radius: 100px;
                        box-shadow: 0 0 20px 0px rgb(230, 212, 51) ;
                        animation: ensolarado 3s infinite;
                        transition: ensolarado 3s ease;
                      }
                      
                      @keyframes ensolarado{
                        0%{
                          box-shadow: 0 0 10px 5px rgb(230, 212, 51) ;
                        }
                        50%{
                          box-shadow: 0 0 30px 20px rgb(230, 212, 51) ;
                        }
                        100%{
                          box-shadow: 0 0 10px 5px rgb(230, 212, 51) ;
                        }
                      }
                      
                      .lua{
                        display: none;
                      }
                      
                      .estrelas{
                        display: none;
                      }
                        `;
                        document.head.appendChild(style);

                }
                

        fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/'+id+'?alt=0&tempunit=C&periods=12&lang=pt&dataset=full', options)
        .then(response => response.json())
        .then(response => info(response))
        .catch(err => console.error(err));

        function info(dadosdosdias){
            console.log(dadosdosdias);
            console.log(dadoscidade);
            
            var data00 = new Date (dadosdosdias.forecast[0].date);
            var data0 = ((data00.getDate() )) + "/" + ((data00.getMonth() + 1))
  
            var data01 = new Date (dadosdosdias.forecast[1].date);
            var data1 = ((data01.getDate() )) + "/" + ((data01.getMonth() + 1))
  
            var data02 = new Date (dadosdosdias.forecast[2].date);          
            var data2 = ((data02.getDate() )) + "/" + ((data02.getMonth() + 1))

            var data03 = new Date (dadosdosdias.forecast[3].date);
            var data3 = ((data03.getDate() )) + "/" + ((data03.getMonth() + 1))
  
            var data04 = new Date (dadosdosdias.forecast[4].date);
            var data4 = ((data04.getDate() )) + "/" + ((data04.getMonth() + 1))
  
            var data05 = new Date (dadosdosdias.forecast[5].date);
            var data5 = ((data05.getDate() )) + "/" + ((data05.getMonth() + 1))
  
            var data06 = new Date (dadosdosdias.forecast[6].date);
            var data6 = ((data06.getDate() )) + "/" + ((data06.getMonth() + 1))
  
            var data07 = new Date (dadosdosdias.forecast[7].date);
            var data7 = ((data07.getDate() )) + "/" + ((data07.getMonth() + 1))
  
            var data08 = new Date (dadosdosdias.forecast[8].date);
            var data8 = ((data08.getDate() )) + "/" + ((data08.getMonth() + 1))
  
            var data09 = new Date (dadosdosdias.forecast[9].date);
            var data9 = ((data09.getDate() )) + "/" + ((data09.getMonth() + 1))
  
            var data10 = new Date (dadosdosdias.forecast[10].date);
            var data010 = ((data10.getDate() )) + "/" + ((data10.getMonth() + 1))
  
            var data11 = new Date (dadosdosdias.forecast[11].date);
            var data011 = ((data11.getDate() )) + "/" + ((data11.getMonth() + 1))

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

}
}

}
}