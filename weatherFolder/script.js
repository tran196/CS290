document.addEventListener('DOMContentLoaded', buttons);

function buttons()
{

    //form 1 (weather data)
    document.getElementById('zipcodeSubmit').addEventListener('click', function(event) {
        var req = new XMLHttpRequest();
        var payload = {userInput:null};
        payload.userInput = document.getElementById('userInput').value;

        if (payload.userInput.match(/\b\d{5}\b/g)) {
            req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + payload.userInput + ',us&appid=a24d861a33f524008e56a1ffaf686ea2', false);
        } else if (payload.userInput.match(/^[a-zA-Z ]+$/)) {
            req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + payload.userInput + ',us&appid=a24d861a33f524008e56a1ffaf686ea2', false);
        } 

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                var tempFahrenheit = (response.main.temp * (9/5) - 459.67).toFixed(0);
                document.getElementById('userInputDisplay').textContent = payload.userInput;
                document.getElementById('tempDisplay').textContent = tempFahrenheit + 'F';
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });

        req.send(JSON.stringify(payload));
        event.preventDefault();
    });

        //form 2 (send a string and get it back)
        document.getElementById('form2Submit').addEventListener('click', function(event) {
            var req = new XMLHttpRequest();
            var payload = null;
            payload = document.getElementById('form2input').value;
            req.open('POST', 'http://httpbin.org/post');
            req.setRequestHeader('Content-Type', 'application/json');
    
            req.addEventListener('load', function() {
                if (req.status >= 200 && req.status < 400) {
                    var response = JSON.parse(req.responseText);
                    document.getElementById('responseData').textContent = response.data;
                    console.log(response);
                } else {
                    console.log("Error in network request: " + req.statusText);
                }
            });
            req.send(payload);
            event.preventDefault();
        });
}
