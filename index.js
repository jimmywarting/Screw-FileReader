;(function() {

	if(typeof Blob === 'undefined')
		return console.warn('Screw-FileReader is only meant to work in those' +
	'engine who already has some basic support for blob')

	var blob = Blob.prototype
	var fullStreamSupport = false
	var basicStreamSupport = false
	var fetchTransform = false

	try {
		new ReadableStream({})
		basicStreamSupport = true
	} catch (e) {}

	try {
		new ReadableStream({type: 'bytes'})
		fullStreamSupport = true
	} catch (e) {}

	try {
		(new Response(new Blob)).getReader()
		fetchTransform = true
	} catch (e) {}

	if(!blob.arrayBuffer) {
		blob.arrayBuffer = function arrayBuffer() {
			var fr = new FileReader()
			fr.readAsArrayBuffer(this)
			return new Promise(function(resolve, reject) {
				fr.onload = function(evt) { resolve(evt.target.result) }
				fr.onerror = function(evt) { reject(evt.target.error) }
			})
		}
	}

	if(!blob.text) {
		blob.text = function text() {
			var fr = new FileReader()
			fr.readAsText(this)
			return new Promise(function(resolve, reject) {
				fr.onload = function(evt) { resolve(evt.target.result) }
				fr.onerror = function(evt) { reject(evt.target.error) }
			})
		}
	}
	
	if(!blob.url) {
		blob.url = function url() {
			return URL.createObjectURL(this)
		}
	}

	if(!blob.json) {
		blob.json = function json() {
			return this.text().then(JSON.parse)
		}
	}

	if(!blob.stream) {
		blob.stream =

		fullStreamSupport ? function stream() {
			var position = 0
			var blob = this

			return new ReadableStream({
				type: 'bytes',
				autoAllocateChunkSize: 524288,

				pull: function(controller) {
					var v = controller.byobRequest.view
					var chunk = blob.slice(position, position + v.byteLength)
					return chunk.arrayBuffer()
					.then(function(buffer) {
						let uint8array = new Uint8Array(buffer)
						let bytesRead = uint8array.byteLength

						position += bytesRead
						v.set(uint8array)
							controller.byobRequest.respond(bytesRead)

						if(position >= blob.size)
							controller.close()

						resolve()
					})
				}
			})
		}:

		// basic stream support
		basicStreamSupport ? function stream(blob){
			var position = 0
			var blob = this

			return new ReadableStream({
				pull: function(controller) {
					var chunk = blob.slice(position, position + 524288)

					return chunk.arrayBuffer().then(function(buffer) {
						position += buffer.byteLength
						let uint8array = new Uint8Array(buffer)
						controller.enqueue(uint8array)

						if(position == blob.size)
							controller.close()
					})
				}
			})
		}:

		// fetchTransform
		fetchTransform ? function stream() {
			return (new Response(this)).body
		}:

		function stream() {
			throw new Error('Include https://github.com/creatorrr/web-streams-polyfill')
		}
	}

}());
