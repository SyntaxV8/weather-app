let cityName;
let dates;
let currentTemp;
let currentDesc;
let avgTempDate2;
let avgTempDate3;
let avgTempDate4;
let avgTempDate5;
let entries;
let date2;
let date3;
let date4;
let date5;

calcTemperatures = () => {

    entries = Object.entries(dates)

    let current = entries[0][1][0]
    currentTemp = Math.floor(current.main.temp - 273.15)
    currentDesc = current.weather[0].description

    date2 = entries[1][1]
    date3 = entries[2][1]
    date4 = entries[3][1]
    date5 = entries[4][1]


    avgTempDate2 = 0;
    for (let i = 0; i < date2.length; i++) {
        avgTempDate2 += date2[i].main.temp;
    }
    avgTempDate2 = Math.floor((avgTempDate2 / date2.length) - 273.15)

    avgTempDate3 = 0;
    for (let i = 0; i < date3.length; i++) {
        avgTempDate3 += date3[i].main.temp;
    }
    avgTempDate3 = Math.floor((avgTempDate3 / date3.length) - 273.15)

    avgTempDate4 = 0;
    for (let i = 0; i < date4.length; i++) {
        avgTempDate4 += date4[i].main.temp;
    }
    avgTempDate4 = Math.floor((avgTempDate4 / date4.length) - 273.15)

    avgTempDate5 = 0;
    for (let i = 0; i < date5.length; i++) {
        avgTempDate5 += date5[i].main.temp;
    }
    avgTempDate5 = Math.floor((avgTempDate5 / date5.length) - 273.15)
}


styling = () => {

    document.getElementById('weatherCards').classList.remove('noDisplay')
    document.getElementById('cityName').classList.remove('noDisplay')
    document.getElementById('instructions').classList.add('noDisplay')
    document.getElementById('cityName').innerHTML = cityName
    document.getElementById('name3').innerHTML = entries[2][0]
    document.getElementById('name4').innerHTML = entries[3][0]
    document.getElementById('name5').innerHTML = entries[4][0]
    document.getElementById('currentTemp').innerHTML = currentTemp + '°C.'
    document.getElementById('currentDesc').innerHTML = currentDesc
    document.getElementById('avgTemp1').innerHTML = avgTempDate2 + '°C.'
    document.getElementById('avgTemp2').innerHTML = avgTempDate3 + '°C.'
    document.getElementById('avgTemp3').innerHTML = avgTempDate4 + '°C.'
    document.getElementById('avgTemp4').innerHTML = avgTempDate5 + '°C.'
    document.getElementById('desc2').innerHTML = date2[3].weather[0].description
    document.getElementById('desc3').innerHTML = date3[3].weather[0].description
    document.getElementById('desc4').innerHTML = date4[3].weather[0].description
    document.getElementById('desc5').innerHTML = date5[3].weather[0].description
}


weather = () => {

    document.getElementById("run").addEventListener("click", function () {

        let cityInput = document.getElementById('form1').value

        fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=a33b814fb5f71647a19972bf2ab409d1`)
            .then(response => {return response.json()})
            .then(data => {

                cityName = data.city.name;
                let arrayDataLength = data.list.length

                dates = []

                for (let i = 0; i < arrayDataLength; i++){
                    let dateMil = data.list[i].dt
                    let newDate = new Date(dateMil*1000);
                    let day = newDate.getUTCDate();
                    let month = newDate.getMonth() + 1;
                    let date = day +'/'+ month;

                    if (!(date in dates)) {dates[date]= [];}

                    dates[date].push(data.list[i]);

                }
            })
            .then(calcTemperatures)
            .then(styling)
    })
}

weather()
