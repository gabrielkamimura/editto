class eDitto extends HTMLElement {
    static get observedAttributes() {return ['w', 'l']; }
    
    constructor() {
        super();
//        this._shadow = this.attachShadow( {mode: 'closed'} );
        
//        this._shadow.appendChild(this._contentBox);
        let initialContent = this.innerHTML;
        
        this.allowEdition();
        this._lastSelection = null;// Save the old selection when blur
        
        let $this = this;
        this.addEventListener('focus', (event) => {
            $this._interval = setInterval(() => {
                $this._lastSelection = $this.selection || $this._lastSelection;
            }, 100);   
        });
        this.addEventListener('blur', (event) => {
            clearInterval($this._interval);
        });
    }
        
    /**
     * Get the HTML content of editor
     * @returns {string} 
     */
    get value() {
        return this.innerHTML;
    }
    
    /**
     * Set a new value to the editor, changing its content
     */
    set value(newValue) {
        while (newValue.indexOf('<script>') != -1) {
            newValue = newValue.replace('<script>', '&ltscript&gt');
        }
        while (newValue.indexOf('</script>') != -1) {
            newValue = newValue.replace('</script>', '&lt/script&gt');
        }
        this.innerHTML = newValue;
    }
    
    get numberCharacters () {
        return eDittoHelpers.countCharacters(this.textContent);
    }
    
    /**
     * Get the selection of editor
     * @returns {Selection}
     */
    get selection() {
        let txt = null;
        
        if (this === document.activeElement) {
            if (document.getSelection) {
                txt = document.getSelection();
            } else if (document.getSelection()) {
                txt = document.getSelection();
            } else if (document.selection) {
                txt = document.selection.createRange().text;
            }
        } else {
            //Vamos tentar recuperar a seleção anteriormente feita
            if (this._lastSelection) {
                txt = this._lastSelection;
            }
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
    
    isEditable() {
        return this.isContentEditable;
    }
    
    /**
     * Allow content edition for user
     */
    allowEdition() {
        this.contentEditable = true;
    }
    
    /**
     * Disallow content edition for users
     */
    disallowEdition() {
        this.contentEditable = false;
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
        this.focus();
        // A way to clean the format if a user select two times the same action to be performed
        if (value && this.checkFormat(name, value)) {
            document.execCommand("removeFormat", false, name);
        } else {
            document.execCommand(name, null, value)
            
        }
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
        
        this.focus();
        let div = document.createElement("div");
        div.innerHTML = elem; // For firefox to work with custom web components, we have to create an element here. It doesnt work with execcommand propertly
        this.selectionRange.collapse(false);
        this.selectionRange.insertNode(div);
//        document.execCommand('insertHTML', false, div.innerHTML);
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
    checkFormat(format, value) {
        if (value) {
            return document.queryCommandValue(format) == value;
        }
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
        
        this.addEventListener('mousedown', (event) => {
            event.preventDefault();
        })
    }
    
    setButtonAction(button) {
        let that = this,
            action = button.dataset.edittoFormat,
            value = button.dataset.edittoFormatValue || null;
        
        if (action) {
            button.addEventListener('click', () => {
                this.blur();
                that.eDitto.format(action, value);
            });
        }
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'editto') {
            this.eDitto = document.getElementById(newVal);
            let $this = this;
            this.eDitto.addEventListener('focus', () => {
                $this.classList.add('editto-button-bar__editor-focus')
            });
            
            this.eDitto.addEventListener('blur', () => {
                $this.classList.remove('editto-button-bar__editor-focus')
            });
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
    
    },
    
    /**
     * Check if a certain element is inside en editto and is editable
     */
    elementIsInEditto: (el) => {
        
    }
}