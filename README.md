# e-Ditto
Editor modular para web que permite fáceis alterações para adequações à diversas situações.

## Utilização Básica

Antes de utilizar, certifique-se de que a JQuery e o  font-Awesome estão devidamente carregados em sua página. 

Com essas dependências devidamente carregadas, carregue os arquivos necessários. Esses arquivos encontram-se dentro do diretório src do projeto.

```

<link href="editor.css" rel="stylesheet" type="text/css"/>
<script src="editto.js"></script>

```
No seu documento HTML, insira um textarea especificando um id.

```
<textarea id="meuEditor"></textarea>

```

Com isso, basta criar uma instância do editor. Passando o id do textarea criado.

```
var demo = new editor("meuEditor");
```

## Utilizando as personalizações

Há três formas básicas de se adicionar personalizações ao editor: inserção de texto personalizado, inserção de arquivo externo e inserção de arquivo esterno com partes variáveis.

### Personalização com inserção de Textos
```
var smile = new personalizacaoEditor(demo.obterDocumento());
smile.definirIcone('smile-o');
smile.ac.btn.getButton().onclick = function() {
    smile.ac.inserirTexto(":)");
};

demo.addPersonalizacao(smile);

```

### Personalização com Inserção de Arquivo Externo

```
// demo.js
var carregamento = new personalizacaoEditor(edicao.obterDocumento());
carregamento.definirIcone('recycle');
carregamento.ac.btn.getButton().onclick = function() {
    carregamento.ac.carregar('modelos/demoExterno.html');
};
edicao.addPersonalizacao(carregamento);
```
```
<!-- demoExterno.html -->
<h2>Este é um arquivo externo de modelo para o editor</h2>
<ul>
    <li>Teste de carregamento de arquivo</li>
</ul>

```

### Personalização com Inserção de Arquivo Externo com partes variáveis

```
// demo.js
var tpl = new personalizacaoEditor(edicao.obterDocumento());
tpl.definirIcone('random');
tpl.ac.btn.getButton().onclick = function() {
    var opcoes = [
      { 
          variavel: 'titulo',
          valor: prompt("Insira um título")
      }
    ];
edicao.addPersonalizacao(tpl);
```
```
<!-- demoExterno.html -->
<h2>{{ titulo }}</h2>
<ul>
    <li>Teste de carregamento de arquivo com conteúdo personalizado</li>
</ul>

```

