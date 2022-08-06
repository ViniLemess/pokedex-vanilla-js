const API = "https://pokeapi.co/api/v2/"

$(document).keyup(function(event) {
    if ($("#caixaBusca").is(":focus") && event.key == "Enter") {
        
        buscarPokemon()
    }
});

function getShinyImage(resultado) {

    let imagem = document.getElementById("imagemPokemon")
    imagem.src = resultado.sprites.front_shiny

    let spanNome = document.getElementById("nomePokemon")
    spanNome.innerHTML = "shiny " + resultado.name

}
function getDefaultImage(resultado) {
    let imagem = document.getElementById("imagemPokemon")
    imagem.src = resultado.sprites.front_default

    let spanNome = document.getElementById("nomePokemon")
    spanNome.innerHTML = resultado.name

}
async function buscarPokemon(isShiny = false) {

    const inputPokemon = document.getElementById("caixaBusca")
    let nomePokemon = inputPokemon.value

    if (!nomePokemon) return
    nomePokemon = nomePokemon.toLowerCase()
    const resultado = await chamadaDaApi("pokemon/" + nomePokemon)
    console.log(resultado)

    if (!resultado) return

    if (isShiny) {
        getShinyImage(resultado);
    } else {
        getDefaultImage(resultado);
    }


    let spanTipos = document.getElementById("tipos")
    spanTipos.innerHTML = ""
    const tipos = resultado.types.forEach(element => {
        spanTipos.innerHTML += " " + element.type.name + ", "
    });

    let spanMoves = document.getElementById("moves")
    spanMoves.innerHTML = ""
    const moves = resultado.moves.forEach(element => {
        spanMoves.innerHTML += " " + element.move.name + ", "
    });

}

async function chamadaDaApi(resource) {
    let result

    await $.ajax({
        url: API + resource,
        type: 'GET',
        dataType: 'json',
        success: function (resposta) {
            result = resposta
        },
        error: function () {

            alert("Pokemon não Reconhecido!")
        }
    });

    return result
}