# ⚔️ Criador de Heróis - RPG Interface

Uma aplicação web imersiva de alta fantasia (*dark fantasy*) projetada para dar vida a personagens de RPG. O projeto une os fundamentos da **Programação Orientada a Objetos (POO)** em JavaScript à manipulação de elementos dinâmicos no DOM, apresentando uma interface rica em detalhes visuais e totalmente responsiva.

Este projeto foi desenvolvido como solução para o desafio de lógica de programação para classes de jogos, expandido com um ecossistema completo de interface de usuário (UI).

---

## 🕹️ Funcionalidades Principais

* **Instanciação Baseada em Classes (POO):** Criação dinâmica de objetos de personagens por meio da classe estruturada `Heroi`.
* **Renderização de Avatares Realistas:** Captura inteligente de links/arquivos locais no menu de seleção (`<select>`) para exibir ilustrações detalhadas correspondentes a cada classe no painel de visualização.
* **Log de Combate Dinâmico:** Saída textual em tempo real simulando eventos de um RPG clássico, identificando herói, idade e ataques customizados por arquétipo.
* **HUD Clássico Incorporado:** Barras superiores de Status (HP/MP/XP) e globos dinâmicos inferiores de recurso (Vida e Mana) estilizados em CSS puro.
* **Layout Totalmente Responsivo:** Painéis modulares estruturados com Flexbox que se empilham perfeitamente em dispositivos móveis e tablets.

---

## 🎨 Design e Estética Visual

O visual foi projetado do zero simulando as interfaces tradicionais de jogos de computador de fantasia sombria (*Diablo*, *Baldur's Gate*):
* **Tipografia:** Uso da fonte clássica e serifada `Cinzel` via Google Fonts.
* **Elementos em CSS Puro:** O ícone do joystick digital no cabeçalho e os orbs inferiores foram construídos usando formas geométricas avançadas, gradientes radiais e filtros de sombra (`drop-shadow` / `box-shadow`) nativos, eliminando imagens desnecessárias no esqueleto da página.
* **Imersão em Camadas:** Uso do efeito de sombreamento interno dinâmico (`.avatar-shadow`) sob o avatar e uso da propriedade `object-fit: cover` para garantir o enquadramento ideal das ilustrações.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica de formulários, seções de painel e contêineres do HUD.
* **CSS3:** Estilização avançada, gradientes lineares e radiais, variáveis de proporção, mascaramento geométrico com `clip-path` e **Media Queries** para responsividade mobile.
* **JavaScript (ES6):** Utilização de Classes, construtores, estruturas condicionais (`switch-case` / `if-else`), manipulação ativa do DOM, prevenção de eventos e criação dinâmica de nós HTML (`document.createElement`).

---

## 📁 Estrutura de Arquivos do Projeto

Para garantir o carregamento correto das imagens de avatares, o projeto está estruturado de forma local e organizada:

```text
📁 rpg-creator-interface/
├── 📄 index.html        # Estrutura principal e formulário
├── 📄 style.css         # Paleta dark fantasy e regras de responsividade
├── 📄 script.js         # Lógica de POO da classe Heroi e manipulação do DOM
├── 🖼️ mago.png          # Ilustração da classe Mago
├── 🖼️ guerreira.png      # Ilustração da classe Guerreira
├── 🖼️ monge.png         # Ilustração da classe Monge
└── 🖼️ ninja.png         # Ilustração da classe Ninja
```text
