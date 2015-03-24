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