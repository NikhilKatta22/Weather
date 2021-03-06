console.log("Weather function invoked");
async function getWeather()
{
    var key = '8a77d18cafc7c7b78f8216c6f8dd7c47';
    var city = document.getElementById("city").value;
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="
    url = url.concat(city).concat("&appid=").concat(key).concat('&units=metric');
    let result = await fetch(url);
    let obj = await result.json();
    var res = document.getElementById("result");
    document.getElementById("table").innerHTML = '<table id = "table"><tr><td><canvas id = "myChart" width = "400" height = "400"></canvas></td></tr></table>';
    var ctx = document.getElementById('myChart').getContext('2d');
    if(obj.cod=="404")
    {
        res.innerHTML = '<div class="alert alert-danger"><strong>Info!</strong> Bugga Enter a valid city maybe check your spelling.</div>'
        document.getElementById("table").innerHTML = "";
       
    }
    else if(obj.cod == "400")
    {
        res.innerHTML = "<br>Enter a city";
        document.getElementById("table").innerHTML = "";
        
    }
    else
    {
        var country = obj.city.country;
        label = [];
        data = [];
        var time = obj.list[0].dt_txt.split(" ")[1]; 
        res.innerHTML = '<p id = "country">'+'Country name: '+country+'</p>'+'<p id = "result">Max Temp is: '+obj.list[0].main.temp_max+'<sup> o</sup>C<br>Min Temp is: '+obj.list[0].main.temp_min+'<sup> o</sup>C</p>';
        for(i=0;i<40;i+=8)
        {
            var date = obj.list[i].dt_txt.split(" ");
            label.push(date[0]);
            data.push(obj.list[i].main.temp);
        }
        var myChart = new Chart(ctx,{
            type: 'line',
            data: {
                labels: label,
                datasets: [{
                    label: 'Temperature',
                    data: data,
                    backgroundColor: [
                        'azure','aqua','#8F9E93','violet','teal'
                    ],
                    borderColor: [
                        'black','black','black','black','black'
                    ]
                }]
            },
        });
    }   
}