/**
 * Created by AYUSH on 1/10/2017.
 */


function  total (scores){

    var total=0;

    for(var i=0;i<scores.length;i++)
    {
        total=total+scores[i];
    }
return total;

}

console.log( total([20,40,90]));