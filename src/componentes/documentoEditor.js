/**
 * [eDittoDocument description]
 * @param  {string} textid id do textarea a ser utilizado pelo editor
 * @param  {object} editor
 * @return {object}
 */
function eDittoDocument(textid, editor) {

    this.textarea = document.getElementById(textid);
    var editBox = $("<iframe contenteditable='true' class='editto_document' id='" + 't' + textid + "'></iframe>");
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
     * Obtém o texto selecionado em um elemento
     */
    this.getSelectedText = function() {
        var textoSelecionado = null;
        try {
            textoSelecionado = this.getSelection().toString();
        } 
        catch(error) {
        
        }

        return textoSelecionado;
    }

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
        if (this.getSelection()) {
            var a = this.frame.createElement('div');
            var range = this.getSelection().getRangeAt(0);
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
          $(this.getSelection()).load( template, function(response) {
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
