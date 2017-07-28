"use strict";


// PART 1: SHOW A FORTUNE

function showFortune(evt) {
    // TODO: get the fortune and show it in the #fortune-text div
    $.get('/fortune', function (results) {
        $('#fortune-text').html(results);
    });
}

$('#get-fortune-button').on('click', showFortune);





// PART 2: SHOW WEATHER

function showForecast(results) {
    var forecastInfo = results['forecast'];
    $('#weather-info').html(forecastInfo);
}

function showWeather(evt) {
    evt.preventDefault();

    var url = "/weather.json?zipcode=" + $("#zipcode-field").val();

    // TODO: request weather with that URL and show the forecast in #weather-info
    $.get(url, showForecast)
}

$("#weather-form").on('submit', showWeather);




// PART 3: ORDER MELONS
function orderResult(results) {
    var status = $('#order-status')
    //set order status message
    status.html(results['msg']);
    //if error occurs - add error style
    if (results['code'] === 'ERROR') {
        status.addClass('order-error');
    }
    else { //otherwise make sure style is removed
        status.removeClass('order-error')
    }
}

function orderMelons(evt) {
    evt.preventDefault();

    // TODO: show the result message after your form
    // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
    var formInputs = {
        "qty": $('#qty-field').val(),
        "melon_type": $('#melon-type-field').val()
    };

    $.post("/order-melons.json", formInputs, orderResult);
}

$("#order-form").on('submit', orderMelons);
