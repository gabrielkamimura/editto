/**
 * @param {string} icn Ícone do Font-awesome a ser adicionado ao botão. Caso seja um texto de um option do select, passar
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function eDittoSelect(grupoBotoes, title, opcoes) {


    this.opcoes = opcoes;

    this.btn = document.createElement("select");
    this.btn.className = "editorSelect";
    if ( opcoes ) {
        for ( i in opcoes ) {
            var opt = document.createElement("option");
            opt.innerHTML = opcoes[i].texto;
            opt.value = opcoes[i].valor;
            this.btn.appendChild(opt);
        };
    }
    else {
        console.warning("Defina as opções");
    }
    eDittoAction.call(this, grupoBotoes, title);
}


eDittoSelect.prototype.contructor = eDittoAction;
/**
 * Verifica se ação do botão atual está ativa no ponto do documento selecionado
 * @param  {object} documento
 * @param  {string} formato
 * @return {undefined}
 */
eDittoSelect.prototype.verificaAtivacao = function( documento, formato ) {
    this.btn.value = documento.frame.queryCommandValue(formato);
};

/**
 * Obtém o elemento button criado a partir do document.createElement()
 * @return {[type]} [description]
 */
eDittoSelect.prototype.getButtonDOM = function() {
    return this.btn;
};

/**
 * Obtém o valor no button criado a partir do document.createElement()
 * @return {[type]} [description]
 */
eDittoSelect.prototype.getValue = function() {
    return this.getButtonDOM().value;
};
