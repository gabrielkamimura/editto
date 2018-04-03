class eDitto {
    
    constructor(textarea, buttonBarTemplate) {
        this.textarea = textarea;
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

let elem = document.createElement('textarea');
let abc = new eDitto(elem);

console.log(abc);