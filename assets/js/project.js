//Tüm Elementleri Seçme
let long;
let lat;
let temperatureDescription = document.querySelector(".weather-description");
let temperatureDegree = document.querySelector(".temp");
let locationtimezone = document.querySelector(".weather-location");
let weatherType = document.querySelector(".weatherType");
let tempSection = document.querySelector(".tempBase");
const tempSectionSpan = document.querySelector(".tempBase span");
let windDeg = document.querySelector(".windDeg span");
let windSpeed = document.querySelector(".windSpeed span");
let nowYouAre = document.querySelector(".nowYouAre");
let nowYouAreSpan = document.querySelector(".coords");
//Skycon Api Objemi Başlatıyorum
const icons = new Skycons({
    color: "white"
});

//Jquery kullanarak apimizi çalıştırıyoruz
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long + '';

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                temperatureDegree.textContent = data.main.temp;
                locationtimezone.textContent = data.name;
                weatherType.id = data.weather[0].main;
                windDeg.textContent = data.wind.deg;
                windSpeed.textContent = data.wind.speed;
                nowYouAre.textContent = "Ülke: " + data.sys.country;
                nowYouAreSpan.textContent = "Koordinatların = Boylam: " + Math.round((long + Number.EPSILON) * 100) / 100 + " Enlem: " + Math.round((lat + Number.EPSILON) * 100) / 100;
                let fah = (data.main.temp * 1.8) + 32;
                //Fahrenheit Ve Celcius Arasındaki Geçişi Yazıyorum
                tempSection.addEventListener("click", () => {
                    if (tempSectionSpan.textContent === "°C") {
                        tempSectionSpan.textContent = "°F";
                        temperatureDegree.textContent = Math.floor(fah);
                    } else {
                        tempSectionSpan.textContent = "°C";
                        temperatureDegree.textContent = data.main.temp;
                    }
                });
                //Açıklama Değiştirme Fonksiyonunu Çağırıyorum
                changeDescription(weatherType.id);
                //Icons
                //Iconları Ayarlıyorum
                icons.set("Clear", Skycons.CLEAR_DAY);
                icons.set("Clear-night", Skycons.CLEAR_NIGHT);
                icons.set("Partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
                icons.set("Partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
                icons.set("Clouds", Skycons.CLOUDY);
                icons.set("Rain", Skycons.RAIN);
                icons.set("Sleet", Skycons.SLEET);
                icons.set("Snow", Skycons.SNOW);
                icons.set("Wind", Skycons.WIND);
                icons.set("Fog", Skycons.FOG);
                icons.set("Mist", Skycons.FOG);
                icons.play();
            });
    });
}
//Hava Durumu Açıklamasını Türkçeye Çeviriyorum
function changeDescription(weatherID) {
    var des;
    switch (weatherID) {
        case "Mist":
            des = "Sisli Hava";
            break;
        case "Clouds":
            des = "Bulutlu";
            break;
        case "Clear":
            des = "Açık Hava";
            break;
        case "Rain":
            des = "Hava Yağmurlu";
            break;
        case "Snow":
            des = "Karlı Hava";
            break;
        case "Partly-cloudy-day":
            des = "Parçalı Bulutlu";
            break;
        case "Wind":
            des = "Rüzgarlı Hava";
            break;
        case "Sleet":
            des = "Karla Karışık Yağmur";
            break;
        case "Partly-cloudy-night":
            des = "Parçalı Bulutlu Gece";
            break;
        case "Clear-night":
            des = "Açık Hava Gece";
            break;

    }
    temperatureDescription.textContent = des;
}