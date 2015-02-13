function personalizacaoEditor( documento, botoes ) {
    
    var documento = documento;
    
    
    this.elementos = [];
    /**
     * 
     * @param {string} template Caminho pára o template
     * @returns Dados da requisição
     */
    this.carregar = function( template ) {
    //    $(this.frame).load( template );
        $.load(template, function(response) {
            return response;
        });
        return null;
    };
    
    this.adicionarBotao = function() {};
    
    
    
}