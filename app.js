const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

//mettre la 1ere lettre d'une string en majuscule
function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}

 async function main(withIP = true){
    //1-chopper l'IP du pc qui ouvre la page
    let ville;
    if (withIP) {
        const ip = await fetch("https://api.ipify.org?format=json")
                    .then(resultat => resultat.json())
                    .then(json => json.ip);

        ville = await fetch('https://ipfind.co/?auth=82d08641-c3d6-4d73-8b9b-c2023d6a7c39&ip='+ip)
                    .then(resultat => resultat.json())
                    .then(json =>  json.city);
         
    }else{
        ville = document.querySelector('#ville').textContent;
    }
               

    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=c21a75b667d6f7abb81f118dcf8d4611&lang=fr&units=metric`)
                    .then(resultat => resultat.json())
                    .then(json => json)
    //2-chopper la ville grace a l'IP: http://freegeoip.net/json/adresseIPDuMec
    //3-chopper les infos meteo grace a la ville:
    displayWeatherInfos(meteo);

}

function displayWeatherInfos(data) {
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.body.className = conditions.toLowerCase();
    document.querySelector("#ville").textContent = name;
    document.querySelector("#temperature").textContent = Math.round(temperature);
    document.querySelector("#conditions").textContent = capitalize(description);
    document.querySelector("i.wi").className = weatherIcons[conditions];
    
}

const ville = document.querySelector("#ville");
ville.addEventListener("click", () => {
    ville.contentEditable = true;
});

ville.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        ville.contentEditable = false;
        main(false); 
    }
})

main();
