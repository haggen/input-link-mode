# input-link-mode.js

> Hold CTRL/META to make an input behave like a link.

## Use case

Your user is filing out a form and she has to type (or paste) an URL and she wants to make sure it's working correctly. With this small utility she can simply hold CTRL or META key and click the input. A new tab (or window) will open using the address typed into the input.

- No dependency.
- Very small, written using modern JavaScript.
- Easy to setup and removable (including listeners).

## Usage

Load the script, select the input element and call `setupLinkMode`, like this:

```html
<input type="text">
<script src="input-link-mode.js"></script>
<script>
var input = document.querySelector('input');
setupLinkMode(input);
</script>
```

Now when the user moves the mouse over the input while holding CTRL or META (Windows or Apple keys) it'll be clickable. Also, it'll gain the class `link-mode` so you can style it accordingly.

Check out this working example: https://jsfiddle.net/5jmhun8z/

If you want to undo everything, including remove the listeners simply call:

```js
removeLinkMode(input);
```

## License 

Licensed under [MIT](LICENSE).




