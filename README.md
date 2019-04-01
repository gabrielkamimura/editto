# Editto

Editto is a wysiwyg editor that allows the developers to easily customize everything since buttons style to the available functionality through HTML, CSS and JavaScript.

## Dependencies

None. But web components polyfills are highly recommended for better browser compatibility.
``` html
<script src="./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
<script src=“./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```
## Get Started

After downloading Editto, insert the CSS file you would like to use. Choose between some of the available themes or create a custom editto theme by reading the custom theme section.
``` html
<link type="text/css" rel="stylesheet" href="themes/editto-cyan-theme.css"/>
```
Add the script as well. The editto-bundle.js is the easiest way since It adds editor and button bar components
```html
<script src=“dist/editto-bundle.js"></script>
```
Note: In order to the scripts in dist directory to work, you have to add the polyfills in your page. If you don’t add the polyfills you can add the scripts inside components directory

After this, you can add the editor component:
``` html
<editto-editor class="editto-editor" id="myEditor">
  <h1> Hello World!</h1>
  <p>Some text should be written here.</p>
</editto-editor> 
```
Inside this component, you should insert your editor content. After inserting this, your text editor must display an text editor without options, something like an textarea.

To add the buttons, add the following HTML
``` html
<editto-button-bar class="editto-button-bar" editto="myEditor">
  <div class="editto-button-group">
    <button class="editto-button editto-button__icon" data-editto-format="bold" title="bold"><img src="icons/bold.svg" alt="bold"/></button>
    <button class="editto-button editto-button__icon" data-editto-format="italic" title="italic"><img src="icons/italic.svg " alt="italic"/></button>
    <button class="editto-button editto-button__icon" data-editto-format="underline" title="underline"><img src="icons/underline.svg " alt="underline"/></button>
  </div>
  <div class="editto-button-group">
    <button class="editto-button editto-button__icon" data-editto-format="justifyleft" title="align left"><img src="icons/align_left.png" alt="align left"/></button>
    <button class="editto-button editto-button__icon" data-editto-format="justifycenter" title="align center"><img src="icons/align_center.svg" alt="align center"/></button>
    <button class="editto-button editto-button__icon" data-editto-format="justifyright" title="align right"><img src="icons/align_right.svg" alt="align right"/></button>
  </div>
  <div class="editto-button-group">
    <button class="editto-button editto-button__icon" data-editto-format="insertorderedlist" title="ordered list"><img src="icons/list_ol.svg" alt="ordered list"/></button>
    <button class="editto-button editto-button__icon" data-editto-format="insertunorderedlist" title="unordered list"><img src="icons/list_ul.svg" alt="unordered list"/></button>

    <button class="editto-button editto-button__icon" data-editto-format="backColor" data-editto-format-value="rgb(254, 211, 48)" title="Highlight text"><img src="icons/border_color.svg" alt="Highlight text"/></button>
  </div>
</editto-button-bar>
```
It should add the button bar for your text editor. Please check if the editto-button-bar's editto parameter is filled correctly with your editto-editor’s ID

Editto respects your application visual identity - it’s actually easy to personalize just about everything thru HTML, CSS and JavaScript. The editor and its features are independent, you can add the button bar and then select the features that best fit in your application goals. Bold, italic, underline, lists, or even images, videos, custom components or whatever you want. You can, and we recommend you to do so, use third-party icons such as font-awesome.

Inside the default Editto’s button bar, you can insert default features such as bold, italic, underline and lists. These features are the same ones on document.execcomand’s command name parameter. To do it, insert the command name in data-editto-format parameter inside the buttons. If the command requires a value (backColor, foreColor, fontName), you must insert it in data-editto-format-value.

In order to add some features to your editor, you must add some JavaScript customizations. To do it, get your editto element by using document.getElementById, document.querySelector or similars. Once you get the element, you can access all the editor’s possible features
``` js
function bold() {
    let test = document.querySelector("#myEditor");
    test.toggleBold();
}
```
## List of editto’s personalization methods:
- isEditable() - Check if edition mode is on
- allowEdition() - allows the user to change the editor's content
- disableEdition() - disable the edition mode
- format(command, value) - formats the text with document.execCommand
- insertElement(HTMLString, options) - Inserts an HTML element with soma variables
- insertText(text) - Insert a text
- insertFromTemplate(path, options) - Inserts an content given a path to a template
- checkFormat(format, value) - Checks if some property is activated. Example: check if the current text is bold
- toggleBold()
- toggleItalic()
- toggleUnderline()


## List of editto’s properties
- value
- innerHTML
- innerText
- selectedText
- selectedHTML


## Insert element
### Insert Text
You can insert some text in your editor
``` js
function example() {
    let test = document.querySelector("#myEditor");
    test.insertText("Your text");
}
```

### Elements
``` js
function example() {
    let test = document.querySelector("#myEditor");
    test.insertElement('<section><h1>Title</h1><p>Content</p></section>');
}
```
### Variables
You can insert simple variables to replace some of the text
``` js
function example() {
    let test = document.querySelector("#myEditor"),
        promptedName = prompt("What's your name?");
        test.insertElement(
            '<section><h1>Hello {{ name }}</h1><p>Have a nice day</p></section>', 
            {
                name: promptedName || 'Anonymous'   
            });
}
```

### Insert with template
You can as well insert with a path to an external file
``` js
function insertImage() {
    let test = document.querySelector("#myEditor");
    test.insertFromTemplate('/models-example/imageInsert.html', { src: prompt('Insira a URL da imagem')});
} 
```

``` html
<!-- imageInsert.html -->
<img src="{{ src }}" style="width: 100%;"/>

```
## Theming

## Notes
