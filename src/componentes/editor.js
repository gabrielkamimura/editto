function eDitto(textid) {

    var documento = new eDittoDocument(textid, this),
        botoes = new eDittoButtonBar(documento, textid),
        btnAtivacao = [];
        
    //Permitindo edição do documento
    documento.permitirEdicao();

    /**
     * Obtém a Barra de botões desse Editor
     * @return {object} eDittoButtonBar
     */
    this.obterBarraBotoes = function() {
        return botoes;
    };

    /**
     * Obtém o documento que esse editor manipula
     * @return {object} eDittoDocument
     */
    this.obterDocumento = function() {
        return documento;
    };

    var $this = this;
    /*
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
        {texto: 'Cinza', valor: "#9e9e9e"},
        {texto: 'Marrom', valor: "#795548"},
        {texto: 'Azul', valor: "#2196F3"},
        {texto: 'Vermelho', valor: "#F44336"},
        {texto: 'Amarelo', valor: "#ffeb3b"},
        {texto: 'Verde', valor: "#4caf50"},
        {texto: 'Laranja', valor: "#ff9800"},
        {texto: 'Roxo', valor: "#9c27b0"},
        {texto: 'Rosa', valor: "#e91e63"},
        {texto: 'Ciano', valor: "#00bcd4"},
        {texto: 'Azul claro', valor: "#03a9f4"},
        {texto: 'Índigo', valor: "#3f51b5"},
        {texto: 'Lima', valor: "#cddc39"},
        {texto: 'Laranja Escuro', valor: "#ff5722"},
        {texto: 'Rosa Claro', valor: "#F8BBD0"},
        {texto: 'Teal', valor: "#009688"},
        {texto: 'Roxo Escuro', valor: "#673AB7"}
    ];
    var btnCor = new botao("Fonte",'', 2, cores);
    btnCor.getButton().onchange = function() {
        documento.formatar('forecolor', btnCor.getValue());
    };


    var tamanhosTexto = [
        {texto: '1', valor: '1'},
        {texto: '2', valor: '2'},
        {texto: '3', valor: '3'},
        {texto: '4', valor: '4'},
        {texto: '5', valor: '5'},
        {texto: '6', valor: '6'},
        {texto: '7', valor: '7'}
    ];
    var btntamanhofonte = new botao("Fonte",'', 2, tamanhosTexto);
    btntamanhofonte.getButton().onchange = function() {
        documento.formatar('fontSize', btntamanhofonte.getValue());
    };

    var fonts = [{texto: 'Arial', valor: "arial"}, {texto: 'Courier', valor: "courier"}];
    var btnFont = new botao("Fonte",'', 2, fonts);
    btnFont.getButton().onchange = function() {
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
 /*
   var buttonGroup1 = new grupoBotoes();
   buttonGroup1.adicionarBotao(btnFont);
   buttonGroup1.adicionarBotao(btnCor);
   buttonGroup1.adicionarBotao(btntamanhofonte);

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
   /*
   var btnGrpCst = new eDittoButtonGroup(botoes);
console.log(btnGrpCst);
   this.addPersonalizacao = function(personalizacao) {
        btnGrpCst.adicionarBotao(personalizacao.ac.btn);
   };

   botoes.adicionarGrupo(btnGrpCst.getGroup());
   */
}
