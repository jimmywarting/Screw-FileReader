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
dataUrl = await blob.dataUrl() // awaits a promise
stream = blob.stream() // returns a web ReadableStream

// BinaryString has been avoided
// - Binaries just don't work well with strings face it.
//   Send the blob with ajax instead or use ArrayBuffer if you want to work with the data
//
// Until someone gives me a good reason why I should add them


// Just bonuses
// ------------
json = await blob.json() // awaits a promise (rejects if fail to parse)
img = await blob.image() // awaits a new Image object (rejects if fail to load)

// returns a blob url (same as [webkit]URL.createObjectURL(blob))
// can also return null if it's not possible like on chrome for iOS...
url = blob.url() || await blob.dataUrl() // this is what blob.image() dose behind the scene...
```

If streams are enhanced with [web-streams-polyfill][polyfill] then you get all
the benefits of pipes as well :v:<br>
Otherwise only a ReadableStream without pipe will be returned (but only in Blink)

  [polyfill]: https://github.com/creatorrr/web-streams-polyfill
  [proposed]: https://github.com/w3c/FileAPI/issues/40
  [npm-image]: https://img.shields.io/npm/v/screw-filereader.svg?style=flat-square
  [npm-url]: https://www.npmjs.com/package/screw-filereader
