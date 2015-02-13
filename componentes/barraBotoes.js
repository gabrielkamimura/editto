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
    var btnNegrito = new botao("bold");
    btnNegrito.getButton().onclick = function() {
        btnAtivacao.push({botao: btnNegrito, acao: 'bold'});
        documento.formatar('bold');
        btnNegrito.verificaAtivacao(documento, 'bold');
    };
    
    var btnItalico = new botao("italic");
    btnAtivacao.push({botao: btnItalico, acao: 'italic'});
    btnItalico.getButton().onclick = function() {
        documento.formatar('italic');
    };
    
    var btnUnderline = new botao('underline'); 
    btnAtivacao.push({botao: btnUnderline, acao: 'underline'});
    btnUnderline.getButton().onclick = function() {
        documento.formatar('underline');
    };
    
    var cores = [{texto: 'Azul', valor: "#2196F3"}, {texto: 'Vermelho', valor: "#F44336"}];
    var btnCor = new botao("Fonte", 2, cores);
    btnAtivacao.push({botao: btnCor, acao: 'forecolor'});
    btnCor.getButton().onclick = function() {   
        documento.formatar('forecolor', btnCor.getValue());
    };
    
    var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
    var btnFont = new botao("Fonte", 2, fonts);
    btnAtivacao.push({botao: btnFont, acao: 'fontname'});
    btnFont.getButton().onclick = function() {
        documento.formatar('fontname', btnFont.getValue());
    };
    
    var btnEsquerda = new botao('align-left');
    btnAtivacao.push({botao: btnEsquerda, acao: 'justifyleft'});
    btnEsquerda.getButton().onclick = function() {
        documento.formatar('justifyleft');
    };
    
    
    var btnCentraliza = new botao('align-center');
    btnAtivacao.push({botao: btnCentraliza, acao: 'justifycenter'});
    btnCentraliza.getButton().onclick = function() {
        documento.formatar('justifycenter');
    };
    
    var btnDireita= new botao('align-right');
    btnAtivacao.push({botao: btnDireita, acao: 'justifyright'});
    btnDireita.getButton().onclick = function() {
        documento.formatar('justifyright');
    };
   
 /**
  * Grupos dos botões. Forma como eles são organizados
  */  
   var buttonGroup1 = new grupoBotoes();
   buttonGroup1.adicionarBotao(btnFont);
   buttonGroup1.adicionarBotao(btnCor);
   
   var buttonGroup2 = new grupoBotoes();
   buttonGroup2.adicionarBotao(btnNegrito);
   buttonGroup2.adicionarBotao(btnItalico);   
   buttonGroup2.adicionarBotao(btnUnderline);
   
   var buttonGroup3 = new grupoBotoes();
   buttonGroup3.adicionarBotao(btnEsquerda);
   buttonGroup3.adicionarBotao(btnCentraliza);
   buttonGroup3.adicionarBotao(btnDireita);
   
   this.adicionarGrupo(buttonGroup1.getGroup());
   this.adicionarGrupo(buttonGroup2.getGroup());
   this.adicionarGrupo(buttonGroup3.getGroup());
    
    
    $(documento.frame).on('keypress change blur click select', function() {
        for (i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    });
}