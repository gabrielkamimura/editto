/**
 * @param {string} icone Link para arquivo svg contendo o ícone a ser utilizado
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function eDittoButton(grupoBotoes, icone, titulo) {
    
    this.btn = document.createElement("button");
    this.btn.type = "button";
    
    if (icone) {
        var icone = new eDittoIcon(icone);
        var innerElement = icone.getElementDOM();
        this.btn.className = "editto_button__icon";
    } else {
        var innerElement = document.createTextNode(titulo);
        this.btn.className = "editto_button__text";
    }
    
    if (titulo) {
        this.btn.title = titulo;
    };

    this.btn.appendChild(innerElement);

    eDittoAction.call(this, grupoBotoes, titulo);
}

eDittoButton.prototype.contructor = eDittoAction;

/**
 * Verifica se ação do botão atual está ativa no ponto do documento selecionado
 * @param  {object} documento
 * @param  {string} formato
 * @return {undefined}
 */
eDittoButton.prototype.verificaAtivacao = function( documento, formato ) {
    if (documento.verificaFormatacao(formato)) {
        this.marcarBotao();
    }
    else {
        this.desmarcarBotao();
    };
};

/**
 * Marca botão como ativo
 * @return {undefined}
 */
eDittoButton.prototype.marcarBotao = function( ) {
    this.btn.className = 'editto_button__icon ativo';
};

/**
 * Marca botão como desativo (retira botão marcado como utilizado)
 * @return {undefined}
 */
eDittoButton.prototype.desmarcarBotao = function() {
    this.btn.className = 'editto_button__icon';
};

/**
 * Obtém o elemento button criado a partir do document.createElement()
 * @return {[type]} [description]
 */
eDittoButton.prototype.getButtonDOM = function() {
    return this.btn;
};

/**
 * Define o ícone a ser utilizado por esse botão
 * @param  {string} ricon Nome do ícone
 * @return {undefined}
 */
eDittoButton.prototype.definirIcone = function(ricon) {
    icn.className = "fa fa-" + ricon;
};

function eDittoIcon(path) {

    this.element = document.createElement('div');
    this.element.className = "editto_button__icon_icon";

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", path, false);
    xhttp.send();
    this.element.innerHTML = xhttp.responseText;
}

/**
 * Obtém o elemento de ícone a ser inserido no DOM
 */
eDittoIcon.prototype.getElementDOM = function() {
    return this.element;
}