/**
 * Created by AYUSH on 2/7/2017.
 */


document.addEventListener("DOMContentLoaded", function () {


    $.ajax({

        type: 'GET',
        dataType: 'json',
        url: 'http://api.github.com/repos/fossiiita/opencodecollab/issues',
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        },

        success: function (data) {

            //var a= document.createElement('p');

            $("#login").html(data[0].url);

        }


    })


});