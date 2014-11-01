ECJson content manager
======================

Smart Content Manager JSON using scheduled events.

Getting started
---------------

Install 'immutable' using bower.

```sh
$ bower install ecjson --save
```

Browser
-------

To use 'ECJson' in the browser, be sure to load the repositiorio 'bower_components/ecjson'.

Then, add it as a script tag to your page:
```html
<script src="bower_components/ecjson/dist/ecjson.min.js"></script>
<script>
  e = new ecjson
  e.url = "test/request.json"
  e.on('simple',function(d){console.log(d.simple)})
  e.call()
</script>
```

Or use an AMD loader (such as RequireJS):
```js
require(['./bower_components/ecjson/dist/ecjson.min.js'], function (Immutable) {
  e = new ecjson
  e.url = "test/request.json"
  e.on('simple',function(d){console.log(d.simple)})
  e.call()
});
```
