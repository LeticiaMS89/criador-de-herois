// 1️⃣ Definição da Classe do Herói (Lógica do Desafio)
class Heroi {
    constructor(nome, idade, classeTexto) {
        this.nome = nome;
        this.idade = idade;
        this.tipo = classeTexto; // Guarda o nome limpo (Ex: Mago)
    }

    obterMensagemAtaque() {
        let ataque;
        const classeLimpa = this.tipo.toLowerCase();

        if (classeLimpa.includes('mago')) {
            ataque = 'magia ancestral';
        } else if (classeLimpa.includes('guerreiro')) {
            ataque = 'suas espadas gêmeas';
        } else if (classeLimpa.includes('monge')) {
            ataque = 'artes marciais espirituais';
        } else if (classeLimpa.includes('ninja')) {
            ataque = 'lâminas shuriken das sombras';
        } else {
            ataque = 'um ataque desconhecido';
        }

        return `O ${this.tipo.toUpperCase()} atacou usando ${ataque}!`;
    }
}

// 2️⃣ Interação com a Interface do Usuário
document.getElementById('hero-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomeInput = document.getElementById('nome').value;
    const idadeInput = document.getElementById('idade').value;
    
    // Captura os dados do SELECT
    const selectTipo = document.getElementById('tipo');
    const urlImagem = selectTipo.value; // Pega o LINK da imagem do value
    const classeTexto = selectTipo.options[selectTipo.selectedIndex].text.replace(/[^a-zA-Zá-úÁ-Ú ]/g, '').trim(); // Pega só o texto (ex: Mago Celestial)

    // Instanciação da classe Heroi
    const novoHeroi = new Heroi(nomeInput, idadeInput, classeTexto);
    const mensagemFinal = novoHeroi.obterMensagemAtaque();

    // Atualizando os textos na interface do Log
    document.getElementById('out-nome').textContent = novoHeroi.nome;
    document.getElementById('out-idade').textContent = novoHeroi.idade;
    document.getElementById('out-ataque').textContent = mensagemFinal;

    // 🎨 INJEÇÃO DA IMAGEM REALISTA NO PREVIEW
    const avatarDisplay = document.getElementById('char-avatar');
    
    // Limpa o preview antigo mantendo apenas a sombra base
    avatarDisplay.innerHTML = '<div class="avatar-shadow"></div>';

    // Cria a tag da imagem em alta definição e injeta no container
    const imgRealista = document.createElement('img');
    imgRealista.src = urlImagem;
    imgRealista.alt = classeTexto;
    imgRealista.style.width = '100%';
    imgRealista.style.height = '100%';
    imgRealista.style.objectFit = 'cover'; // Faz a arte preencher o quadro perfeitamente
    imgRealista.style.position = 'absolute';
    imgRealista.style.top = '0';
    imgRealista.style.left = '0';

    // Coloca a imagem por trás do HUD/Bordas
    avatarDisplay.appendChild(imgRealista);
});