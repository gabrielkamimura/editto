function editor(textid) {

    var documento = new documentoEditor(textid);
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
    
    var btnNegrito = new botao("bold", "Negrito");
    btnNegrito.getButton().onclick = function() {
        $this.adicionarBotaoVerificacao(btnNegrito, 'bold');
        documento.formatar('bold');
        verificarBotoes();
    };

    var btnItalico = new botao("italic", "Itálico");
    btnAtivacao.push({botao: btnItalico, acao: 'italic'});
    btnItalico.getButton().onclick = function() {
        documento.formatar('italic');
        verificarBotoes();
    };

    var btnUnderline = new botao('underline', "Sublinhado"); 
    $this.adicionarBotaoVerificacao(btnUnderline, 'underline');
    btnUnderline.getButton().onclick = function() {
        documento.formatar('underline');
        verificarBotoes();
    };

    var cores = [
        {texto: 'Preto', valor: "#000"},
        {texto: 'Azul', valor: "#2196F3"}, 
        {texto: 'Vermelho', valor: "#F44336"}
    ];
    var btnCor = new botao("Fonte",'', 2, cores);
    $this.adicionarBotaoVerificacao(btnCor, 'forecolor');
    btnCor.getButton().onclick = function() {   
        documento.formatar('forecolor', btnCor.getValue());
    };

    var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
    var btnFont = new botao("Fonte",'', 2, fonts);
    $this.adicionarBotaoVerificacao(btnFont, 'fontname');
    btnFont.getButton().onclick = function() {
        documento.formatar('fontname', btnFont.getValue());
    };

    var btnEsquerda = new botao('align-left', "Alinhar à Esquerda");
    $this.adicionarBotaoVerificacao(btnEsquerda, 'justifyleft');
    btnEsquerda.getButton().onclick = function() {
        documento.formatar('justifyleft');
        verificarBotoes();
    };


    var btnCentraliza = new botao('align-center', "Centralizar");
    $this.adicionarBotaoVerificacao(btnCentraliza, 'justifycenter');
    btnCentraliza.getButton().onclick = function() {
        documento.formatar('justifycenter');
        verificarBotoes();
    };

    var btnDireita = new botao('align-right', "Alinhar à direita");
    $this.adicionarBotaoVerificacao(btnDireita, 'justifyright');
    btnDireita.getButton().onclick = function() {
        documento.formatar('justifyright');
        verificarBotoes();
    };

    var btnNum = new botao('list-ol', "Lista Numérica");
    $this.adicionarBotaoVerificacao(btnNum, 'insertorderedlist');
    btnNum.getButton().onclick = function() {
      documento.formatar('insertorderedlist');
      verificarBotoes();
    };

    var btnLst = new botao('list-ul', "Lista");
    $this.adicionarBotaoVerificacao(btnLst, 'insertunorderedlist');
    btnLst.getButton().onclick = function() {
      documento.formatar('insertunorderedlist');
      verificarBotoes();
    };

    var btnLnk = new botao('link', "link");
    btnLnk.getButton().onclick = function() {
        var sLnk = prompt('Digite a URL do link: ', 'http:\/\/');
        if (sLnk && sLnk != '' && sLnk != 'http://') {
            documento.formatar('createlink', sLnk);
        };
    };

    var btnUlk = new botao('unlink', "Remover Link");
    btnUlk.getButton().onclick = function() {
      documento.formatar('unlink');
    }

    var btnLmp = new botao('eraser', "Limpar Formatação");
    btnLmp.getButton().onclick = function() {
      documento.formatar('removeFormat');
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

   var buttonGroup4 = new grupoBotoes();
   buttonGroup4.adicionarBotao(btnNum);
   buttonGroup4.adicionarBotao(btnLst);

   var buttonGroup5 = new grupoBotoes();
   buttonGroup5.adicionarBotao(btnLnk);
   buttonGroup5.adicionarBotao(btnUlk);
   buttonGroup5.adicionarBotao(btnLmp);

   botoes.adicionarGrupo(buttonGroup1.getGroup());
   botoes.adicionarGrupo(buttonGroup2.getGroup());
   botoes.adicionarGrupo(buttonGroup3.getGroup());
   botoes.adicionarGrupo(buttonGroup4.getGroup());
   botoes.adicionarGrupo(buttonGroup5.getGroup());


   /*
      Esta parte é para a definição das personalizações
   */

   var btnGrpCst = new grupoBotoes();

   this.addPersonalizacao = function(personalizacao) {
        btnGrpCst.adicionarBotao(personalizacao.ac.btn);
   };

   botoes.adicionarGrupo(btnGrpCst.getGroup());

    $(documento.frame).on('keypress focus change click select', function() {
        for (i in btnAtivacao) {
            btnAtivacao[i].botao.verificaAtivacao(documento, btnAtivacao[i].acao);
        };
    });
}