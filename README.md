# Screw-FileReader
For those lazzy bastard who don't like the FileReader :)

[![npm version][npm-image]][npm-url]

```
npm install screw-filereader
```

A promisified Blob reader was [proposed][proposed].
But not as a external API like FileReader... Nooo - this is prototyped to blob directly!

This makes it easier to read stuff from Blob's and File's

Here is an example

```javascript
// require('screw-filereader')
// import screw-filereader

arrayBuffer = await blob.arrayBuffer() // awaits a promise
text = await blob.text() // awaits a promise
stream = blob.stream() // returns a web ReadableStream

// Just bonuses
json = await blob.json() // awaits a promise
url = blob.url() // returns a blob url (same as URL.createObjectURL(blob))
```

if streams are enhanced with [web-streams-polyfill][polyfill] then you get all
the benefits of pipes as well :v:

  [polyfill]: https://github.com/creatorrr/web-streams-polyfill
  [proposed]: https://github.com/w3c/FileAPI/issues/40
  [npm-image]: https://img.shields.io/npm/v/screw-filereader.svg?style=flat-square
  [npm-url]: https://www.npmjs.com/package/screw-filereader
