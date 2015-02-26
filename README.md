# e-Ditto
Editor modular para web que permite fáceis alterações para adequações a necessidades específicas.

## Utilização Básica

Antes de utilizar, certifique-se de que a JQuery e o  font-Awesome estão devidamente carregados em sua página. 

Com essas dependências devidamente carregadas, carregue os arquivos necessários. Esses arquivos encontram-se dentro do diretório src do projeto.

```html

<link href="editor.css" rel="stylesheet" type="text/css"/>
<script src="editto.js"></script>

```
No seu documento HTML, insira um textarea especificando um id.

```html
<textarea id="meuEditor"></textarea>

```

Com isso, basta criar uma instância do editor. Passando o id do textarea criado.

```javascript
var demo = new editor("meuEditor");
```

## Utilizando as personalizações

Há três formas básicas de se adicionar personalizações ao editor: inserção de texto personalizado, inserção de arquivo externo e inserção de arquivo esterno com partes variáveis.

### Personalização com inserção de Textos
```javascript
var smile = new personalizacaoEditor(demo.obterDocumento());
smile.definirIcone('smile-o');
smile.ac.btn.getButton().onclick = function() {
    smile.ac.inserirTexto(":)");
};

demo.addPersonalizacao(smile);

```

### Personalização com Inserção de Arquivo Externo

```javascript
// demo.js
var carregamento = new personalizacaoEditor(edicao.obterDocumento());
carregamento.definirIcone('recycle');
carregamento.ac.btn.getButton().onclick = function() {
    carregamento.ac.carregar('modelos/demoExterno.html');
};
edicao.addPersonalizacao(carregamento);
```
```html
<!-- demoExterno.html -->
<h2>Este é um arquivo externo de modelo para o editor</h2>
<ul>
    <li>Teste de carregamento de arquivo</li>
</ul>

```

### Personalização com Inserção de Arquivo Externo com partes variáveis

```javascript
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
```html
<!-- demoExterno.html -->
<h2>{{ titulo }}</h2>
<ul>
    <li>Teste de carregamento de arquivo com conteúdo personalizado</li>
</ul>

```

