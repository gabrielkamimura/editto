function barraBotoes(documento, textid) {
    
    var btnAtivacao = []; //Array dos botões a terem as ações monitoradass para a marcação do botão
    var documento = documento;
    var divBtn = $("<div id='b" + textid + "' class='editorBotoes'></div>");
    
    divBtn.insertBefore($(documento.textarea));
    
    var container = document.getElementById('b' + textid);
    
    /**
     * 
     * @description Função para adicionar um grupo de botões à barra de botões
     * @param {grupoBotoes} grupo
     * @returns {undefined}
     */
    this.adicionarGrupo = function(grupo){
        container.appendChild(grupo);
    };
    
/*
 * Botões e ações ao clicá-los
 */    
   
}