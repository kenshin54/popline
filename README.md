popline
============

Popline is a HTML5 Rich-Text-Editor toolbar. Popline is inspired from popclip. Compared to traditional RTE, popline will around they mouse when you select text.

## Usage

Load jQuery and popline:

```html
<script type="text/javascript" src="../scripts/jquery.min.js"></script>
<script type="text/javascript" src="../scripts/jquery.popline.min.js"></script>
```

Or Load the popline plugins which you want:

```html
<script type="text/javascript" src="../scripts/jquery.popline.js"></script>
<script type="text/javascript" src="../scripts/plugins/jquery.popline.link.js"></script>
<script type="text/javascript" src="../scripts/plugins/jquery.popline.decoration.js"></script>
...
```

Load font-awesome and popline theme:
```html
<link rel="stylesheet" type="text/css" href="../font-awesome/css/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="../themes/default.css" />
```

Add a editable div to page:

```html
<div class='editor' contenteditable='true'></div>
```

Initialize you popline for you editor:

```js
$(".editor").popline();
```

## View Mode

Popline also support `View Mode`, you can send a twitter, a facebook message, pin an image to pinterst, search with google in `View Mode` 


```js
$(".editor").popline({mode: 'view'});
```

## Extension

Todo

## Theme customize

Todo

## Example

<http://kenshin54.github.io/popline/>

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
