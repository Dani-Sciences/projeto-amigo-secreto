let participantes = []; // Lista de participantes
let sorteios = {}; // Objeto para armazenar os pares sorteados
let jaSorteou = new Set(); // Conjunto para armazenar quem já sorteou

function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');
    const nome = nomeInput.value.trim();

    if (nome !== '' && !participantes.includes(nome)) {
        participantes.push(nome);
        nomeInput.value = ''; // Limpa o campo de entrada
        atualizarListaParticipantes();
    } else {
        alert("Nome inválido ou já cadastrado!");
    }
}

function sortearAmigo() {
    if (participantes.length < 2) {
        alert("É necessário pelo menos dois participantes para o sorteio.");
        return;
    }

    const nomePessoa = prompt("Digite seu nome para realizar o sorteio:");
    if (!nomePessoa) return;

    if (!participantes.includes(nomePessoa)) {
        alert("Nome não encontrado na lista de participantes!");
        return;
    }

    if (jaSorteou.has(nomePessoa)) {
        alert("Você já realizou seu sorteio!");
        return;
    }

    let amigosDisponiveis = participantes.filter(nome => nome !== nomePessoa && !Object.values(sorteios).includes(nome));

    if (amigosDisponiveis.length === 0) {
        alert("Nenhum amigo disponível para sorteio. Aguarde o fim do sorteio.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigosDisponiveis.length);
    const amigoSorteado = amigosDisponiveis[indiceAleatorio];

    alert(`${nomePessoa}, seu amigo secreto é: ${amigoSorteado}`);

    sorteios[nomePessoa] = amigoSorteado; // Registra o sorteio
    jaSorteou.add(nomePessoa); // Marca que essa pessoa já sorteou

    // Quando só faltar um participante para sortear, ele recebe automaticamente quem sobrou
    if (jaSorteou.size === participantes.length - 1) {
        const ultimoParticipante = participantes.find(nome => !jaSorteou.has(nome));
        const amigoRestante = participantes.find(nome => !Object.values(sorteios).includes(nome));

        sorteios[ultimoParticipante] = amigoRestante;
        alert(`${ultimoParticipante}, seu amigo secreto é: ${amigoRestante}`);
        jaSorteou.add(ultimoParticipante);
    }

    if (jaSorteou.size === participantes.length) {
        alert("O sorteio foi concluído!");
        document.querySelector(".button-draw").disabled = true;
    }
}

function atualizarListaParticipantes() {
    const listaParticipantes = document.getElementById('listaAmigos');
    listaParticipantes.innerHTML = '';

    participantes.forEach(nome => {
        const item = document.createElement('li');
        item.textContent = nome;
        listaParticipantes.appendChild(item);
    });

    document.querySelector(".button-draw").disabled = participantes.length < 2;
}
