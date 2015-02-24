function acao(documento) {
    
     /**
     * 
     * @param {string} template Caminho para o template
     * @returns Dados da requisição
     */
    this.carregar = function( template ) {
        
        $(documento.getSelectedText()).load( template, function(response) {
            console.log(response);
            var texto = response + '<br/>'; //A quebra de linha é para evitar que o documento após a personalização fique inalterável
            documento.inserirElemento(texto);
        } );
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