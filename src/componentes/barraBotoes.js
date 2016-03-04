/**
 * [eDittoButtonBar description]
 * @param  {object} documento
 * @param  {string} textid    id para div de barra de botões
 * @param  {object} options   Opções a serem passadas para configurar (passadas de eDitto)
 *   @example  {
 *             		disableDefaultComponents: true //Devem ser desabilitados os componentes padrão do editor (funcionalidades padão e só devem ser usadas as personalizações)
 *             }
 * @return {[type]}           [description]
 */
function eDittoButtonBar(documento, textid, options) {

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

    $(documento.frame).on('keypress focus change click select', function() {
        for (var i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    });



    if (!options.disableDefaultComponents) {
      var $this = this;
      console.log("Carregando elementos padrão do editor");
      var buttonGroup1 = new eDittoButtonGroup($this);

      var btnNegrito = new eDittoButton(buttonGroup1, "bold", "Negrito");
      btnNegrito.getButtonDOM().onclick = function() {
          $this.adicionarBotaoVerificacao(btnNegrito, 'bold');
          documento.formatar('bold');
          $this.verificarBotoes();
      };

      var btnItalico = new eDittoButton(buttonGroup1, "italic", "Itálico");
      $this.adicionarBotaoVerificacao(btnItalico, 'italic');
      btnItalico.getButtonDOM().onclick = function() {
          documento.formatar('italic');
          $this.verificarBotoes();
      };

      var btnUnderline = new eDittoButton(buttonGroup1, 'underline', "Sublinhado");
      $this.adicionarBotaoVerificacao(btnUnderline, 'underline');
      btnUnderline.getButtonDOM().onclick = function() {
          documento.formatar('underline');
          $this.verificarBotoes();
      };

      var buttonGroup2 = new eDittoButtonGroup($this);
      var cores = [
          {texto: 'Preto', valor: "#000"},
          {texto: 'Cinza', valor: "#9e9e9e"},
          {texto: 'Marrom', valor: "#795548"},
          {texto: 'Azul', valor: "#2196F3"},
          {texto: 'Vermelho', valor: "#F44336"},
          {texto: 'Amarelo', valor: "#ffeb3b"},
          {texto: 'Verde', valor: "#4caf50"},
          {texto: 'Laranja', valor: "#ff9800"},
          {texto: 'Roxo', valor: "#9c27b0"},
          {texto: 'Rosa', valor: "#e91e63"},
          {texto: 'Ciano', valor: "#00bcd4"},
          {texto: 'Azul claro', valor: "#03a9f4"},
          {texto: 'Índigo', valor: "#3f51b5"},
          {texto: 'Lima', valor: "#cddc39"},
          {texto: 'Laranja Escuro', valor: "#ff5722"},
          {texto: 'Rosa Claro', valor: "#F8BBD0"},
          {texto: 'Teal', valor: "#009688"},
          {texto: 'Roxo Escuro', valor: "#673AB7"}
      ];
      var btnCor = new eDittoButton(buttonGroup2, "Fonte",'', 2, cores);
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
      var btntamanhofonte = new eDittoButton(buttonGroup2, "Fonte",'', 2, tamanhosTexto);
      btntamanhofonte.getButtonDOM().onchange = function() {
          documento.formatar('fontSize', btntamanhofonte.getValue());
      };

      var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
      var btnFont = new eDittoButton(buttonGroup2, "Fonte",'', 2, fonts);
      btnFont.getButtonDOM().onchange = function() {
          documento.formatar('fontname', btnFont.getValue());
      };

      var buttonGroup3 = new eDittoButtonGroup($this);
      var btnEsquerda = new eDittoButton(buttonGroup3, 'align-left', "Alinhar à Esquerda");
      $this.adicionarBotaoVerificacao(btnEsquerda, 'justifyleft');
      btnEsquerda.getButtonDOM().onclick = function() {
          documento.formatar('justifyleft');
          $this.verificarBotoes();
      };


      var btnCentraliza = new eDittoButton(buttonGroup3, 'align-center', "Centralizar");
      $this.adicionarBotaoVerificacao(btnCentraliza, 'justifycenter');
      btnCentraliza.getButtonDOM().onclick = function() {
          documento.formatar('justifycenter');
          $this.verificarBotoes();
      };

      var btnDireita = new eDittoButton(buttonGroup3, 'align-right', "Alinhar à direita");
      $this.adicionarBotaoVerificacao(btnDireita, 'justifyright');
      btnDireita.getButtonDOM().onclick = function() {
          documento.formatar('justifyright');
          $this.verificarBotoes();
      };

      var buttonGroup4 = new eDittoButtonGroup($this);
      var btnNum = new eDittoButton(buttonGroup4, 'list-ol', "Lista Numérica");
      $this.adicionarBotaoVerificacao(btnNum, 'insertorderedlist');
      btnNum.getButtonDOM().onclick = function() {
        documento.formatar('insertorderedlist');
        $this.verificarBotoes();
      };

      var btnLst = new eDittoButton(buttonGroup4, 'list-ul', "Lista");
      $this.adicionarBotaoVerificacao(btnLst, 'insertunorderedlist');
      btnLst.getButtonDOM().onclick = function() {
        documento.formatar('insertunorderedlist');
        $this.verificarBotoes();
      };

      var buttonGroup5 = new eDittoButtonGroup($this);
      var btnLnk = new eDittoButton(buttonGroup5, 'link', "link");
      btnLnk.getButtonDOM().onclick = function() {
          var sLnk = prompt('Digite a URL do link: ', 'http:\/\/');
          if (sLnk && sLnk != '' && sLnk != 'http://') {
              documento.formatar('createlink', sLnk);
          };
      };

      var btnUlk = new eDittoButton(buttonGroup5, 'unlink', "Remover Link");
      btnUlk.getButtonDOM().onclick = function() {
        documento.formatar('unlink');
      }

      var btnLmp = new eDittoButton(buttonGroup5, 'eraser', "Limpar Formatação");
      btnLmp.getButtonDOM().onclick = function() {
        documento.formatar('removeFormat');
      };
    }
}
