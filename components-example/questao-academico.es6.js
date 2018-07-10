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
            
            QuestaoService.getById(this.idquestao)
                .then((questao) => {
                    this._questao = questao;
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
                }).catch((error) => {
                    console.log(error);
                })
        };
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
                    .question__container {
                        margin: 1em;
                        color: #4A4A4A;
                        margin-top: 4em;
                    }
                    hr {
                        height: 10px; 
                        width: 100%;
                        margin-bottom: 0;
                        background-color: #55EFC4;
                        border: none;
                    }
                    .question__subheader {
                        margin: 0;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .question__title {
                        font-size: 16px;
                        margin-top: 0;
                        font-weight: 100;
                    }
                    
                    .question__alternatives {
                        list-style-type: lower-alpha;
                        font-weight: bold;
                    }
                
                    .question__alternative {
                        font-size: 16px;
                        padding: .5em;
                        border: 3px solid rgba(0,0,0,0);
                    }

                    .question__alternative--text {
                        font-weight: normal;
                    }

                    .question__alternative:hover:not(.question-alternativa--selected) {
                        color: #55EFC4;
                        cursor: pointer;
                        border: 3px solid #55EFC4;
                    }
                    .question__alternative:hover:not(.question-alternativa--selected) .question__alternative--text {
                        color: #4A4A4A;
                    }

                    .question-alternativa--selected {
                        border: 3px solid #d63031;
                    }
                    li.question-alternativa--selected.question-alternativa--correct {
                        border-color: #00b894;
                    }
                </style>
                <section class="question__container">
                    <hr />
                    <h1 class="question__subheader">Questão</h1>
                    <p class="question__title">${this._questao.texto}</p>
                    <ol class="question__alternatives">
                        ${this._questao.alternativas.map(a => `
                            <li data-id-alternativa="${a.id}" class="question__alternative ${a.id == this._alternativaAtual ? 'question-alternativa--selected' : ''} ${this.isCorreta ? 'question-alternativa--correct' : ''}">
                                <span class="question__alternative--text">${a.texto}</span>    
                            </li>
                        `).join('')}
                    </ol>
                </section>`;
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'idquestao') {
            this._updateView();
        }
    }
}

if (window.customElements) {
    customElements.define('academico-questao', AcademicoQuestao);
}