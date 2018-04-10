/**
 * [eDittoDocument description]
 * @param  {string} textid id do textarea a ser utilizado pelo editor ou o próprio elemento a ser inserido
 * @param  {object} editor
 * @return {object}
 */
function eDittoDocument(textid, editor) {
    if (textid instanceof Element) {
        this.textarea = textid;
    } else {
        this.textarea = document.getElementById(textid);
    }

    var editBox = document.createElement('iframe');
    editBox.className = 'editto_document';
    editBox.id = 't' + textid;
    editBox.contenteditable = true;

    var editor = editor || null;
    var $this = this;

    eDittoHelpers.insertAfter(editBox, this.textarea);
    this.textarea.style.display = "none";

    // document.getElementById('t' + textid).onload = function() {
    //     $this.frame = $this.getIframeDocument('t' + textid);
    //     $this.permitirEdicao();
    // };

    editBox.onload = function() {
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
        // Verificar a ativação dos elementos também
    };

    /**
     * Chama na barra de botões a funcionalidade de verificação de ações ativas
     */
    this.verificarBotoes = function() {
        editor.obterBarraBotoes().verificarBotoes();
    }


    this.frame = this.getIframeDocument('t' + textid);

    /**
     * Retorna a seleção atual
     * @returns {txt@pro;frame@call;getSelection|txt@pro;frame@pro;selection@call;createRange@pro;text|txt}
     */
    this.getSelection = function() {
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
     * Obtém o range para a inserção de componentes
     */
    this.getSelectionRange = function() {

        var range = null;
        if (this.getSelection().getRangeAt) {
          range = this.getSelection().getRangeAt(0);
        } else {
          range = document.createRange();
          range.setStart (userSelection.anchorNode, userSelection.anchorOffset);
          range.setEnd (userSelection.focusNode, userSelection.focusOffset);
        }

        return range;
    }

    /**
     * Obtém o texto selecionado em um elemento
     */
    this.getSelectedText = function() {
        var textoSelecionado = null;
        try {
            textoSelecionado = this.getSelection().toString();
        } 
        catch(error) {
        
        }

        return textoSelecionado.length > 0 ? textoSelecionado : null;
    }

    /**
     * Obtém o texto selecionado em um elemento
     */
    this.getSelectedHTML = function() {
        var elementoSelecionado = null;
        try {
            var range = this.getSelectionRange().cloneContents(),
                tmp = document.createElement('div');
                tmp.appendChild(range);

            elementoSelecionado = tmp.innerHTML;
        } 
        catch(error) {
        
        }

        return elementoSelecionado.length > 0 ? elementoSelecionado : null;
    }

    /**
     * Habilita o design mode do iframe possibilitando alterações
     */
    this.permitirEdicao = function() {
        this.getValue();
        this.frame.designMode = 'On';
        // this.getIframe('t' + textid).focus();
        
    };

    var $this = this;

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
            $this.verificarBotoes();
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
        if (this.getSelection()) {
            var a = this.frame.createElement('div');
            var range = this.getSelectionRange();
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

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                var texto = this.responseText + '<br/>';
                if (options) {
                    for ( i in options ) {
                        var aux = "{{ " + options[i].variavel + " }}",
                        texto = replaceAll(this.responseText, aux, escapeHTML(options[i].valor));
                    };
                }
                $this.inserirElemento(texto);
            }   
        };

        xhttp.open("GET", template, true);
        xhttp.send();

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
