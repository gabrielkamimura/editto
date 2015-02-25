function acao(documento) {
    

    var replaceAll = function(string, token, newtoken) {
        var string = string || "";
        while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
        }
        return string;
    };

    var scapeHTML = function(string) {
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
        
        $(documento.getSelectedText()).load( template, function(response) {
            var texto = response + '<br/>'; //A quebra de linha é para evitar que o documento após a personalização fique inalterável
            if (options) {
                for ( i in options ) {
                    var aux = "{{ " + options[i].variavel + " }}";
                    texto = replaceAll(texto, aux, scapeHTML(options[i].valor));
                };
            }
            documento.inserirElemento(texto);
        } );
    };
    
    this.inserirTexto = function( texto ) {
        documento.inserirElemento(scapeHTML(texto));
    };

    /**
     * 
     * @description Função que formata o texto do documento
     * @param {string} formato Formato desejado a ser modificado. P. ex: bold
     * @param {string} opcao Opção para formatação, p. ex: blue
     * @returns {undefined}
     */
    this.formatar = function(formato, opcao) {
        documento.formatar(formato, opcao);
    };
    
    this.verificaFormatacao = function(formato) {
        documento.verificaFormatacao(formato);
    };

    this.btn = new botao();
    
    
}
function barraBotoes(documento, textid) {
    
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
        container.appendChild(grupo);
    };
    
/*
 * Botões e ações ao clicá-los
 */    
   
}
/**
 * @param {string} icn Ícone do Font-awesome a ser adicionado ao botão. Caso seja um texto de um option do select, passar
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function botao(icon, title, tpo, opcoes) {
    
    var tipo = tpo || 1;
    
    var icone = icon || '';

    var titulo = title;

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
    
    this.getButton = function() {
        return btn;
    };
    
    this.getValue = function() {
        if ( tipo == 2 ) {
            return this.getButton().value;
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
    
}
function documentoEditor( textid ) {
    
    this.textarea = document.getElementById(textid);
    var editBox = $("<iframe contenteditable='true' class='editorDocumento' id='" + 't' + textid + "'></iframe>");

    var $this = this;
    $('#btn-ligar').click(function() {
        $this.frame = $this.getIframeDocument('t' + textid);
        $this.permitirEdicao();
    });

    editBox.insertAfter($(this.textarea));
    this.textarea.style.display = "none";
    
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

    $(this.getIframe('t' + textid)).on('keydown keypress select focus change blur click submit', function() {
        $this.setValue();
    });
    
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
            var a = document.createElement('div');
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
    
    
}

function editor(textid) {

    var documento = new documentoEditor(textid);
    documento.permitirEdicao(); 
    var botoes = new barraBotoes( documento, textid );
    
    this.executar = new acao(documento);
    
    var btnAtivacao = [];
    
    var verificarBotoes = function() {
        for (i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    };                        
    
    this.obterDocumento = function() {
        return documento;
    };

    this.adicionarBotaoVerificacao = function(botao, acao) {
        btnAtivacao.push({botao: botao, acao: acao});
        verificarBotoes();
    };
    
    var $this = this;
    
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
        {texto: 'Azul', valor: "#2196F3"}, 
        {texto: 'Vermelho', valor: "#F44336"}
    ];
    var btnCor = new botao("Fonte",'', 2, cores);
    $this.adicionarBotaoVerificacao(btnCor, 'forecolor');
    btnCor.getButton().onclick = function() {   
        documento.formatar('forecolor', btnCor.getValue());
    };

    var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
    var btnFont = new botao("Fonte",'', 2, fonts);
    $this.adicionarBotaoVerificacao(btnFont, 'fontname');
    btnFont.getButton().onclick = function() {
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
   var buttonGroup1 = new grupoBotoes();
   buttonGroup1.adicionarBotao(btnFont);
   buttonGroup1.adicionarBotao(btnCor);

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

   var btnGrpCst = new grupoBotoes();

   this.addPersonalizacao = function(personalizacao) {
        btnGrpCst.adicionarBotao(personalizacao.ac.btn);
   };

   botoes.adicionarGrupo(btnGrpCst.getGroup());

    $(documento.frame).on('keypress focus change click select', function() {
        for (i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    });
}
function grupoBotoes() {
    
    var btngrp = document.createElement('div');
    btngrp.className = "editorGroupButton";
    
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
function personalizacaoEditor( documento ) {
    
    this.ac = new acao( documento );

     this.definirIcone = function(icone) {
        this.ac.btn.definirIcone(icone);
    };
}

