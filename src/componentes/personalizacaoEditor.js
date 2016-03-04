/**
 * @deprecated Depreciado para alterações futuras de melhoria de versativização
 * @todo -> integrar funcionalidades ao botão
 */
function personalizacaoEditor( documento ) {

    this.ac = new acao( documento );

     this.definirIcone = function(icone) {
        this.ac.btn.definirIcone(icone);
    };
}
