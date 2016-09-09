/**
 * [eDittoButtonBar description]
 * @param  {object} documento
 * @param  {string} textid    id para div de barra de botões
 * @param  {object} options   Opções a serem passadas para configurar (passadas de eDitto)
 *   @example  {
 *             		disableDefaultComponents: true //Devem ser desabilitados os componentes padrão do editor (funcionalidades padão e só devem ser usadas as personalizações)
 *             }
 * @return object
 */
function eDittoButtonBar(documento, textid, options) {

    var btnAtivacao = []; //Array dos botões a terem as ações monitoradass para a marcação do botão
    var documento = documento;
    var divBtn = document.createElement('div');
    divBtn.id = 'b' + textid;
    divBtn.className = 'editto_bar';

    var $this = this;

    eDittoHelpers.insertAfter(divBtn, documento.textarea);

    var container = document.getElementById('b' + textid);

    /**
     *
     * @description Função para adicionar um grupo de botões à barra de botões
     * @param {grupoBotoes} grupo
     * @returns {undefined}
     */
    this.adicionarGrupo = function(grupo){
        container.appendChild(grupo.getGroupHTML());
    };

    /**
     * Verifica a ativação de todos os botões a serem verificados nesse grupo
     * @return {undefined}
     */
    this.verificarBotoes = function() {
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
        this.verificarBotoes();
    };

    /**
     * Adição de elementos padrão caso estes não tenham sido removidos via opções
     */
    if (!options.disableDefaultComponents) {
      var $this = this;
      var buttonGroup1 = new eDittoButtonGroup($this);

      var btnNegrito = new eDittoButton(buttonGroup1, "/icons/bold.svg", "Negrito");
      btnNegrito.getButtonDOM().onclick = function() {
          $this.adicionarBotaoVerificacao(btnNegrito, 'bold');
          documento.formatar('bold');
          $this.verificarBotoes();
      };

      var btnItalico = new eDittoButton(buttonGroup1, "/icons/italic.svg", "Itálico");
      $this.adicionarBotaoVerificacao(btnItalico, 'italic');
      btnItalico.getButtonDOM().onclick = function() {
          documento.formatar('italic');
          $this.verificarBotoes();
      };

      var btnUnderline = new eDittoButton(buttonGroup1, "/icons/underline.svg", "Sublinhado");
      $this.adicionarBotaoVerificacao(btnUnderline, 'underline');
      btnUnderline.getButtonDOM().onclick = function() {
          documento.formatar('underline');
          $this.verificarBotoes();
      };

      var buttonGroup2 = new eDittoButtonGroup($this);
      var cores = [
          {texto: 'Preto', valor: "rgb(0, 0, 0)"},
          {texto: 'Cinza', valor: "rgb(158, 158, 158)"},
          {texto: 'Marrom', valor: "rgb(121, 85, 72)"},
          {texto: 'Azul', valor: "rgb(33, 150, 243)"},
          {texto: 'Vermelho', valor: "rgb(244, 67, 54)"},
          {texto: 'Amarelo', valor: "rgb(255, 235, 59)"},
          {texto: 'Verde', valor: "rgb(76, 175, 80)"},
          {texto: 'Laranja', valor: "rgb(255, 152, 0)"},
          {texto: 'Roxo', valor: "rgb(156, 39, 176)"},
          {texto: 'Rosa', valor: "rgb(233, 30, 99)"},
          {texto: 'Ciano', valor: "rgb(0, 188, 212)"},
          {texto: 'Azul claro', valor: "rgb(3, 169, 244)"},
          {texto: 'Índigo', valor: "rgb(63, 81, 181)"},
          {texto: 'Lima', valor: "rgb(205, 220, 57)"},
          {texto: 'Laranja Escuro', valor: "rgb(255, 87, 34)"},
          {texto: 'Rosa Claro', valor: "rgb(248, 187, 208)"},
          {texto: 'Teal', valor: "rgb(0, 150, 136)"},
          {texto: 'Roxo Escuro', valor: "rgb(103, 58, 183)"}
      ];
      var btnCor = new eDittoSelect(buttonGroup2, "Fonte", cores);
      $this.adicionarBotaoVerificacao(btnCor, 'forecolor');
      btnCor.getButtonDOM().onchange = function() {
          documento.formatar('forecolor', btnCor.getValue());
      };


      var tamanhosTexto = [
          {texto: '1', valor: '1'},
          {texto: '2', valor: '2'},
          {texto: '3', valor: '3'},
          {texto: '4', valor: '4'},
          {texto: '5', valor: '5'},
          {texto: '6', valor: '6'},
          {texto: '7', valor: '7'}
      ];
      var btntamanhofonte = new eDittoSelect(buttonGroup2, "Fonte", tamanhosTexto);
      $this.adicionarBotaoVerificacao(btntamanhofonte, 'fontSize');
      btntamanhofonte.getButtonDOM().onchange = function() {
          documento.formatar('fontSize', btntamanhofonte.getValue());
      };

      var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
      var btnFont = new eDittoSelect(buttonGroup2, "Fonte", fonts);
      $this.adicionarBotaoVerificacao(btnFont, 'fontname');
      btnFont.getButtonDOM().onchange = function() {
          documento.formatar('fontname', btnFont.getValue());
      };

      var buttonGroup3 = new eDittoButtonGroup($this);
      var btnEsquerda = new eDittoButton(buttonGroup3, "/icons/align_left.svg", "Alinhar à Esquerda");
      $this.adicionarBotaoVerificacao(btnEsquerda, 'justifyleft');
      btnEsquerda.getButtonDOM().onclick = function() {
          documento.formatar('justifyleft');
          $this.verificarBotoes();
      };


      var btnCentraliza = new eDittoButton(buttonGroup3, "/icons/align_center.svg", "Centralizar");
      $this.adicionarBotaoVerificacao(btnCentraliza, 'justifycenter');
      btnCentraliza.getButtonDOM().onclick = function() {
          documento.formatar('justifycenter');
          $this.verificarBotoes();
      };

      var btnDireita = new eDittoButton(buttonGroup3, "/icons/align_right.svg", "Alinhar à direita");
      $this.adicionarBotaoVerificacao(btnDireita, 'justifyright');
      btnDireita.getButtonDOM().onclick = function() {
          documento.formatar('justifyright');
          $this.verificarBotoes();
      };

      var buttonGroup4 = new eDittoButtonGroup($this);
      var btnNum = new eDittoButton(buttonGroup4, "/icons/list_ol.svg", "Lista Numérica");
      $this.adicionarBotaoVerificacao(btnNum, 'insertorderedlist');
      btnNum.getButtonDOM().onclick = function() {
        documento.formatar('insertorderedlist');
        $this.verificarBotoes();
      };

      var btnLst = new eDittoButton(buttonGroup4, "/icons/list_ul.svg", "Lista");
      $this.adicionarBotaoVerificacao(btnLst, 'insertunorderedlist');
      btnLst.getButtonDOM().onclick = function() {
        documento.formatar('insertunorderedlist');
        $this.verificarBotoes();
      };

      var buttonGroup5 = new eDittoButtonGroup($this);
      var btnLnk = new eDittoButton(buttonGroup5, '/icons/link.svg', "link");
      btnLnk.getButtonDOM().onclick = function() {
          var sLnk = prompt('Digite a URL do link: ', 'http:\/\/');
          if (sLnk && sLnk != '' && sLnk != 'http://') {
              documento.formatar('createlink', sLnk);
          };
      };

      var btnUlk = new eDittoButton(buttonGroup5, '/icons/unlink.svg', "Remover Link");
      btnUlk.getButtonDOM().onclick = function() {
        documento.formatar('unlink');
      }

      var btnLmp = new eDittoButton(buttonGroup5, '/icons/clear.svg', "Limpar Formatação");
      btnLmp.getButtonDOM().onclick = function() {
        documento.formatar('removeFormat');
      };
    }
}
