/**
 * Created by AYUSH on 2/24/2017.
 */
//
// $('.btn').click(function (){
//     $('.btn').text("BOOKED")
// });

$("#btn1").click(function() {


    $.ajax({

        type: 'POST',
        dataType: 'json',
        url: 'http://localhost:5000/loginned/readymade/book',
        data: {
            'id': ''
        },

        // headers:{
        //     'Accept':'application/vnd.github.v3+json'
        // },

        success: function (data) {

            //var a= document.createElement('
            $('#btn1').text("BOOKED");
        }


    })
});