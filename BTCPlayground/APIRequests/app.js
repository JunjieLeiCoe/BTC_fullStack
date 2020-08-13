
// this is an before class activity and this activity renders some comic characters;

$(document).ready(
    $.ajax({
        url: 'https://rickandmortyapi.com/api/character',
        methods: 'GET'
    }).then(function (response) {
        console.log(response.results)
        response.results.forEach(function(character) {
            const $img = $('<img>').attr('src', character.image)
            const  $p = $('<p>').text(character.name)

            $('.character_names').append($p, $img)

        })
    })
)