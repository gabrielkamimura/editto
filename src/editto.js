/**
 * @deprecated Depreciado para alterações futuras de melhoria de versativização
 * @todo -> integrar funções ao eDittoDocument (documentoEditor)
 */
function acao(documento) {

  

    //this.btn = new eDittoButton();


}

function eDittoButtonBar(documento, textid) {

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

    this.verificaAtivacao = function( documento, formato ) {
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

    this.marcarBotao = function( ) {
        btn.className = 'editorButton ativo';
    };

    this.desmarcarBotao = function() {
        btn.className = 'editorButton';
    };

    this.getButtonDOM = function() {
        return btn;
    };

    this.getValue = function() {
        if ( tipo == 2 ) {
            return this.getButtonDOM().value;
        }
        else {
            return null;
        };
    };

    this.setAction = function(acao) {
    };

    this.definirIcone = function(ricon) {
        icn.className = "fa fa-" + ricon;
    };

    // Adicionando botão criado a grupo definido
    grupoBotoes.adicionarBotao(this);

}

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
     *
     * @description Função que retorna o document do iframe desejado
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
     *
     * @description Função para Obter o Iframe
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
     *
     * @description Função que passa o valor do textarea para o iframe
     * @returns {undefined}
     */
    this.getValue = function() {
        this.frame.body.innerHTML = this.textarea.value;
    };

    /**
     *
     * @description Função que passa o valor do iframe para o textarea
     * @returns {undefined}
     */
    this.setValue = function() {
        this.textarea.value = this.frame.body.innerHTML;
    };


    this.frame = this.getIframeDocument('t' + textid);

    /**
     *
     * @description Função que retorna a seleção
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


    this.pararPassag = function() {
        clearInterval( passaValor );
        passaValor = null;
    };

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

}

function eDitto(textid) {

    var documento = new eDittoDocument(textid, this),
        botoes = new eDittoButtonBar(documento, textid),
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
    /*
    var btnNegrito = new botao("bold", "Negrito");
    btnNegrito.getButton().onclick = function() {
        $this.adicionarBotaoVerificacao(btnNegrito, 'bold');
        documento.formatar('bold');
        verificarBotoes();
    };

    var btnItalico = new botao("italic", "Itálico");
    btnAtivacao.push({botao: btnItalico, acao: 'italic'});
    btnItalico.getButton().onclick = function() {
        documento.formatar('italic');
        verificarBotoes();
    };

    var btnUnderline = new botao('underline', "Sublinhado");
    $this.adicionarBotaoVerificacao(btnUnderline, 'underline');
    btnUnderline.getButton().onclick = function() {
        documento.formatar('underline');
        verificarBotoes();
    };

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
    var btnCor = new botao("Fonte",'', 2, cores);
    btnCor.getButton().onchange = function() {
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
    var btntamanhofonte = new botao("Fonte",'', 2, tamanhosTexto);
    btntamanhofonte.getButton().onchange = function() {
        documento.formatar('fontSize', btntamanhofonte.getValue());
    };

    var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
    var btnFont = new botao("Fonte",'', 2, fonts);
    btnFont.getButton().onchange = function() {
        documento.formatar('fontname', btnFont.getValue());
    };

    var btnEsquerda = new botao('align-left', "Alinhar à Esquerda");
    $this.adicionarBotaoVerificacao(btnEsquerda, 'justifyleft');
    btnEsquerda.getButton().onclick = function() {
        documento.formatar('justifyleft');
        verificarBotoes();
    };


    var btnCentraliza = new botao('align-center', "Centralizar");
    $this.adicionarBotaoVerificacao(btnCentraliza, 'justifycenter');
    btnCentraliza.getButton().onclick = function() {
        documento.formatar('justifycenter');
        verificarBotoes();
    };

    var btnDireita = new botao('align-right', "Alinhar à direita");
    $this.adicionarBotaoVerificacao(btnDireita, 'justifyright');
    btnDireita.getButton().onclick = function() {
        documento.formatar('justifyright');
        verificarBotoes();
    };

    var btnNum = new botao('list-ol', "Lista Numérica");
    $this.adicionarBotaoVerificacao(btnNum, 'insertorderedlist');
    btnNum.getButton().onclick = function() {
      documento.formatar('insertorderedlist');
      verificarBotoes();
    };

    var btnLst = new botao('list-ul', "Lista");
    $this.adicionarBotaoVerificacao(btnLst, 'insertunorderedlist');
    btnLst.getButton().onclick = function() {
      documento.formatar('insertunorderedlist');
      verificarBotoes();
    };

    var btnLnk = new botao('link', "link");
    btnLnk.getButton().onclick = function() {
        var sLnk = prompt('Digite a URL do link: ', 'http:\/\/');
        if (sLnk && sLnk != '' && sLnk != 'http://') {
            documento.formatar('createlink', sLnk);
        };
    };

    var btnUlk = new botao('unlink', "Remover Link");
    btnUlk.getButton().onclick = function() {
      documento.formatar('unlink');
    }

    var btnLmp = new botao('eraser', "Limpar Formatação");
    btnLmp.getButton().onclick = function() {
      documento.formatar('removeFormat');
    };




 /**
  * Grupos dos botões. Forma como eles são organizados
  */
 /*
   var buttonGroup1 = new grupoBotoes();
   buttonGroup1.adicionarBotao(btnFont);
   buttonGroup1.adicionarBotao(btnCor);
   buttonGroup1.adicionarBotao(btntamanhofonte);

   var buttonGroup2 = new grupoBotoes();
   buttonGroup2.adicionarBotao(btnNegrito);
   buttonGroup2.adicionarBotao(btnItalico);
   buttonGroup2.adicionarBotao(btnUnderline);

   var buttonGroup3 = new grupoBotoes();
   buttonGroup3.adicionarBotao(btnEsquerda);
   buttonGroup3.adicionarBotao(btnCentraliza);
   buttonGroup3.adicionarBotao(btnDireita);

   var buttonGroup4 = new grupoBotoes();
   buttonGroup4.adicionarBotao(btnNum);
   buttonGroup4.adicionarBotao(btnLst);

   var buttonGroup5 = new grupoBotoes();
   buttonGroup5.adicionarBotao(btnLnk);
   buttonGroup5.adicionarBotao(btnUlk);
   buttonGroup5.adicionarBotao(btnLmp);

   botoes.adicionarGrupo(buttonGroup1.getGroup());
   botoes.adicionarGrupo(buttonGroup2.getGroup());
   botoes.adicionarGrupo(buttonGroup3.getGroup());
   botoes.adicionarGrupo(buttonGroup4.getGroup());
   botoes.adicionarGrupo(buttonGroup5.getGroup());


   /*
      Esta parte é para a definição das personalizações
   */
   /*
   var btnGrpCst = new eDittoButtonGroup(botoes);
console.log(btnGrpCst);
   this.addPersonalizacao = function(personalizacao) {
        btnGrpCst.adicionarBotao(personalizacao.ac.btn);
   };

   botoes.adicionarGrupo(btnGrpCst.getGroup());
   */
}

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

/**
 * @deprecated Depreciado para alterações futuras de melhoria de versativização
 * @todo -> integrar funcionalidades ao botão
 */
function personalizacaoEditor( documento ) {

    this.ac = new acao( documento );

     this.definirIcone = function(icone) {
        this.ac.btn.definirIcone(icone);
    };
}
