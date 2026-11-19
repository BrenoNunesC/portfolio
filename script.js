// Pega os elementos da página
let formulario = document.getElementById("formulario");
let resposta = document.getElementById("resposta");

// Função chamada quando o formulário é enviado
function enviarMensagem(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome == "" || email == "" || mensagem == "") {
        resposta.textContent = "Preencha todos os campos!";
        resposta.style.color = "red";
    } else {
        resposta.textContent = "Obrigado, " + nome + "! Sua mensagem foi enviada.";
        resposta.style.color = "green";
        formulario.reset();
    }
}

formulario.addEventListener("submit", enviarMensagem);
