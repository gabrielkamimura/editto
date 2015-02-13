function documentoEditor( textid ) {
    
    this.textarea = document.getElementById(textid);
    var editBox = $("<iframe class='editorDocumento' id='" + 't' + textid + "'></iframe>");
    editBox.insertAfter($(this.textarea));
    this.textarea.style.display = "none";
    
    /**
     * 
     * @description Função que retorna o document do iframe desejado
     * @param {int} aID ID do Iframe que se deseja
     * @returns {Node.frames.document|document.frames.document|HTMLDocument.frames.document|Document.frames.document|Element.contentDocument}
     */
    this.getIframeDocument = function(aID) {
      // se contentDocument existe
      if (document.getElementById(aID).contentDocument){
        return document.getElementById(aID).contentDocument;
      } else {
        // IE
        return document.frames[aID].document;
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
    
    
    /**
     * 
     * @description Função que retorna a seleção 
     * @returns {txt@pro;frame@call;getSelection|txt@pro;frame@pro;selection@call;createRange@pro;text|txt}
     */
    this.getSelectedText = function() {
        if (this.frame.getSelection) {
            txt = this.frame.getSelection();
        } else if (this.frame.getSelection) {
            txt = this.frame.getSelection();
        } else if (this.frame.selection) {
            txt = this.frame.selection.createRange().text;
        }
        return txt;  
    };
    
    this.frame = this.getIframeDocument('t' + textid);
    console.log(this.frame);
    this.getValue();
    this.frame.designMode = 'on';
    console.log(this.frame);
    
    var $this = this;
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
            var range = this.getSelectedText.getRangeAt(0);
            range.surroundContents(elem);
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
