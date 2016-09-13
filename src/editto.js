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

      var btnNegrito = new eDittoButton(buttonGroup1, "@eDittoIcons/bold.svg", "Negrito");
      btnNegrito.getButtonDOM().onclick = function() {
          $this.adicionarBotaoVerificacao(btnNegrito, 'bold');
          documento.formatar('bold');
          $this.verificarBotoes();
      };

      var btnItalico = new eDittoButton(buttonGroup1, "@eDittoIcons/italic.svg", "Itálico");
      $this.adicionarBotaoVerificacao(btnItalico, 'italic');
      btnItalico.getButtonDOM().onclick = function() {
          documento.formatar('italic');
          $this.verificarBotoes();
      };

      var btnUnderline = new eDittoButton(buttonGroup1, "@eDittoIcons/underline.svg", "Sublinhado");
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
      var btnEsquerda = new eDittoButton(buttonGroup3, "@eDittoIcons/align_left.svg", "Alinhar à Esquerda");
      $this.adicionarBotaoVerificacao(btnEsquerda, 'justifyleft');
      btnEsquerda.getButtonDOM().onclick = function() {
          documento.formatar('justifyleft');
          $this.verificarBotoes();
      };


      var btnCentraliza = new eDittoButton(buttonGroup3, "@eDittoIcons/align_center.svg", "Centralizar");
      $this.adicionarBotaoVerificacao(btnCentraliza, 'justifycenter');
      btnCentraliza.getButtonDOM().onclick = function() {
          documento.formatar('justifycenter');
          $this.verificarBotoes();
      };

      var btnDireita = new eDittoButton(buttonGroup3, "@eDittoIcons/align_right.svg", "Alinhar à direita");
      $this.adicionarBotaoVerificacao(btnDireita, 'justifyright');
      btnDireita.getButtonDOM().onclick = function() {
          documento.formatar('justifyright');
          $this.verificarBotoes();
      };

      var buttonGroup4 = new eDittoButtonGroup($this);
      var btnNum = new eDittoButton(buttonGroup4, "@eDittoIcons/list_ol.svg", "Lista Numérica");
      $this.adicionarBotaoVerificacao(btnNum, 'insertorderedlist');
      btnNum.getButtonDOM().onclick = function() {
        documento.formatar('insertorderedlist');
        $this.verificarBotoes();
      };

      var btnLst = new eDittoButton(buttonGroup4, "@eDittoIcons/list_ul.svg", "Lista");
      $this.adicionarBotaoVerificacao(btnLst, 'insertunorderedlist');
      btnLst.getButtonDOM().onclick = function() {
        documento.formatar('insertunorderedlist');
        $this.verificarBotoes();
      };

      var buttonGroup5 = new eDittoButtonGroup($this);
      var btnLnk = new eDittoButton(buttonGroup5, '@eDittoIcons/link.svg', "link");
      btnLnk.getButtonDOM().onclick = function() {
          var sLnk = prompt('Digite a URL do link: ', 'http:\/\/');
          if (sLnk && sLnk != '' && sLnk != 'http://') {
              documento.formatar('createlink', sLnk);
          };
      };

      var btnUlk = new eDittoButton(buttonGroup5, '@eDittoIcons/unlink.svg', "Remover Link");
      btnUlk.getButtonDOM().onclick = function() {
        documento.formatar('unlink');
      }

      var btnLmp = new eDittoButton(buttonGroup5, '@eDittoIcons/clear.svg', "Limpar Formatação");
      btnLmp.getButtonDOM().onclick = function() {
        documento.formatar('removeFormat');
      };
    }
}

/**
 * @param {string} icone Link para arquivo svg contendo o ícone a ser utilizado
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function eDittoButton(grupoBotoes, icone, titulo) {
    
    this.btn = document.createElement("button");
    this.btn.type = "button";
    
    if (icone) {
        var icone = new eDittoIcon(icone);
        var innerElement = icone.getElementDOM();
        this.btn.className = "editto_button__icon";
    } else {
        var innerElement = document.createTextNode(titulo);
        this.btn.className = "editto_button__text";
    }
    
    if (titulo) {
        this.btn.title = titulo;
    };

    this.btn.appendChild(innerElement);

    eDittoAction.call(this, grupoBotoes, titulo);
}

eDittoButton.prototype.contructor = eDittoAction;

/**
 * Verifica se ação do botão atual está ativa no ponto do documento selecionado
 * @param  {object} documento
 * @param  {string} formato
 * @return {undefined}
 */
eDittoButton.prototype.verificaAtivacao = function( documento, formato ) {
    if (documento.verificaFormatacao(formato)) {
        this.marcarBotao();
    }
    else {
        this.desmarcarBotao();
    };
};

/**
 * Marca botão como ativo
 * @return {undefined}
 */
eDittoButton.prototype.marcarBotao = function( ) {
    this.btn.className = 'editto_button__icon ativo';
};

/**
 * Marca botão como desativo (retira botão marcado como utilizado)
 * @return {undefined}
 */
eDittoButton.prototype.desmarcarBotao = function() {
    this.btn.className = 'editto_button__icon';
};

/**
 * Obtém o elemento button criado a partir do document.createElement()
 * @return {[type]} [description]
 */
eDittoButton.prototype.getButtonDOM = function() {
    return this.btn;
};

/**
 * Define o ícone a ser utilizado por esse botão
 * @param  {string} ricon Nome do ícone
 * @return {undefined}
 */
eDittoButton.prototype.definirIcone = function(ricon) {
    icn.className = "fa fa-" + ricon;
};

function eDittoIcon(path) {
    if (path.indexOf('@eDittoIcons') != -1) {
        path = path.replace('@eDittoIcons', eDittoHelpers.getFileLocation() + 'icons');
    }
    
    this.element = document.createElement('div');
    this.element.className = "editto_button__icon_icon";

    var xhttp = new XMLHttpRequest(),
        $this = this;
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $this.element.innerHTML = this.responseText;
        }   
    };
    
    xhttp.open("GET", path, true);
    xhttp.send();
    this.element.innerHTML = xhttp.responseText;

}

/**
 * Obtém o elemento de ícone a ser inserido no DOM
 */
eDittoIcon.prototype.getElementDOM = function() {
    return this.element;
}
/**
 * [eDittoDocument description]
 * @param  {string} textid id do textarea a ser utilizado pelo editor
 * @param  {object} editor
 * @return {object}
 */
function eDittoDocument(textid, editor) {

    this.textarea = document.getElementById(textid);

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
 * Funcionalidade gerais a serem utilizadas
 */
window.eDittoHelpers = {
    /**
     * Insere um elemtno anteriormente a outro. Utilizado para inserir componentes como a barra de botões e o documento
     */
    insertAfter: function(newElement,targetElement) {
        var parent = targetElement.parentNode;

        //if the parents lastchild is the targetElement...
        if (parent.lastchild == targetElement) {
            //add the newElement after the target element.
            parent.appendChild(newElement);
        } else {
            // else the target has siblings, insert the new element between the target and it's next sibling.
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    },

    /**
     * Obtém a localização da pasta do arquivo do eDitto(editto.js ou editto.min.js)
     */
    getFileLocation: function() {
        var scriptElements = document.getElementsByTagName('script');
        for (var i = 0; i < scriptElements.length; i++) {
            var source = scriptElements[i].src;
            var fileIndex = source.indexOf('editto.min.js') > -1 ? source.indexOf('editto.min.js') : source.indexOf('editto.js');
            if (fileIndex > -1) {
                var location = source.substring(0, fileIndex);
                return location;
            }
        }
      return false;
    }
}

/**
 * [eDittoButtonGroup description]
 * @param  {object} barraBotoes
 * @return {object}
 */
function eDittoButtonGroup(barraBotoes) {

    var btngrp = document.createElement('div'),
        barraBotoes = barraBotoes;
    btngrp.className = "editto_group";

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

/**
 * @param {string} icn Ícone do Font-awesome a ser adicionado ao botão. Caso seja um texto de um option do select, passar
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function eDittoSelect(grupoBotoes, title, opcoes) {


    this.opcoes = opcoes;

    this.btn = document.createElement("select");
    this.btn.className = "editto_select";
    if ( opcoes ) {
        for ( i in opcoes ) {
            var opt = document.createElement("option");
            opt.innerHTML = opcoes[i].texto;
            opt.value = opcoes[i].valor;
            this.btn.appendChild(opt);
        };
    }
    else {
        console.warning("Defina as opções");
    }
    eDittoAction.call(this, grupoBotoes, title);
}


eDittoSelect.prototype.contructor = eDittoAction;
/**
 * Verifica se ação do botão atual está ativa no ponto do documento selecionado
 * @param  {object} documento
 * @param  {string} formato
 * @return {undefined}
 */
eDittoSelect.prototype.verificaAtivacao = function( documento, formato ) {
    this.btn.value = documento.frame.queryCommandValue(formato);
};

/**
 * Obtém o elemento button criado a partir do document.createElement()
 * @return {[type]} [description]
 */
eDittoSelect.prototype.getButtonDOM = function() {
    return this.btn;
};

/**
 * Obtém o valor no button criado a partir do document.createElement()
 * @return {[type]} [description]
 */
eDittoSelect.prototype.getValue = function() {
    return this.getButtonDOM().value;
};
