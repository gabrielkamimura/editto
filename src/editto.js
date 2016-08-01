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

    // Ao alterar, requisitar verificação
    $(documento.frame).on('keypress focus change click select', function() {
        for (var i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    });

    /**
     * Adição de elementos padrão caso estes não tenham sido removidos via opções
     */
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

/**
 * @param {string} icn Ícone do Font-awesome a ser adicionado ao botão. Caso seja um texto de um option do select, passar
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function eDittoButton(grupoBotoes, icon, title, tpo, opcoes) {

    var tipo = tpo || 1,
        icone = icon || '',
        titulo = title,
        grupoBotoes = grupoBotoes;

    /**
     * Obtém o grupo de botões a que pertence esse botão
     * @return {Object}
     */
    this.obterGrupoBotoes = function() {
        return grupoBotoes;
    };

    if ( tipo === 2 ) {
        var btn = document.createElement("select");
        btn.className = "editorSelect";
        if ( opcoes ) {
            for ( i in opcoes ) {
                var opt = document.createElement("option");
                opt.innerHTML = opcoes[i].texto;
                opt.value = opcoes[i].valor;
                btn.appendChild(opt);
            };
        }
        else {
            console.warning("Defina as opções");
        }
    }
    else {
        var btn = document.createElement("button"),
            icn = document.createElement("i");

        btn.type = "button";
        if (titulo) {
            btn.title = titulo;
        };
        btn.className = "editorButton";
        icn.className = "fa fa-" + icone;

        btn.appendChild(icn);
    }

    /**
     * Marca botão como ativo
     * @return {undefined}
     */
    this.marcarBotao = function( ) {
        btn.className = 'editorButton ativo';
    };

    /**
     * Marca botão como desativo (retira botão marcado como utilizado)
     * @return {undefined}
     */
    this.desmarcarBotao = function() {
        btn.className = 'editorButton';
    };

    /**
     * Obtém o elemento button criado a partir do document.createElement()
     * @return {[type]} [description]
     */
    this.getButtonDOM = function() {
        return btn;
    };

    /**
     * Obtém o valor no button criado a partir do document.createElement()
     * @return {[type]} [description]
     */
    this.getValue = function() {
        if ( tipo == 2 ) {
            return this.getButtonDOM().value;
        }
        else {
            return null;
        };
    };

    /**
     * Define o ícone a ser utilizado por esse botão
     * @param  {string} ricon Nome do ícone
     * @return {undefined}
     */
    this.definirIcone = function(ricon) {
        icn.className = "fa fa-" + ricon;
    };

    // Adicionando botão criado a grupo definido
    grupoBotoes.adicionarBotao(this);

}

/**
 * Verifica se ação do botão atual está ativa no ponto do documento selecionado
 * @param  {object} documento
 * @param  {string} formato
 * @return {undefined}
 */
eDittoButton.prototype.verificaAtivacao = function( documento, formato ) {
    if ( tipo === 2 ) {
         btn.value = documento.verificaFormatacao(formato);
    }
    else {
        if (documento.verificaFormatacao(formato)) {
            this.marcarBotao();
        }
        else {
            this.desmarcarBotao();
        };
    };
};

/**
 * [eDittoDocument description]
 * @param  {string} textid id do textarea a ser utilizado pelo editor
 * @param  {object} editor
 * @return {object}
 */
function eDittoDocument(textid, editor) {

    this.textarea = document.getElementById(textid);
    var editBox = $("<iframe contenteditable='true' class='editorDocumento' id='" + 't' + textid + "'></iframe>");
    var editor = editor || null;
    var $this = this;

    editBox.insertAfter($(this.textarea));
    this.textarea.style.display = "none";

    document.getElementById('t' + textid).onload = function() {
        $this.frame = $this.getIframeDocument('t' + textid);
        $this.permitirEdicao();
    };

    /**
     * Obtém o editor deste documento
     * @return {Object} [O editor relacionado a este documento]
     */
    this.obterEditor = function() {
        return editor;
    }

    /**
     * Retorna o document do iframe desejado
     * @param {int} aID ID do Iframe que se deseja
     * @returns {Node.frames.document|document.frames.document|HTMLDocument.frames.document|Document.frames.document|Element.contentDocument}
     */
    this.getIframeDocument = function(aID) {
        if (document.getElementById(aID).contentWindow) {
            return document.getElementById(aID).contentWindow.document;

        } else {
      // se contentDocument existe
          if (document.getElementById(aID).contentDocument) {
            return document.getElementById(aID).contentDocument;
          } else {
            if (document.frames[aID].document) {
                // IE
                return document.frames[aID].document;
            }
            else {
                return null;
            };
          }
      }
    };

    /**
     * Obtém o Iframe
     * @param {int} aID ID do Iframe que se deseja
     * @returns {Element|HTMLDocument.frames|document.frames|Document.frames|Node.frames}
     */
    this.getIframe = function(aID) {
      // se contentDocument existe
      if (document.getElementById(aID).contentDocument){
        return document.getElementById(aID);
      } else {
        // IE
        return document.frames[aID];
      }
    };

    /**
     * Passa o valor do textarea para o iframe
     * @returns {undefined}
     */
    this.getValue = function() {
        this.frame.body.innerHTML = this.textarea.value;
    };

    /**
     * Passa o valor do iframe para o textarea
     * @returns {undefined}
     */
    this.setValue = function() {
        this.textarea.value = this.frame.body.innerHTML;
    };


    this.frame = this.getIframeDocument('t' + textid);

    /**
     * Retorna a seleção atual
     * @returns {txt@pro;frame@call;getSelection|txt@pro;frame@pro;selection@call;createRange@pro;text|txt}
     */
    this.getSelectedText = function() {
        if (this.frame.getSelection) {
            txt = this.frame.getSelection();
        } else if (this.frame.getSelection()) {
            txt = this.frame.getSelection();
        } else if (this.frame.selection) {
            txt = this.frame.selection.createRange().text;
        }
        return txt;
    };

    /**
     * Habilita o design mode do iframe possibilitando alterações
     */
    this.permitirEdicao = function() {
        this.getValue();
        this.frame.designMode = 'On';
        this.getIframe('t' + textid).focus();
    };

    var $this = this;

    $( '#t' + textid ).ready(function() {
        $this.frame = $this.getIframeDocument('t' + textid);

        $this.getValue();
    });
/*
    $(this.getIframe('t' + textid)).on('keydown keypress select focus change blur click submit', function() {
        $this.setValue();
    });
*/

    var passaValor = null;

    /**
     * Para a transferência automática para a textarea
     */
    this.pararPassag = function() {
        clearInterval( passaValor );
        passaValor = null;
    };

    /**
     * Inicia a transferência automática para o textarea
     * @return {[type]} [description]
     */
    this.iniciarPassagem = function() {
        passaValor = setInterval(function() {
            $this.setValue();
        }, 500);

    };

    this.iniciarPassagem();
    /**
     *
     * @description Função que formata o texto do documento
     * @param {string} formato Formato desejado a ser modificado. P. ex: bold
     * @param {string} opcao Opção para formatação, p. ex: blue
     * @returns {undefined}
     */
    this.formatar = function(formato, opcao) {
        opcao = opcao || null;
        this.getIframe('t' + textid).focus();
        this.frame.execCommand(formato, false, opcao);
        this.getIframe('t' + textid).focus();
    };

    /**
     *
     * @description Função que insere elementos a posição atual
     * @param {type} elem
     * @returns {undefined}
     */
    this.inserirElemento = function(elem) {
        if (this.getSelectedText) {
            var a = this.frame.createElement('div');
            var range = this.getSelectedText().getRangeAt(0);
            range.surroundContents(a);
            a.innerHTML = elem;
        };
    };

    /**
     *
     * @description Função que verifica a formatação do documento de acordo com um formato
     * @param {string} formato
     * @returns {documentoEditor@pro;frame@call;queryCommandState}
     */
    this.verificaFormatacao = function(formato) {
        return (this.frame.queryCommandState(formato));
    };

    /**
     * Recebe uma string e um determinado caractere a ser alterado e retorna string com caracteres alterados
     * @param  {string} string   A string a sofrer alteração
     * @param  {string} token    Texto a ser buscado na string para modufucação
     * @param  {string} newtoken Texto a reposicionar token
     * @return {string}
     */
      var replaceAll = function(string, token, newtoken) {
          var string = string || "";
          while (string.indexOf(token) != -1) {
              string = string.replace(token, newtoken);
          }
          return string;
      };

      /**
       * Recebe uma string e remove os caracteres de HTML
       * @param  {string} string Um texto que pode ter tags HTML
       * @return {string}        O tetxo agora sem tags HTML
       */
      var escapeHTML = function(string) {
          var string = string || null;
          string = replaceAll(replaceAll(string, "<", "&lt"), ">", "&gt");
          return string;
      };

       /**
       *
       * @param {string} template Caminho para o template
       * @returns Dados da requisição
       */
      this.carregar = function( template, options ) {
        var $this = this;
          $(this.getSelectedText()).load( template, function(response) {
              var texto = response + '<br/>'; //A quebra de linha é para evitar que o documento após a personalização fique inalterável
              if (options) {
                  for ( i in options ) {
                      var aux = "{{ " + options[i].variavel + " }}";
                      texto = replaceAll(texto, aux, escapeHTML(options[i].valor));
                  };
              }
              $this.inserirElemento(texto);
          } );
      };

      /**
       *
       * @param {string} template Caminho para o template
       * @returns Dados da requisição
       */
      this.inserirComponente = function( txt, options ) {
        var $this = this;
              var texto = txt + '<br/>'; //A quebra de linha é para evitar que o documento após a personalização fique inalterável
              if (options) {
                  for ( i in options ) {
                      var aux = "{{ " + options[i].variavel + " }}";
                      texto = replaceAll(texto, aux, escapeHTML(options[i].valor));
                  };
              }
              $this.inserirElemento(texto);
      };

      this.inserirTexto = function( texto ) {
          var $this = this;
          $this.inserirElemento(escapeHTML(texto));
      };

      // Cópia do css da página pai para o editor
      try {
        var pageStyleSheets = document.styleSheets;
        var cssString = [];
        for (var i in pageStyleSheets) {
          var cssRules = pageStyleSheets[i].cssRules;
          for (var j in cssRules) {
              cssString.push(cssRules[j].cssText);
          }
        }
        var styleEl = $this.frame.createElement('style');
        styleEl.type = 'text/css';
        styleEl.innerHTML = cssString.join("\n");

        $this.frame.head.appendChild(styleEl);
      } catch (err){

      }


}

/**
 * [eDitto description]
 * @param  {string} textid  id do textarea em que vai ser colocado este editor
 * @param  {object} options  Opções a serem passadas para configurar
 *   @example  {
 *             		disableDefaultComponents: true //Devem ser desabilitados os componentes padrão do editor (funcionalidades padão) e só devem ser usadas as personalizações
 *             }
 * @return {object}
 */
function eDitto(textid, options) {

    var options = options || {};
        documento = new eDittoDocument(textid, this),
        botoes = new eDittoButtonBar(documento, textid, options),
        btnAtivacao = [];

    //Permitindo edição do documento
    documento.permitirEdicao();

    /**
     * Obtém a Barra de botões desse Editor
     * @return {object} eDittoButtonBar
     */
    this.obterBarraBotoes = function() {
        return botoes;
    };

    /**
     * Obtém o documento que esse editor manipula
     * @return {object} eDittoDocument
     */
    this.obterDocumento = function() {
        return documento;
    };

    var $this = this;
}

/**
 * [eDittoButtonGroup description]
 * @param  {object} barraBotoes
 * @return {object}
 */
function eDittoButtonGroup(barraBotoes) {

    var btngrp = document.createElement('div'),
        barraBotoes = barraBotoes;
    btngrp.className = "editorGroupButton";

    /**
     * Obtém a barra de botões a que esse grupo atende
     * @return {object}
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
