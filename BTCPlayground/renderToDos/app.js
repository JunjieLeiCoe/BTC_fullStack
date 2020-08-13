$(document).ready(
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        response.forEach(function (response) {
            // console.log(response.title)

            const  $p = $('<p>').text(response.title)
            $('.todos').append($p)


        })
    })


)