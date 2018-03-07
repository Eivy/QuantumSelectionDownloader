function saveOptions (e) {
	e.preventDefault()
	browser.storage.local.set({
		options: {
			filter: document.querySelector('#filter').value
		}
	})
}

function restoreOptions () {
	function setCurrent (result) {
		if (!result.options) {
			document.querySelector('#filter').value = '\\.(jpg|gif|png|zip|mp4)$'
			return
		}
		document.querySelector('#filter').value = result.options.filter || '\\.(jpg|gif|png|zip|mp4)$'
	}
	function onError (error) {
		console.log(`Error: ${error}`)
	}
	var getting = browser.storage.local.get('options')
	getting.then(setCurrent, onError)
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
