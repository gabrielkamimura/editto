function ElementoPersonalixacao() {
    
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
    
    this.botao = function( icone ) {
        var btn = new botao( icone );
        return btn;
    };
}