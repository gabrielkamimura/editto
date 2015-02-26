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
Pode ser que sua página necessite de recursos que incluam html na página. Para isso, utilize o carregamneto de arquivos externos.
Para testar as personalizações com carregamento externo, lembre-se de subir um servidor local na sua máquina
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

Às vezes a inserção de HTML externo não é suficiente. Às vezes, é preciso alterar partes desse código para que ele se adeque a determinada situação, por exemplo no carregamento de uma imagem em que o endereço dessa imagem não é sempre o mesmo.
Para testar as personalizações com carregamento externo, lembre-se de subir um servidor local na sua máquina
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
    tpl.ac.carregar('modelos/demoExterno.html', opcoes);
    }
edicao.addPersonalizacao(tpl);
```
```html
<!-- demoExterno.html -->
<h2>{{ titulo }}</h2>
<ul>
    <li>Teste de carregamento de arquivo com conteúdo personalizado</li>
</ul>

```

## Desenvolvimento
### Primeiros Passos
Com o projeto baixado, navegue até o diretório src e digite o comando.
```
npm start
```
Com isso, os pacotes necessários serão instalados. Após isso, digite o comando:
```
bower install
```
Ao final, as dependências do projeto serão instalados.

No caso de o editor utilizar o carregamento de arquivos externos, certifique-se de que tenha subido um servidor local na máquina por meio de http-server ou php -S

### Desenvolvendo
O projeto para desenvolvimento está estruturado no diretório componentes/src. Lá, há diversos arquivos referentes à manipulação de elementos específicos do editor. Faça as alterações nesses arquivos e ao final das instalações, navegue até o diretório src e execute o comando:
```
gulp scripts
```
Este comando concatenará todos os arquivos em src/componentes em um único arquivo: src/editto.js

```
gulp minify-js
```
Este comando minificará o arquivo editto.js

