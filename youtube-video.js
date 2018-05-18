class YoutubeVideo extends HTMLElement {
    
    static get observedAttributes() {return ['src']; }
    
    constructor() {
        super();
        let shadow = this.attachShadow({mode: 'open'});
        this._inputUrl = document.createElement('input');
        this._iframe = document.createElement('iframe');
        
        this._inputUrl.addEventListener('change', (event) => {
            this._updateAttributes();
        });
        
        shadow.append(this._inputUrl);
        shadow.append(this._iframe);
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
        console.log(this.src)
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
        this._updateVideo();
    }
    
    _updateVideo() {
        this._iframe.src = this._embedUrl;
    }
    
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'src') {
            this._updateVideo();
        }
    }
}
if (window.customElements) {
    customElements.define('youtube-video', YoutubeVideo);
}

class YoutubeVideoView {
    template(model) {
        return `
            <style>
            </style>
            <div>
                <label>Video url</label>
                <input />
            </div>
            <iframe src='model._embedUrl'></iframe>
        `
    }
    
    update() {
        
    }
}