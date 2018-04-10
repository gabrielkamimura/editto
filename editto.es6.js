class eDittoButton extends HTMLElement {
    static get observedAttributes() {return ['w', 'l']; }
    
    constructor(textarea, buttonBarTemplate) {
        super();
        this.shadow = this.createShadowRoot();
        this.buttomDOM = document.createElement('button');
        this.buttomDOM.innerHTML = "Botão"
        var style = document.createElement('style');
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.buttomDOM);
        this.eDitto = this.parentNode.parentNode.parentNode;
        
        this.buttomDOM.onclick = function() {
            console.log("Clicou", this.eDitto);
        }
    }
    
    connectedCallback() {
      }

      disconnectedCallback() {
      }

      adoptedCallback() {
      }
}

customElements.define('editto-button', eDittoButton);

class eDittoButtonGroup extends HTMLElement {
    static get observedAttributes() {return ['w', 'l']; }
    
    constructor(textarea, buttonBarTemplate) {
        super();
        this.shadow = this.createShadowRoot();
        this.div = document.createElement('div');
        var style = document.createElement('style');
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.div);
    }
    
    connectedCallback() {
      }

      disconnectedCallback() {
      }

      adoptedCallback() {
      }
}

customElements.define('editto-button-group', eDittoButtonGroup);

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
        console.log(this.innerHTML);
        var buttons = this.querySelectorAll('button');
        console.log(buttons);
        var that = this;
        for (let i = 0; i < (buttons.length); i++) {
            buttons[i].onclick = function() {
                console.log(that);
                console.log("Foi")
            }
        }
    }
    
    connectedCallback() {
        console.log('Custom element added to page.');
      }

      disconnectedCallback() {
        console.log('Custom element removed from page.');
      }

      adoptedCallback() {
        console.log('Custom element moved to new page.');
      }
    
    get iframeDocument() {
        
    }
    
    // Buttons and button groups will be inserted as HTML templates
    
    get eDittoButtonGroups() {
        
    }
    
    getValue() {
        
    }
    
    setValue(valor) {
        
    }
    
    getSelection() {
        
    }
    
    getSelectionRange() {
        
    }
    
    getSelectedText() {
        
    }
    
    getSelectedHTML() {
        
    }
    
    allowEdition() {
        
    }
    
    disallowEdition() {
        
    }
    
    syncContent() {
        
    }
    
    syncFromTextarea() {
        
    }
    
    startAutoSync() {
        
    }
    
    stopAutoSync() {
        
    }
    
    format(formato, valor) {
        console.log(this)
    }
    
    insertElement(elem) {
        
    }
    
    insertHTML(htmlText, options) {
        
    }
    
    insertText(text, options) {
        
    }
    
    insertFromTemplate(template, options) {
        
    }
    
    checkFormat(format) {
        
    }
    
    setBold() {
        
    }
    
    setItalic() {
        
    }
    
    setUnderline() {
        
    }
    
    
}

customElements.define('editto-editor', eDitto);