// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuToggle.classList.toggle('aberto');
    menuToggle.setAttribute('aria-expanded', aberto);
});

// fecha o menu quando clica em um link
menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        menuToggle.classList.remove('aberto');
    });
});

// ===== TEMA CLARO / ESCURO =====
const btnTema = document.getElementById('btnTema');

function aplicarTema(tema) {
    if (tema === 'escuro') {
        document.body.classList.add('tema-escuro');
        btnTema.textContent = '☀️';
    } else {
        document.body.classList.remove('tema-escuro');
        btnTema.textContent = '🌙';
    }
}

function lerTemaSalvo() {
    try {
        return localStorage.getItem('tema');
    } catch (e) {
        return null;
    }
}

aplicarTema(lerTemaSalvo());

btnTema.addEventListener('click', () => {
    const novoTema = document.body.classList.contains('tema-escuro') ? 'claro' : 'escuro';
    aplicarTema(novoTema);
    try {
        localStorage.setItem('tema', novoTema);
    } catch (e) {
        // se não der pra salvar, só troca o tema mesmo
    }
});

// ===== ANO NO RODAPÉ =====
document.getElementById('ano').textContent = new Date().getFullYear();

// ===== SOMBRA NO MENU E BOTÃO DE TOPO =====
const cabecalho = document.querySelector('.cabecalho');
const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {
    cabecalho.classList.toggle('rolando', window.scrollY > 10);
    btnTopo.classList.toggle('visivel', window.scrollY > 300);
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ELEMENTOS APARECENDO AO ROLAR =====
const elementosRevelar = document.querySelectorAll('.revelar');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

elementosRevelar.forEach((el) => observador.observe(el));

// ===== PÁGINA INICIAL =====
const saudacao = document.getElementById('saudacao');

if (saudacao) {
    const hora = new Date().getHours();

    if (hora < 12) {
        saudacao.textContent = 'Bom dia! 👋';
    } else if (hora < 18) {
        saudacao.textContent = 'Boa tarde! 👋';
    } else {
        saudacao.textContent = 'Boa noite! 👋';
    }
}

// efeito de digitação
const textoDigitado = document.getElementById('textoDigitado');
const frases = ['Estudante de Engenharia de Software', 'Desenvolvedor Web', 'Suporte de TI', 'Criador de jogos'];

let indiceFrase = 0;
let indiceLetra = 0;
let apagando = false;

function digitar() {
    const fraseAtual = frases[indiceFrase];

    if (apagando) {
        indiceLetra--;
    } else {
        indiceLetra++;
    }

    textoDigitado.textContent = fraseAtual.substring(0, indiceLetra);

    let tempo = apagando ? 50 : 100;

    if (!apagando && indiceLetra === fraseAtual.length) {
        tempo = 1800;
        apagando = true;
    } else if (apagando && indiceLetra === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        tempo = 400;
    }

    setTimeout(digitar, tempo);
}

if (textoDigitado) {
    digitar();
}

// contadores animados
function animarContador(contador) {
    const alvo = Number(contador.dataset.alvo);
    let atual = 0;
    const passo = Math.max(1, Math.ceil(alvo / 40));

    const intervalo = setInterval(() => {
        atual += passo;
        if (atual >= alvo) {
            atual = alvo;
            clearInterval(intervalo);
        }
        contador.textContent = atual + '+';
    }, 40);
}

const contadores = document.querySelectorAll('.contador');

if (contadores.length > 0) {
    const observadorContador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);
                observadorContador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach((c) => observadorContador.observe(c));
}

// ===== PÁGINA SOBRE =====
const barras = document.querySelectorAll('.barra-progresso');

if (barras.length > 0) {
    const observadorBarras = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.style.width = entrada.target.dataset.nivel + '%';
                observadorBarras.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.5 });

    barras.forEach((barra) => observadorBarras.observe(barra));
}

const btnCuriosidade = document.getElementById('btnCuriosidade');
const curiosidadeTexto = document.getElementById('curiosidadeTexto');

const curiosidades = [
    'Comecei a programar porque queria criar meus próprios jogos.',
    'Já fiz um jogo de truco onde você enfrenta bosses.',
    'Trabalho com suporte de TI, então já formatei muito computador.',
    'Prefiro programar ouvindo música.',
    'Meu primeiro site foi feito só com HTML, sem nenhum CSS.'
];

let ultimaCuriosidade = -1;

function mostrarCuriosidade() {
    let sorteio;

    do {
        sorteio = Math.floor(Math.random() * curiosidades.length);
    } while (sorteio === ultimaCuriosidade);

    ultimaCuriosidade = sorteio;

    curiosidadeTexto.classList.remove('trocando');
    void curiosidadeTexto.offsetWidth; // reinicia a animação
    curiosidadeTexto.classList.add('trocando');
    curiosidadeTexto.textContent = curiosidades[sorteio];
}

if (btnCuriosidade) {
    btnCuriosidade.addEventListener('click', mostrarCuriosidade);
}

// ===== PÁGINA PROJETOS =====
const botoesFiltro = document.querySelectorAll('.filtro');
const cardsProjeto = document.querySelectorAll('.card-projeto');
const semResultado = document.getElementById('semResultado');

function filtrarProjetos(categoria) {
    let visiveis = 0;

    cardsProjeto.forEach((card) => {
        const mostrar = categoria === 'todos' || card.dataset.categoria === categoria;
        card.classList.toggle('escondido', !mostrar);

        if (mostrar) {
            card.classList.add('visivel');
            visiveis++;
        }
    });

    semResultado.hidden = visiveis > 0;
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
        botoesFiltro.forEach((b) => b.classList.remove('ativo'));
        botao.classList.add('ativo');
        filtrarProjetos(botao.dataset.categoria);
    });
});

// ===== PÁGINA CONTATO =====
const formContato = document.getElementById('formContato');

function mostrarErro(idCampo, idErro, mensagem) {
    const campo = document.getElementById(idCampo).parentElement;
    const erro = document.getElementById(idErro);

    erro.textContent = mensagem;
    campo.classList.toggle('invalido', mensagem !== '');
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (formContato) {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');
    const qtdCaracteres = document.getElementById('qtdCaracteres');
    const msgSucesso = document.getElementById('msgSucesso');

    mensagem.addEventListener('input', () => {
        qtdCaracteres.textContent = mensagem.value.length;
    });

    formContato.addEventListener('submit', (evento) => {
        evento.preventDefault();

        let valido = true;

        if (nome.value.trim().length < 3) {
            mostrarErro('nome', 'erroNome', 'Digite seu nome (mínimo 3 letras).');
            valido = false;
        } else {
            mostrarErro('nome', 'erroNome', '');
        }

        if (!emailValido(email.value.trim())) {
            mostrarErro('email', 'erroEmail', 'Digite um e-mail válido.');
            valido = false;
        } else {
            mostrarErro('email', 'erroEmail', '');
        }

        if (assunto.value === '') {
            mostrarErro('assunto', 'erroAssunto', 'Escolha um assunto.');
            valido = false;
        } else {
            mostrarErro('assunto', 'erroAssunto', '');
        }

        if (mensagem.value.trim().length < 10) {
            mostrarErro('mensagem', 'erroMensagem', 'A mensagem precisa ter pelo menos 10 caracteres.');
            valido = false;
        } else {
            mostrarErro('mensagem', 'erroMensagem', '');
        }

        if (!valido) {
            msgSucesso.hidden = true;
            return;
        }

        const primeiroNome = nome.value.trim().split(' ')[0];
        msgSucesso.textContent = `Valeu, ${primeiroNome}! Sua mensagem foi enviada. Logo eu respondo 😉`;
        msgSucesso.hidden = false;

        formContato.reset();
        qtdCaracteres.textContent = '0';
    });
}
