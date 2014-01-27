popline
============

Popline is a non-intrusive WYSIWYG editor that shows up only after selecting a piece of text on the page, inspired by popclip.

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

## Popup Position

Popline can popup at top of the paragraph which you selected (like Medium) or popup on the mouse pointer position.

```js
$(".editor").popline({position: 'fixed'});
$(".editor").popline({position: 'relative'});
```

The default option is 'fixed'.

## Enable / Disable / Reorder plugins

You can enable/disable/reorder plugins when popline initialize.


```js
$(".editor").popline({enable: ["link", ["justify", ["justifyCenter", "indent"]] , "orderedList", "unOrderedList"]});
$(".editor").popline({disable: ["link", "blockquote"]});
```

## Extension

Todo

## Theme customize

#### default

![default](https://raw.github.com/kenshin54/popline/master/img/default.png "default")

#### popclip

![popclip](https://raw.github.com/kenshin54/popline/master/img/popclip.png "popclip")


Hack the theme css and create yours.

## Example

<http://kenshin54.github.io/popline/>

## Compatibility

Tested on Chrome 27.0, Safari 6.0.4, Firefox 21.0, Opera 15.0

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

License
-------

Copyright (c) 2013 kenshin54. Distributed under the MIT License. See LICENSE.txt for further details.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/kenshin54/popline/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

