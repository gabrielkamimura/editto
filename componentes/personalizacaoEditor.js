function personalizacaoEditor( documento ) {
    
    this.ac = new acao( documento );

     this.definirIcone = function(icone) {
        this.ac.btn.definirIcone(icone);
    };
}

