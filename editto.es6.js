class eDitto extends HTMLElement {
    static get observedAttributes() {return ['w', 'l']; }
    
    constructor() {
        super();
//        this._shadow = this.attachShadow( {mode: 'closed'} );
        
//        this._shadow.appendChild(this._contentBox);
        console.log(this.innerHTML)
        let initialContent = this.innerHTML;
        this.innerHTML = "";
        
        
        this._contentBox = document.createElement('article');
        this._contentBox.className = "editto-document"
        
        this.appendChild(this._contentBox);
        this.allowEdition();
        this.value = initialContent;
    }
        
    /**
     * Get the HTML content of editor
     * @returns {string} 
     */
    get value() {
        return this._contentBox.innerHTML;
    }
    
    /**
     * Set a new value to the editor, changing its content
     */
    set value(newValue) {    
        this._contentBox.innerHTML = newValue;
    }
    
    get numberCharacters () {
        return eDittoHelpers.countCharacters(this._contentBox.textContent);
    }
    
    /**
     * Get the selection of editor
     * @returns {Selection}
     */
    get selection() {
        let txt = null;
        if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.getSelection()) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        }
        return txt;
    }
    
    /**
     * Get the range of the current selection
     * @returns {Range} 
     */
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
    
    /**
     * Get the current selection in text format
     * @returns {string}
     */
    get selectedText() {
        let textoSelecionado = null;
        try {
            textoSelecionado = this.selection.toString();
        } 
        catch(error) {
        
        }

        return textoSelecionado.length > 0 ? textoSelecionado : null;
    }
    
    /**
     * Get the current selection with HTML tags
     * @returns {string}
     */
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
    
    /**
     * Allow content edition for user
     */
    allowEdition() {
        this.syncFromsyncFromInnerHTML();
        this._contentBox.contentEditable = true;
    }
    
    /**
     * Disallow content edition for users
     */
    disallowEdition() {
        
    }
    
    /**
     * Copy the content from innerHTML to the value of editor
     */
    syncFromsyncFromInnerHTML() {
        this.value = this.innerHTML;
    }
    
    /**
     * Synch editor's innerHTML to editor's value
     */
    startAutoSync() {
        
    }
    
    /**
     * Stop synch. Only the value property will return the current editor's value
     */
    stopAutoSync() {
        
    }
    
    /**
     * Format the document givven some properties
     * @param {String} name Property name eg:bold,italic,underline
     * @param {String} value Optional property that change value for some format names
     */
    format(name, value = null) {
        this._contentBox.focus();
        document.execCommand(name, null, value)
//        this.insertElement('<b>' + this.selectedText + '</b>');
    }
    
    /**
     * Insert an element to the current position
     * @param {string} elem
     * @param {object} options. Opções para templatização do conteúdo. Formato: {variable: value}
     */
    insertElement(elem, options) {
            
            if (options) {
                for (let i in options) {
                    let aux = "{{ " + i + " }}";
                    elem = eDittoHelpers.replaceAll(elem, aux, eDittoHelpers.escapeHTML(options[i]));
                };
            }
            document.execCommand('insertHTML', false, elem);
    }
    
    /**
     * Insert an element to the current position
     * @param {string} elem
     * @param {object} options. Opções para templatização do conteúdo. Formato: {variable: value}
     */
    insertText(text) {
        this.insertElement(eDittoHelpers.escapeHTML(text));
    }
    
    /**
     * Insert an element from a template
     * @param {string} template
     * @param {object} options. Opções para templatização do conteúdo. Formato: {variable: value}
     */
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
    
    /**
     * Check if the selected content is formatted with some text format
     */
    checkFormat(format) {
        return (document.queryCommandState(format));
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
    
    querySelector(text) {
        //return this.iframeDocument.querySelector(text);
    }
}

class eDittoButtonBar extends HTMLElement {
    static get observedAttributes() {return ['editto']; }
    
    constructor() {
        super();
        this.buttons = this.querySelectorAll('button');
        var that  = this;
        for (let i = 0; i < (this.buttons.length); i++) {
            this.setButtonAction(this.buttons[i])
        }
        this.startButtonsCheck();
        
    }
    
    setButtonAction(button) {
        let that = this,
            action = button.dataset.edittoFormat,
            value = null;
        if (action) {
            button.onclick = function() {
                this.blur();
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
    
    startButtonsCheck() {
        let $this = this;
        let interval = setInterval(function() {
            $this.checkButtonsFormat();
        }, 500);
    }
    
    checkButtonsFormat() {
        for (let i = 0; i < (this.buttons.length); i++) {
            this.checkButtomFormat(this.buttons[i]);
        }
    }
    
    /**
     * Check a format for a specific button
     */
    checkButtomFormat(button) {
        let action = button.dataset.edittoFormat,
            that = this,
            value = null;
        if (action) {
            if (that.eDitto.checkFormat(action)) {
                button.classList.add("edito-button__active");
                return that.eDitto.checkFormat(action);
            }
        }
        button.classList.remove("edito-button__active");
        return false;
    }
    
    
}

if (window.customElements) {
    customElements.define('editto-editor', eDitto);
    customElements.define('editto-button-bar', eDittoButtonBar);
} else {
    if (document.registerElement) {
        customElements.define('editto-editor', eDitto);
        document.registerElement('editto-button-bar', eDittoButtonBar);
    }
    else {
        console.error("E-Ditto doesn't support your current browser");
    }
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
    },
    
    countCharacters: function(text) {
        let count = 0;
        for (let i in text) {
            if (text[i] != ' ') {
                count++
            }   
        }
        
        return count;
    },
    
    countWords: function() {
    
    }
}