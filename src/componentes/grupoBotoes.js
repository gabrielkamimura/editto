function grupoBotoes(barraBotoes) {

    var btngrp = document.createElement('div'),
        barraBotoes = barraBotoes;
    btngrp.className = "editorGroupButton";
    barraBotoes.adicionarGrupo(this);
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
