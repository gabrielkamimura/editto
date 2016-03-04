function eDittoButtonGroup(barraBotoes) {

    var btngrp = document.createElement('div'),
        barraBotoes = barraBotoes;
    btngrp.className = "editorGroupButton";

    /**
     * Obtém a barra de botões a que esse grupo atende
     * @return {[type]} [description]
     */
    this.obterBarraBotoes = function() {
      return barraBotoes;
    }

    /**
     * @description Função para Adicionar Botão a um grupo de botões
     * @param {botao} botao
     * @returns {undefined}
     */
    this.adicionarBotao = function(botao) {
        btngrp.appendChild(botao.getButtonDOM());
    };

    /**
     *
     * @description Função para Obter o grupo
     * @returns {grupoBotoes.btngrp|Element}
     */
    this.getGroupHTML = function() {
        return btngrp;
    };

    // Adicionando grupo a barra de botões
    barraBotoes.adicionarGrupo(this);
}
