function editor(textid) {
    var documento = new documentoEditor(textid);
    teste = documento;
    documento.permitirEdicao(); 
    var botoes = new barraBotoes( documento, textid );
    
    this.executar = new acao(documento);
    
    var btnAtivacao = [];
    
    var verificarBotoes = function() {
        for (i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    };                        
    
    this.obterDocumento = function() {
        return documento;
    };

    this.adicionarBotaoVerificacao = function(botao, acao) {
        btnAtivacao.push({botao: botao, acao: acao});
        verificarBotoes();
    };
    
    var $this = this;
    
    var btnNegrito = new botao("bold");
    btnNegrito.getButton().onclick = function() {
        $this.adicionarBotaoVerificacao(btnNegrito, 'bold');
        documento.formatar('bold');
        btnNegrito.verificaAtivacao(documento, 'bold');
    };

    var btnItalico = new botao("italic");
    btnAtivacao.push({botao: btnItalico, acao: 'italic'});
    btnItalico.getButton().onclick = function() {
        documento.formatar('italic');
    };

    var btnUnderline = new botao('underline'); 
    $this.adicionarBotaoVerificacao(btnUnderline, 'underline');
    btnUnderline.getButton().onclick = function() {
        documento.formatar('underline');
    };

    var cores = [{texto: 'Azul', valor: "#2196F3"}, {texto: 'Vermelho', valor: "#F44336"}];
    var btnCor = new botao("Fonte", 2, cores);
    $this.adicionarBotaoVerificacao(btnCor, 'forecolor');
    btnCor.getButton().onclick = function() {   
        documento.formatar('forecolor', btnCor.getValue());
    };

    var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
    var btnFont = new botao("Fonte", 2, fonts);
    $this.adicionarBotaoVerificacao(btnFont, 'fontname');
    btnFont.getButton().onclick = function() {
        documento.formatar('fontname', btnFont.getValue());
    };

    var btnEsquerda = new botao('align-left');
    $this.adicionarBotaoVerificacao(btnEsquerda, 'justifyleft');
    btnEsquerda.getButton().onclick = function() {
        documento.formatar('justifyleft');
    };


    var btnCentraliza = new botao('align-center');
    $this.adicionarBotaoVerificacao(btnCentraliza, 'justifycenter');
    btnCentraliza.getButton().onclick = function() {
        documento.formatar('justifycenter');
    };

    var btnDireita= new botao('align-right');
    $this.adicionarBotaoVerificacao(btnDireita, 'justifyright');
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

   botoes.adicionarGrupo(buttonGroup1.getGroup());
   botoes.adicionarGrupo(buttonGroup2.getGroup());
   botoes.adicionarGrupo(buttonGroup3.getGroup());


   /*
      Esta parte é para a definição das personalizações
   */

   var btnGrpCst = new grupoBotoes();

   this.addPersonalizacao = function(personalizacao) {
    console.log(personalizacao);
        btnGrpCst.adicionarBotao(personalizacao.ac.btn);
   };

   botoes.adicionarGrupo(btnGrpCst.getGroup());

    $(documento.frame).on('keypress focus change click select', function() {
        for (i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    });
}