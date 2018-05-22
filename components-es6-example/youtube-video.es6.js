class YoutubeVideo extends HTMLElement {
    
    static get observedAttributes() {return ['src']; }
    
    constructor() {
        super();
        let shadow = this.attachShadow({mode: 'open'});
        
        
        this._updateView = () => {
            shadow.innerHTML = this._template();
            if (!shadow.querySelector) {
                shadow.querySelector = shadow.host.querySelector;
            }
            this._inputUrl = shadow.querySelector('#fsrc');
            this._iframe = shadow.querySelector('#youtubeiframe');

            if (this._inputUrl) {
                this._inputUrl.addEventListener('change', (event) => {
                    this._updateAttributes();
                });
            }
        };
        this._updateView();
    }
    
    _template() {
        return `
            <style>
                #fsrc {
                    width: 100%;
                    border: none;
                }
            </style>
            ${!this.src ? `
                <div>
                    <input value="${this.src || ''}" type="text" id="fsrc" placeholder="Insira o endereço do seu vídeo"/>
                </div>
            ` : ''}
            
            ${this._embedUrl ? `
                <iframe src="${this._embedUrl}" id="youtubeiframe"></iframe>
            ` : ''}
            
        `;
    }
    
    get src() {
        return this.getAttribute('src');
    }
    
    set src(newUrl) {
        if (newUrl) {
          this.setAttribute('src', newUrl);
        } else {
          this.removeAttribute('src');
        }
    }
    
    get _embedUrl() {
        try {
            var regex = /(\?v=|\&v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/;
            var regexyoutubeurl = this.src.match(regex);
            var src = "https://www.youtube.com/embed/" + regexyoutubeurl[2];
            return src;
        } catch(error) {
            return null;
        }
    }
    
    _updateAttributes() {
        this.src = this._inputUrl.value;
        this._updateView();
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'src') {
            this._updateView();
        }
    }
}
if (window.customElements) {
    customElements.define('youtube-video', YoutubeVideo);
}