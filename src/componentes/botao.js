/**
 * @param {string} icn Ícone do Font-awesome a ser adicionado ao botão. Caso seja um texto de um option do select, passar
 * @param {int} tpo Tipo do botão. Se for um botão, 1 (padrão), caso seja um select, 2
 * @param {array} opcoes [{ texto: 'azul', valor: #2196F3 }] Apenas para select
 * */
function eDittoButton(grupoBotoes, icon, title, tpo, opcoes) {

    var tipo = tpo || 1,
        icone = icon || '',
        titulo = title,
        grupoBotoes = grupoBotoes;

    /**
     * Obtém o grupo de botões a que pertence esse botão
     * @return {Object}
     */
    this.obterGrupoBotoes = function() {
        return grupoBotoes;
    };

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

    /**
     * Verifica se ação do botão atual está ativa no ponto do documento selecionado
     * @param  {object} documento
     * @param  {string} formato
     * @return {undefined}
     */
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

    /**
     * Marca botão como ativo
     * @return {undefined}
     */
    this.marcarBotao = function( ) {
        btn.className = 'editorButton ativo';
    };

    /**
     * Marca botão como desativo (retira botão marcado como utilizado)
     * @return {undefined}
     */
    this.desmarcarBotao = function() {
        btn.className = 'editorButton';
    };

    /**
     * Obtém o elemento button criado a partir do document.createElement()
     * @return {[type]} [description]
     */
    this.getButtonDOM = function() {
        return btn;
    };

    /**
     * Obtém o valor no button criado a partir do document.createElement()
     * @return {[type]} [description]
     */
    this.getValue = function() {
        if ( tipo == 2 ) {
            return this.getButtonDOM().value;
        }
        else {
            return null;
        };
    };

    /**
     * Define o ícone a ser utilizado por esse botão
     * @param  {string} ricon Nome do ícone
     * @return {undefined}
     */
    this.definirIcone = function(ricon) {
        icn.className = "fa fa-" + ricon;
    };

    // Adicionando botão criado a grupo definido
    grupoBotoes.adicionarBotao(this);

}
