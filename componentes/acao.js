function acao(documento) {
    
     /**
     * 
     * @param {string} template Caminho para o template
     * @returns Dados da requisição
     */
    this.carregar = function( template ) {
    //    $(this.frame).load( template );
        $.load(template, function(response) {
            return response;
        });
        return null;
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