/**
 * [eDitto description]
 * @param  {string} textid  id do textarea em que vai ser colocado este editor
 * @param  {object} options  Opções a serem passadas para configurar
 *   @example  {
 *             		disableDefaultComponents: true //Devem ser desabilitados os componentes padrão do editor (funcionalidades padão) e só devem ser usadas as personalizações
 *             }
 * @return {object}
 */
function eDitto(textid, options) {

    var options = options || {};
        documento = new eDittoDocument(textid, this),
        botoes = new eDittoButtonBar(documento, textid, options),
        btnAtivacao = [];

    //Permitindo edição do documento
    documento.permitirEdicao();

    /**
     * Obtém a Barra de botões desse Editor
     * @return {object} eDittoButtonBar
     */
    this.obterBarraBotoes = function() {
        return botoes;
    };

    /**
     * Obtém o documento que esse editor manipula
     * @return {object} eDittoDocument
     */
    this.obterDocumento = function() {
        return documento;
    };

    var $this = this;
}
