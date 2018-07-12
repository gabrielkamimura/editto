class QuestaoService {
    
    static getById(id) {
        this._apiBase = 'http://devservice.s9academico.com.br/api/v1/'
        
        return new Promise((resolve, reject) => {
            fetch(this._apiBase + 'questoes/:id'.replace(':id', id), { 
                method: 'GET',
            })
            .then(res => res.json())
            .then(res => resolve(res.questao))
            .catch(res => reject(res))
        });
    }
}

class AcademicoQuestao extends HTMLElement {
    
    static get observedAttributes() {return ['idquestao']; }
    
    constructor() {
        super();
        let shadow = this.attachShadow({mode: 'open'});
        
        this._updateView = () => {
            shadow.innerHTML = this._template();
            if (!shadow.querySelector) {
                shadow.querySelector = shadow.host.querySelector;
            }
            let domAlternatives = shadow.querySelectorAll('.question__alternative');
            let $this = this;
            for (let i in domAlternatives) {
                if (typeof domAlternatives[i] == 'object') {
                    domAlternatives[i].addEventListener('click', function(event) {
                        var idAlternativa = this.dataset.idAlternativa;
                        $this.responderQuestao(idAlternativa);
                    });
                }
            }
        };
    }
    
    carregarQuestao() {
        QuestaoService.getById(this.idquestao)
            .then((questao) => {
                this._questao = questao;
                this._updateView();
            }).catch((error) => {
                console.log(error);
            });
    }
    
    responderQuestao(idAlternativa) {
        this._alternativaAtual = idAlternativa;
        this._updateView();
    }

    get isCorreta() {
         if (this._questao) {
             if (this._questao.alternativas) {
                 if (this._alternativaAtual) {
                     for (let i in this._questao.alternativas) {
                         if (this._alternativaAtual == this._questao.alternativas[i].id) {
                            return this._questao.alternativas[i].tipoResposta == 1; 
                         }
                     }
                 }
             }
         }
         return false;
    }

    get idquestao() {
        return this.getAttribute('idquestao');
    }
    
    _template() {
        return `
                <style>
                    .question__container 
                    {
                        margin: 1em;
                        color: #4A4A4A;
                        margin-top: 4em;
                    }

                    hr 
                    {
                        height: 10px; 
                        width: 100%;
                        margin-bottom: 0;
                        background-color: #10ac84;
                        background-image: linear-gradient(to right, #868f96 0%, #596164 100%);
                        border: none;
                    }

                    hr.correct {
                      background-image: linear-gradient(-20deg, #8ddad5 0%, #00cdac 100%);
                    }
                    
                    hr.incorrect {
                      background-image: linear-gradient(-20deg, #FF5300 0%, #d63031 100%);
                    }

                    .question__subheader 
                    {
                        margin: 0;
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .question__title 
                    {
                        font-size: 16px;
                        margin-top: 0;
                        font-weight: 100;
                    }
                    
                    .question__alternatives 
                    {
                        list-style-type: lower-alpha;
                        font-weight: bold;
                    }
                
                    .question__alternative 
                    {
                        font-size: 16px;
                        padding: 1em;
                        border: 3px solid rgba(0,0,0,0);
                        border-left: none;
                        border-right: none;
                    }

                    .question__alternative--text 
                    {
                        font-weight: normal;
                    }

                    .question__alternative:hover:not(.question-alternativa--selected) 
                    {
                        cursor: pointer;
                        background-color: #c8d6e5;
                    }

                    .question__alternative:hover:not(.question-alternativa--selected) 
                    .question__alternative--text 
                    {
                        color: #4A4A4A;
                    }

                    .question-alternativa--selected {
                        background-color: #d63031;
                        background-image: linear-gradient(-20deg, #FF5300 0%, #d63031 100%);
                    }

                    .question-alternativa--selected
                    .question__alternative--text
                    {
                        color: #fff;
                    }       
                    
                    li.question-alternativa--selected.question-alternativa--correct 
                    {
                        background-color: #10ac84;
                        background-image: linear-gradient(-20deg, #8ddad5 0%, #00cdac 100%);
                    }

                    .question-msg {
                        color: #fff;
                    }
                </style>
                <section class="question__container">
                    <hr class="${this._alternativaAtual ? this.isCorreta ? 'correct' : 'incorrect' : ''}"/>
                    <h1 class="question__subheader">Questão</h1>
                    <p class="question__title">${this._questao.texto}</p>
                    <ol class="question__alternatives">
                        ${this._questao.alternativas.map(a => `
                            <li data-id-alternativa="${a.id}" class="question__alternative ${a.id == this._alternativaAtual ? 'question-alternativa--selected' : ''} ${this.isCorreta ? 'question-alternativa--correct' : ''}">
                                <span class="question__alternative--text">${a.texto}</span>
                                ${a.id == this._alternativaAtual ? this.isCorreta ? '<div class="question-msg">Parabéns, você acertou :)</div>' : '<div class="question-msg">Desculpe, resposta errada. Tente novamente</div>' : ''}
                            </li>
                        `).join('')}
                    </ol>
                </section>`;
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'idquestao') {
            this.carregarQuestao();
        }
    }
}

if (window.customElements) {
    customElements.define('academico-questao', AcademicoQuestao);
}