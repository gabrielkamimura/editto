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
                $this.classList.remove('editto-button-bar--lost-focus');
                $this.classList.add('editto-button-bar--focus');
            });
            
            this.eDitto.addEventListener('blur', () => {
                $this.classList.remove('editto-button-bar--focus');
                $this.classList.add('editto-button-bar--lost-focus');
                setTimeout(e => $this.classList.remove('editto-button-bar--lost-focus'), 1000);
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

customElements.define('editto-button-bar', eDittoButtonBar);
