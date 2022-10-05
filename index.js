document.getElementById("consultaCidade").onclick = function(){

	let cidade = document.getElementById("cidade").value;
    let estado = document.getElementById("estado").value;
    let pais = document.getElementById("pais").value;
	    
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
                label.innerHTML = `Situação atual do tempo: ${situacaoatual}`

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
                        min-height: 100vh;
                        width: min(90% 70.5em);
                      }
                      
                      .container{
                        display: flex;
                        position: absolute;
                        top:100px;
                        height: 300px;
                        width: 330px;
                        background: rgb(22, 142, 248);
                        filter: blur(3px);
                      }
                      
                      .container-2{
                        display: flex;
                        position: absolute;
                        top:100px;
                        height: 300px;
                        width: 330px;
                      }
                      
                      .nuvem{
                        display: flex;
                        position: absolute;
                        top:220px;
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
                
    
}
}

}
