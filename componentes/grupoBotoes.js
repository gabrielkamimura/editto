function grupoBotoes() {
    
    var btngrp = document.createElement('div');
    btngrp.className = "editorGroupButton";
    
    /**
     * @description Função para Adicionar Botão a um grupo de botões
     * @param {botao} botao
     * @returns {undefined}
     */
    this.adicionarBotao = function(botao) {
        btngrp.appendChild(botao.getButton());
    };
    
    /**
     * 
     * @description Função para Obter o grupo
     * @returns {grupoBotoes.btngrp|Element}
     */
    this.getGroup = function() {
        return btngrp;
    };
}