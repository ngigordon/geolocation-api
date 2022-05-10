let house = document.getElementById('container')
// getting country automatically using the persons ip adress
let http = new XMLHttpRequest()
http.onreadystatechange = function(){
    if(this.readyState == 4){
        let data =JSON.parse(this.responseText)
       var code = data.countryCode
       getCountryFullInfo(code)
    }
}
http.open('get','http://ip-api.com/json')
http.send()

// getting further information about the country using country code api from the info above
function getCountryFullInfo(a){
    let secondRequest = new XMLHttpRequest()
    secondRequest.onreadystatechange = function(){
        if(this.readyState == 4){
         let details = JSON.parse(this.responseText)
         console.log(details.capital)
        //  putting additional information of the user
        let htmlTemplate =
        `
        <p>welcome the name of your country is: <strong>${details.name}</strong></p>
        <p>the capital of your country is: <strong>${details.capital}</strong></p>
        <p>the population of your country is:<strong>${details.population}</strong></p>
        <p>your country is located at latitude:<strong>${details.latlng[0]}</strong></p>
        <p>your country is located at longitude:<strong>${details.latlng[1]}</strong></p>
        `
        //render everything to html DOM
        house.innerHTML = htmlTemplate
        }

    }
    secondRequest.open('get','https://restcountries.com/v2/alpha/' + a)
    secondRequest.send();
}