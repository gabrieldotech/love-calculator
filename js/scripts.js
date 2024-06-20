const calcularBtn = document.getElementById('calculate-btn');
const seuNomeInput = document.getElementById('your-name');
const nomeAmorInput = document.getElementById('love-name');
const resultContainer = document.getElementById('result-container');

let nomeAnterior = '';
let nomeAmorAnterior = '';
let resultadoAnterior = null; // Armazenar o último resultado para comparação
let ultimoClique = 0;

// função para remover acentos de caracteres específicos
function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// função para verificar se um valor é uma string válida (pelo menos 2 caracteres e apenas letras)
function ehStringValida(valor) {
    return typeof valor === 'string' && valor.trim().length >= 2 && /^[a-zA-ZÀ-ÿ ]+$/.test(valor);
}

// função para calcular e exibir o resultado
function calcularResultado(seuNome, nomeAmor, chance) {
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

// evento para o botão de calcular
calcularBtn.addEventListener('click', () => {
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
        // bloqueia o clique
        return;
    }

    // atualiza o tempo do último clique
    ultimoClique = agora;

    // verifica se houve mudança nos inputs desde o último cálculo válido
    if (resultadoAnterior && seuNome === resultadoAnterior.seuNome && nomeAmor === resultadoAnterior.nomeAmor) {
        // bloqueia o clique
        return;
    }

    // atualiza os nomes anteriores
    nomeAnterior = seuNome;
    nomeAmorAnterior = nomeAmor;

    let chance;

    // Verifica se os nomes são "Gabriel" e "Vitória"
    if ((seuNome.toUpperCase() === 'GABRIEL' && removerAcentos(nomeAmor.toUpperCase()) === 'VITORIA') ||
        (seuNome.toUpperCase() === 'VITORIA' && removerAcentos(nomeAmor.toUpperCase()) === 'GABRIEL')) {
        chance = 100;
    
    } else if((seuNome.toUpperCase() === 'GABRIEL' && removerAcentos(nomeAmor.toUpperCase()) !== 'VITORIA') ||
    (seuNome.toUpperCase() != 'VITORIA' && removerAcentos(nomeAmor.toUpperCase()) === 'GABRIEL')) {
        chance = 0;
    } else if ((seuNome.toUpperCase() != 'GABRIEL' && removerAcentos(nomeAmor.toUpperCase()) == 'VITORIA') ||
    (seuNome.toUpperCase() == 'VITORIA' && removerAcentos(nomeAmor.toUpperCase()) != 'GABRIEL')) {
        chance = 0;
    }
    else {
        // calcula uma chance aleatoria
        chance = Math.floor(Math.random() * 100) + 1;
    }

    // calcula e exibe o resultado
    calcularResultado(seuNome, nomeAmor, chance);

 
});

// modal para mensagem de erro
function exibirErroNaoString() {
    Swal.fire({
        icon: 'error',
        title: 'Entrada inválida!',
        text: 'Por favor, verifique os dados inseridos e tente novamente.',
        confirmButtonColor: '#d81b60' 
    });
}
