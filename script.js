/**
 * ===================================================================
 * CRIADOR DE HERÓIS - LÓGICA DE COMBATE & POO (JAVASCRIPT ES6+)
 * ===================================================================
 * 
 * Este script implementa a lógica principal do sistema de RPG:
 * - Programação Orientada a Objetos (POO) com a classe 'Heroi'
 * - Sanitização e validação segura dos dados do formulário
 * - Alternância dinâmica de ambientes visuais no avatar conforme a classe
 * - Microinterações no log de combate e atualização de atributos A11y
 */

/**
 * 1️⃣ CLASSE HEROI (Entidade do Domínio)
 * Encapsula os dados do herói e a lógica do tipo de ataque.
 */
class Heroi {
    /**
     * @param {string} nome - Nome do herói
     * @param {number|string} idade - Idade do personagem
     * @param {string} tipo - Chave interna da classe ('mago', 'guerreira', 'monge', 'ninja')
     * @param {string} rotuloClasse - Nome amigável formatado da classe para exibição
     */
    constructor(nome, idade, tipo, rotuloClasse) {
        this.nome = this.sanitizarTexto(nome) || 'Aventureiro Anônimo';
        this.idade = Math.max(1, parseInt(idade, 10) || 1);
        this.tipo = tipo.toLowerCase();
        this.rotuloClasse = rotuloClasse || 'Aventureiro';
    }

    /**
     * Sanitiza strings para evitar falhas de XSS (Injeção de scripts)
     * @param {string} texto 
     * @returns {string} Texto seguro
     */
    sanitizarTexto(texto) {
        const div = document.createElement('div');
        div.textContent = texto.trim();
        return div.innerHTML;
    }

    /**
     * Retorna a descrição do ataque baseada na classe do herói (Regra de Negócio)
     * @returns {string} Mensagem formatada para o log de combate
     */
    obterMensagemAtaque() {
        let ataque;

        switch (this.tipo) {
            case 'mago':
                ataque = 'magia ancestral celestial';
                break;
            case 'guerreira':
            case 'guerreiro':
                ataque = 'suas espadas gêmeas de aço valiriano';
                break;
            case 'monge':
                ataque = 'artes marciais espirituais de energia Chi';
                break;
            case 'ninja':
                ataque = 'lâminas shuriken ocultas nas sombras';
                break;
            default:
                ataque = 'um ataque físico simples';
        }

        return `O ${this.rotuloClasse.toUpperCase()} atacou usando ${ataque}!`;
    }
}

/**
 * 2️⃣ MANIPULAÇÃO DA INTERFACE DO USUÁRIO (DOM & EVENTOS)
 */
document.addEventListener('DOMContentLoaded', () => {

    // Seleção dos elementos do formulário e entradas
    const formHeroi = document.getElementById('hero-form');
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const selectTipo = document.getElementById('tipo');

    // Seleção dos elementos do Log de Combate e Avatar
    const outNome = document.getElementById('out-nome');
    const outIdade = document.getElementById('out-idade');
    const outAtaque = document.getElementById('out-ataque');
    const resultBox = document.getElementById('result-box');
    const avatarDisplay = document.getElementById('char-avatar');

    // Elementos de status do HUD
    const mpBarHeroi = document.querySelector('.mp-bar');

    /**
     * Alterna as classes CSS de ambiente e iluminação no preview do Avatar
     * @param {string} classeChave - Nome da classe ('mago', 'guerreira', etc.)
     */
    function atualizarAmbienteAvatar(classeChave) {
        if (!avatarDisplay) return;

        // Remove temas de classes anteriores
        avatarDisplay.classList.remove('display-mago', 'display-guerreira', 'display-monge', 'display-ninja');

        // Aplica o novo ambiente visual
        if (classeChave) {
            avatarDisplay.classList.add(`display-${classeChave}`);
        }
    }

    /**
     * Dispara um efeito visual de tremor e iluminação no Log de Combate ao atacar
     */
    function animarLogCombate() {
        if (!resultBox) return;

        resultBox.style.transform = 'scale(1.02)';
        resultBox.style.borderColor = '#ef4444';
        resultBox.style.transition = 'all 0.15s ease';

        setTimeout(() => {
            resultBox.style.transform = 'scale(1)';
            resultBox.style.borderColor = '#4a1515';
        }, 200);
    }

    /**
     * Simula o consumo instantâneo de Mana no HUD durante o ataque
     */
    function simularConsumoMana() {
        if (mpBarHeroi) {
            mpBarHeroi.style.filter = 'brightness(1.8)';
            setTimeout(() => {
                mpBarHeroi.style.filter = 'brightness(1)';
            }, 300);
        }
    }

    // Evento de submissão do formulário de criação/ataque
    if (formHeroi) {
        formHeroi.addEventListener('submit', (evento) => {
            evento.preventDefault();

            // Validação de segurança dos campos obrigatórios
            if (!inputNome.value.trim()) {
                alert('Por favor, informe o nome do seu herói!');
                inputNome.focus();
                return;
            }

            if (!selectTipo.value) {
                alert('Por favor, selecione uma classe para o herói!');
                selectTipo.focus();
                return;
            }

            // Captura os dados do SELECT
            const chaveClasse = selectTipo.value;
            const opcaoSelecionada = selectTipo.options[selectTipo.selectedIndex];
            
            // Remove emojis para manter apenas o nome da classe no rótulo limpo
            const rotuloClasse = opcaoSelecionada.text.replace(/[\u{1F300}-\u{1F6FF}]/gu, '').trim();

            // 1. Instanciação da classe Heroi (POO)
            const novoHeroi = new Heroi(
                inputNome.value,
                inputIdade.value,
                chaveClasse,
                rotuloClasse
            );

            // 2. Cálculo do ataque
            const mensagemFinal = novoHeroi.obterMensagemAtaque();

            // 3. Atualização segura do Log de Saída
            if (outNome) outNome.textContent = novoHeroi.nome;
            if (outIdade) outIdade.textContent = novoHeroi.idade;
            if (outAtaque) {
                outAtaque.textContent = mensagemFinal;
                // Notificação acessível para leitores de tela via ARIA
                outAtaque.setAttribute('aria-label', `Resultado do combate: ${mensagemFinal}`);
            }

            // 4. Injeção do ambiente visual e microinterações
            atualizarAmbienteAvatar(chaveClasse);
            animarLogCombate();
            simularConsumoMana();
        });
    }

    // Atualiza o ambiente visual em tempo real conforme o usuário altera a seleção no dropdown
    if (selectTipo) {
        selectTipo.addEventListener('change', (evento) => {
            atualizarAmbienteAvatar(evento.target.value);
        });
    }

});
