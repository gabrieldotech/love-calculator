const calcularBtn = document.getElementById('calculate-btn');
const seuNomeInput = document.getElementById('your-name');
const nomeAmorInput = document.getElementById('love-name');
const resultContainer = document.getElementById('result-container');

let nomeAnterior = '';
let nomeAmorAnterior = '';
let resultadoAnterior = null; // Armazena o último resultado para comparação
let ultimoClique = 0;

// Função para remover acentos de caracteres específicos
function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Função para verificar se um valor é uma string válida (pelo menos 2 caracteres e apenas letras)
function ehStringValida(valor) {
    return typeof valor === 'string' && valor.trim().length >= 2 && /^[a-zA-ZÀ-ÿ ]+$/.test(valor);
}

// Função para calcular e exibir o resultado
function calcularResultado(seuNome, nomeAmor, chance) {
    // Exibe o resultado
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <h2>Resultado do amor</h2>
        <p>${seuNome} <span class="heart">❤️</span> ${nomeAmor}</p>
        <p>Chance de dar certo: <strong>${chance}%</strong></p>
    `;

    // Atualiza o resultado anterior
    resultadoAnterior = { seuNome, nomeAmor, chance };

    // Remove todas as classes de opacidade do coração
    resultContainer.classList.remove('low-opacity', 'medium-opacity', 'high-opacity');

    // Adiciona a classe de opacidade com base na chance
    if (chance <= 50) {
        resultContainer.classList.add('low-opacity');
    } else if (chance <= 79) {
        resultContainer.classList.add('medium-opacity');
    } else {
        resultContainer.classList.add('high-opacity');
    }
}

// Função para exibir mensagem de erro
function exibirErroNaoString() {
    Swal.fire({
        icon: 'error',
        title: 'Entrada inválida!',
        text: 'Por favor, verifique os dados inseridos e tente novamente.',
        confirmButtonColor: '#d81b60'
    });
}

// Função para lidar com o clique no botão de calcular
function handleClick() {
    const agora = Date.now();
    const seuNome = seuNomeInput.value.trim();
    const nomeAmor = nomeAmorInput.value.trim();

    // Verifica se os valores nos inputs são strings válidas
    if (!ehStringValida(seuNome) || !ehStringValida(nomeAmor)) {
        exibirErroNaoString();
        return;
    }

    // Verifica se os nomes são os mesmos da última vez e se o último clique foi há mais de 1 segundo
    if (seuNome === nomeAnterior && nomeAmor === nomeAmorAnterior && (agora - ultimoClique < 1000)) {
        // Bloqueia o clique
        return;
    }

    // Atualiza o tempo do último clique
    ultimoClique = agora;

    // Verifica se houve mudança nos inputs desde o último cálculo válido
    if (resultadoAnterior && seuNome === resultadoAnterior.seuNome && nomeAmor === resultadoAnterior.nomeAmor) {
        // Bloqueia o clique
        return;
    }

    // Atualiza os nomes anteriores
    nomeAnterior = seuNome;
    nomeAmorAnterior = nomeAmor;

    let chance;

// Verifica se os nomes são "Gabriel" e "Vitória"
    const seuNomeRemovidoAcentos = removerAcentos(seuNome.toUpperCase());
    const nomeAmorRemovidoAcentos = removerAcentos(nomeAmor.toUpperCase());
    
    if ((seuNomeRemovidoAcentos === 'GABRIEL' && nomeAmorRemovidoAcentos === 'VITORIA') ||
        (seuNomeRemovidoAcentos === 'VITORIA' && nomeAmorRemovidoAcentos === 'GABRIEL')) {
        chance = 100;
    } else if ((seuNomeRemovidoAcentos === 'GABRIEL' && nomeAmorRemovidoAcentos !== 'VITORIA') ||
        (seuNomeRemovidoAcentos !== 'GABRIEL' && nomeAmorRemovidoAcentos === 'VITORIA') ||
        (seuNomeRemovidoAcentos === 'VITORIA' && nomeAmorRemovidoAcentos !== 'GABRIEL') ||
        (seuNomeRemovidoAcentos !== 'VITORIA' && nomeAmorRemovidoAcentos === 'GABRIEL')) {
        chance = 0;
    } else {
        // Calcula uma chance aleatória
        chance = Math.floor(Math.random() * 100) + 1;
    }

    // Calcula e exibe o resultado
    calcularResultado(seuNome, nomeAmor, chance);
}

// Evento para o botão de calcular
calcularBtn.addEventListener('click', handleClick);

// Evento de tecla para o campo de entrada seuNomeInput
seuNomeInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleClick(); // Chama a função handleClick se a tecla pressionada for Enter
    }
});

// Evento de tecla para o campo de entrada nomeAmorInput
nomeAmorInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleClick(); // Chama a função handleClick se a tecla pressionada for Enter
    }
});
