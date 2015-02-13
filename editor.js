function editor(textid) {
    $.getScript( "componentes/documentoEditor.js", function( data, textStatus, jqxhr ) {
        $.getScript( "componentes/botao.js", function( data, textStatus, jqxhr ) {
            $.getScript( "componentes/grupoBotoes.js", function( data, textStatus, jqxhr ) {
                $.getScript( "componentes/barraBotoes.js", function( data, textStatus, jqxhr ) {
                    $.getScript( "componentes/personalizacaoEditor.js", function( data, textStatus, jqxhr ) {
                        
                        var documento = new documentoEditor(textid);   
                        var botoes = new barraBotoes( documento, textid );
                        var personalizacoes = [];
                        
                        this.adicionarPersonalizacao = function() {
                            var personalizacao = new personalizacaoEditor();
                        };
                        
                    });
                });
            });
        });
    });
}