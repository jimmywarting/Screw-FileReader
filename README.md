# Screw-FileReader
For those lazzy bastard who don't like the FileReader :)

npm install screw-filereader

A promisified Blob reader was [proposed][proposed].
But not as a external API like FileReader... Nooo - this is prototyped to blob directly!

This makes it easier to read stuff from Blob's and File's

Here is an example

```javascript
// require('screw-filereader')
// import screw-filereader

arrayBuffer = await blob.arrayBuffer() // awaits a promise
text = await blob.text() // awaits a promise
json = await blob.json() // awaits a promise
stream = blob.stream() // returns a web ReadableStream
```

if streams are enhanced with [web-streams-polyfill][polyfill] then you get all
the benefits of pipes as well :v:

  [polyfill]: https://github.com/creatorrr/web-streams-polyfill
  [proposed]: https://github.com/w3c/FileAPI/issues/40
