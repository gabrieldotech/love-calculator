const calcularBtn = document.getElementById('calculate-btn');
const seuNomeInput = document.getElementById('your-name');
const nomeAmorInput = document.getElementById('love-name');
const resultContainer = document.getElementById('result-container');

let nomeAnterior = '';
let nomeAmorAnterior = '';
let resultadoAnterior = null; 
let ultimoClique = 0;

// verifica se um valor é uma string válida (pelo menos 2 caracteres e apenas letras)
function ehStringValida(valor) {
    return typeof valor === 'string' && valor.trim().length >= 2 && /^[a-zA-ZÀ-ÿ ]+$/.test(valor);
}

// calcula a chance de dar certo entre os nomes
function calcularChance(seuNome, nomeAmor) {
    return Math.floor(Math.random() * 101);
}

// calcula e exibe o resultado
function calcularResultado(seuNome, nomeAmor) {
    const chance = calcularChance(seuNome, nomeAmor);

    // exibe o resultado
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <h2>Resultado do amor</h2>
        <p>${seuNome} <span class="heart">❤️</span> ${nomeAmor}</p>
        <p>Chance de dar certo: <strong>${chance}%</strong></p>
    `;

    // atualiza o resultado anterior
    resultadoAnterior = { seuNome, nomeAmor, chance };

    // remove todas as classes de opacidade do coração
    resultContainer.classList.remove('low-opacity', 'medium-opacity', 'high-opacity');

    // adiciona a classe de opacidade com base na chance
    if (chance <= 50) {
        resultContainer.classList.add('low-opacity');
    } else if (chance <= 79) {
        resultContainer.classList.add('medium-opacity');
    } else {
        resultContainer.classList.add('high-opacity');
    }
}

// exibe mensagem de erro
function exibirErroNaoString() {
    Swal.fire({
        icon: 'error',
        title: 'Entrada inválida!',
        text: 'Por favor, verifique os dados inseridos e tente novamente.',
        confirmButtonColor: '#d81b60'
    });
}

// lida com o clique no botão de calcular
function handleClick() {
    const agora = Date.now();
    const seuNome = seuNomeInput.value.trim();
    const nomeAmor = nomeAmorInput.value.trim();

    // verifica se os valores nos inputs são strings válidas
    if (!ehStringValida(seuNome) || !ehStringValida(nomeAmor)) {
        exibirErroNaoString();
        return;
    }

    // verifica se os nomes são os mesmos da última vez e se o último clique foi há mais de 1 segundo
    if (seuNome === nomeAnterior && nomeAmor === nomeAmorAnterior && (agora - ultimoClique < 1000)) {
        return;
    }

    // atualiza o tempo do último clique
    ultimoClique = agora;

    // verifica se houve mudança nos inputs desde o último cálculo válido
    if (resultadoAnterior && seuNome === resultadoAnterior.seuNome && nomeAmor === resultadoAnterior.nomeAmor) {
        return;
    }

    // atualiza os nomes anteriores
    nomeAnterior = seuNome;
    nomeAmorAnterior = nomeAmor;

    // calcula e exibe o resultado
    calcularResultado(seuNome, nomeAmor);
}

// evento para o botão de calcular
calcularBtn.addEventListener('click', handleClick);

// evento de tecla para o campo de entrada seuNomeInput
seuNomeInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleClick(); 
    }
});

// evento de tecla para o campo de entrada nomeAmorInput
nomeAmorInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleClick(); 
    }
});
