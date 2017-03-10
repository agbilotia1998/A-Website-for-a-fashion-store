
//
// $('.btn').click(function (){
//     $('.btn').text("BOOKED")
// });
// document.addEventListener("DOMContentLoaded",function() {
//     $.getJSON("initialData.json", function (json) {
//         $.ajax({
//             url: 'localhost:5000/fashion/:type',
//             type: 'POST',
//             data: json,
//             success: function (res) {
//                 console.log(res);
//             }.bind(this),
//             error: function (xhr, status, err) {
//                 console.error(url, status, err.toString());
//             }.bind(this)
//         });
//     }.bind(this));
// });

//
// document.addEventListener("DOMContentLoaded",function(){
//     $.ajax({
//         type:'GET',
//         dataType:'json',
//         url:'http://localhost:5000/fashion/:type',
//         success:function(data){
//             //var a= document.createElement('p');
//             //$("#login").html(data[0].url);
//         }
//     })
// });
//

//
// $("#btn1").click(function() {
//
$("button").click(function (){
     $.ajax({

         type: 'POST',
         dataType: 'json',
         url: 'http://localhost:5000/loginned/:un/book/:id',
         data: {
             'id':$(this).attr('id')
         },
    //     // headers:{
    //       //   'Accept':'application/vnd.github.v3+json'
    //     // },
         success: function () {
             $(this).text("BOOKED");
        },

         error: function () {
             $(this).text("BOOKED");
         }


    });
  });


// $("button").click(function() {
//     alert(this.id); // or alert($(this).attr('id'));
// });

