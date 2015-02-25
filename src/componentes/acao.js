function acao(documento) {
    

    var replaceAll = function(string, token, newtoken) {
        var string = string || "";
        while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
        }
        return string;
    };

    var scapeHTML = function(string) {
        var string = string || null;
        string = replaceAll(replaceAll(string, "<", "&lt"), ">", "&gt");
        return string;
    };
     /**
     * 
     * @param {string} template Caminho para o template
     * @returns Dados da requisição
     */
    this.carregar = function( template, options ) {
        
        $(documento.getSelectedText()).load( template, function(response) {
            var texto = response + '<br/>'; //A quebra de linha é para evitar que o documento após a personalização fique inalterável
            if (options) {
                for ( i in options ) {
                    var aux = "{{ " + options[i].variavel + " }}";
                    texto = replaceAll(texto, aux, scapeHTML(options[i].valor));
                };
            }
            documento.inserirElemento(texto);
        } );
    };
    
    this.inserirTexto = function( texto ) {
        documento.inserirElemento(scapeHTML(texto));
    };

    /**
     * 
     * @description Função que formata o texto do documento
     * @param {string} formato Formato desejado a ser modificado. P. ex: bold
     * @param {string} opcao Opção para formatação, p. ex: blue
     * @returns {undefined}
     */
    this.formatar = function(formato, opcao) {
        documento.formatar(formato, opcao);
    };
    
    this.verificaFormatacao = function(formato) {
        documento.verificaFormatacao(formato);
    };

    this.btn = new botao();
    
    
}