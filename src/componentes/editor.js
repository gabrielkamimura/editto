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

/**
 * Funcionalidade gerais a serem utilizadas
 */
window.eDittoHelpers = {
    /**
     * Insere um elemtno anteriormente a outro. Utilizado para inserir componentes como a barra de botões e o documento
     */
    insertAfter: function(newElement,targetElement) {
        var parent = targetElement.parentNode;

        //if the parents lastchild is the targetElement...
        if (parent.lastchild == targetElement) {
            //add the newElement after the target element.
            parent.appendChild(newElement);
        } else {
            // else the target has siblings, insert the new element between the target and it's next sibling.
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    },

    /**
     * Obtém a localização da pasta do arquivo do eDitto(editto.js ou editto.min.js)
     */
    getFileLocation: function() {
        var scriptElements = document.getElementsByTagName('script');
        for (var i = 0; i < scriptElements.length; i++) {
            var source = scriptElements[i].src;
            var fileIndex = source.indexOf('editto.min.js') > -1 ? source.indexOf('editto.min.js') : source.indexOf('editto.js');
            if (fileIndex > -1) {
                var location = source.substring(0, fileIndex);
                return location.substring(location.indexOf('dist'), 0);
            }
        }
      return false;
    }
}
