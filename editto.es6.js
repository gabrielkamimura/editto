class eDitto extends HTMLElement {
    static get observedAttributes() {return ['w', 'l']; }
    
    constructor(textarea, buttonBarTemplate) {
        super();
        this.shadow = this.attachShadow( {mode: 'open'} );
        this.textarea = textarea;
        this.iframe = document.createElement('iframe');
        var style = document.createElement('style');
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.iframe);
        var that = this;
        this.allowEdition();
    }
    
    connectedCallback() {
      }

      disconnectedCallback() {
        console.log('Custom element removed from page.');
      }

      adoptedCallback() {
        console.log('Custom element moved to new page.');
      }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log("Atribute change")
        if (attrName == 'value') {
        }
    }
    
    get iframeDocument() {
        if (this.iframe) {
            return this.iframe.contentWindow.document;

        } else {
        // se contentDocument existe
          if (this.iframe.contentDocument) {
            return this.iframe.contentDocument;
          } else {
            if (this.iframe.document) {
                // IE
                return this.iframe.document;
            }
            else {
                return null;
            };
          }
        }
    }
    
    // Buttons and button groups will be inserted as HTML templates
    
    get eDittoButtonGroups() {
        
    }
    
    get value() {
        return this.innerHTML = this.iframeDocument.body.innerHTML
    }
    
    set value(newValue) {
        this.iframeDocument.body.innerHTML = newValue;
    }
    
    get selection() {
        let txt = null;
        if (this.iframeDocument.getSelection) {
            txt = this.iframeDocument.getSelection();
        } else if (this.iframeDocument.getSelection()) {
            txt = this.iframeDocument.getSelection();
        } else if (this.iframeDocument.selection) {
            txt = this.iframeDocument.selection.createRange().text;
        }
        return txt;
    }
    
    get selectionRange() {
        let range = null;
        if (this.selection.getRangeAt) {
          range = this.selection.getRangeAt(0);
        } else {
          range = document.createRange();
          range.setStart (userSelection.anchorNode, userSelection.anchorOffset);
          range.setEnd (userSelection.focusNode, userSelection.focusOffset);
        }

        return range;
    }
    
    get selectedText() {
        let textoSelecionado = null;
        try {
            textoSelecionado = this.selection.toString();
        } 
        catch(error) {
        
        }

        return textoSelecionado.length > 0 ? textoSelecionado : null;
    }
    
    get selectedHTML() {
        let elementoSelecionado = null;
        try {
            let range = this.selectionRange.cloneContents(),
                tmp = document.createElement('div');
                tmp.appendChild(range);

            elementoSelecionado = tmp.innerHTML;
        } 
        catch(error) {
        
        }

        return elementoSelecionado.length > 0 ? elementoSelecionado : null;
    }
    
    allowEdition() {
        this.syncFromsyncFromInnerHTML();
        this.iframeDocument.designMode = 'On';
    }
    
    disallowEdition() {
        
    }
    
    syncContent() {
        
    }
    
    syncFromsyncFromInnerHTML() {
        this.value = this.innerHTML;
    }
    
    startAutoSync() {
        
    }
    
    stopAutoSync() {
        
    }
    
    format(name, value = null) {
        this.iframe.focus();
        this.iframeDocument.execCommand(name, false, value);
        this.iframe.focus();
    }
    
    insertElement(elem, options) {
        if (this.selection) {
            let a = this.iframeDocument.createElement('div');
            let range = this.selectionRange;
            range.surroundContents(a);
            if (options) {
                for (let i in options) {
                    let aux = "{{ " + i + " }}";
                    elem = eDittoHelpers.replaceAll(elem, aux, eDittoHelpers.escapeHTML(options[i]));
                };
            }
            a.innerHTML = elem;
        };
    }
    
    insertHTML(htmlText, options) {
        let text = txt + '<br/>'; //A quebra de linha é para evitar que o documento após a personalização fique inalterável
        this.insertElement(text, options);
    }
    
    insertText(text) {
        this.insertElement(eDittoHelpers.escapeHTML(text));
    }
    
    insertFromTemplate(template, options) {
        let xhttp = new XMLHttpRequest();
        let $this = this;

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                let text = this.responseText + '<br/>';

                $this.insertElement(text, options);
            }   
        };

        xhttp.open("GET", template, true);
        xhttp.send();
    }
    
    checkFormat(format) {
        
    }
    
    toggleBold() {
        this.format('bold');
    }
    
    toggleItalic() {
        this.format('italic');
    }
    
    toggleUnderline() {
        this.format('underline');
    }
    
    
}

class eDittoButtonBar extends HTMLElement {
    static get observedAttributes() {return ['editto']; }
    
    constructor() {
        super();
        var buttons = this.querySelectorAll('button');
        var that  = this;
        for (let i = 0; i < (buttons.length); i++) {
            this.setButtonAction(buttons[i])
        }
        
    }
    
    setButtonAction(button) {
        let that = this,
            action = button.dataset.edittoFormat,
            value = null;
        if (action) {
            button.onclick = function() {
                that.eDitto.format(action, value);
            }
        }
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log("Atribute change")
        if (attrName == 'editto') {
            this.eDitto = document.getElementById(newVal);  
        }
    }
    
    
}

customElements.define('editto-editor', eDitto);
customElements.define('editto-button-bar', eDittoButtonBar);

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
                return location.substring(location.indexOf('dist'), 0);
            }
        }
      return false;
    },
    
    /**
     * Recebe uma string e um determinado caractere a ser alterado e retorna string com caracteres alterados
     * @param  {string} string   A string a sofrer alteração
     * @param  {string} token    Texto a ser buscado na string para modufucação
     * @param  {string} newtoken Texto a reposicionar token
     * @return {string}
     */
    replaceAll: function(string, token, newtoken) {
        var string = string || "";
        while (string.indexOf(token) != -1) {
          string = string.replace(token, newtoken);
        }
        return string;
    },
        
    escapeHTML: function(string = '') {
        string = this.replaceAll(this.replaceAll(string, "<", "&lt"), ">", "&gt");
        return string;
    }
}