/**
 * @param {string} icn Ícone do Font-awesome a ser adicionado ao botão. Caso seja um texto de um option do select, passar
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function eDittoButton(grupoBotoes, icone, titulo) {

        var icn = document.createElement("i");
    
        this.btn = document.createElement("button");
        this.btn.type = "button";
        if (titulo) {
            this.btn.title = titulo;
        };
        this.btn.className = "editto_button__icon";
        icn.className = "fa fa-" + icone;

        this.btn.appendChild(icn);
    
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


