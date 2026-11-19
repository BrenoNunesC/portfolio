function enviar() {
    let nome = document.getElementById("nome").value;
    let resposta = document.getElementById("resposta");

    if (nome == "") {
        resposta.innerHTML = "Digite seu nome!";
    } else {
        resposta.innerHTML = "Obrigado, " + nome + "! Mensagem enviada.";
    }
}
