/**
 * Este aquivo conterá as chamadas base para ações
  * @param {string} icn Ícone do Font-awesome a ser adicionado ao botão. Caso seja um texto de um option do select, passar
  * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
  * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
  * */
 function eDittoAction(grupoBotoes) {

     this.grupoBotoes = grupoBotoes;

     // Adicionando botão criado a grupo definido
     grupoBotoes.adicionarBotao(this);

 }

 /**
  * Obtém o grupo de botões a que pertence esse botão
  * @return {Object}
  */
 eDittoAction.prototype.obterGrupoBotoes = function() {
     return this.grupoBotoes;
 };

 /**
  * Verifica se ação do botão atual está ativa no ponto do documento selecionado
  * @param  {object} documento
  * @param  {string} formato
  * @return {undefined}
  */
 eDittoAction.prototype.verificaAtivacao = function( documento, formato ) {

 };

 /**
  * Obtém o elemento button criado a partir do document.createElement()
  * @return {[type]} [description]
  */
 eDittoAction.prototype.getElementDOM = function() {

 };
