function barraBotoes(documento, textid) {

    var btnAtivacao = []; //Array dos botões a terem as ações monitoradass para a marcação do botão
    var documento = documento;
    var divBtn = $("<div id='b" + textid + "' class='editorBotoes'></div>");

    divBtn.insertBefore($(documento.textarea));

    var container = document.getElementById('b' + textid);

    /**
     *
     * @description Função para adicionar um grupo de botões à barra de botões
     * @param {grupoBotoes} grupo
     * @returns {undefined}
     */
    this.adicionarGrupo = function(grupo){
        container.appendChild(grupo);
    };

    /**
     * Verifica a ativação de todos os botões a serem verificados nesse grupo
     * @return {undefined}
     */
    var verificarBotoes = function() {
        for (i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    };

    /**
     * Adiciona um botão a grupo a ser verificado para marcar as alterações e marcar botões
     * @param  {Object} botao
     * @param  {string} acao
     * @return {undefined}
     */
    this.adicionarBotaoVerificacao = function(botao, acao) {
        btnAtivacao.push({botao: botao, acao: acao});
        verificarBotoes();
    };

    $(documento.frame).on('keypress focus change click select', function() {
        for (var i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    });


}
