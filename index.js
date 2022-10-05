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

        fetch('https://foreca-weather.p.rapidapi.com/forecast/daily/'+id+'?alt=0&tempunit=C&periods=8&dataset=full', options)
        .then(response => response.json())
        .then(response => info(response))
        .catch(err => console.error(err));

        function info(dadosdosdias){
            console.log(dadosdosdias);
    
}
}

}
