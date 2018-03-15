function download_items (request, sender, sendResponse) {
	browser.runtime.sendMessage({type: 'download', url: getItems()})
}

function getItems () {
	const selection = document.getSelection()
	let items = []
	for (var i = 0; i < selection.rangeCount; ++i) {
		var range = selection.getRangeAt(i)
		items = items.concat(getHrefs(range.cloneContents()))
	}
	return items
}

function getHrefs (node) {
	let items = []
	if (node) {
		try {
			let urlObj
			switch (node.nodeName.toLowerCase()) {
				case 'a':
					urlObj = new URL(fix_url(node.getAttribute('href')))
					console.log(urlObj)
					break
				case 'img':
					urlObj = new URL(fix_url(node.getAttribute('src')))
					break
			}
			if (urlObj) {
				items = items.concat(urlObj.href)
			}
		} catch (e) {
			console.log(e)
		}
	}
	for (var i = 0; i < node.childNodes.length; ++i) {
		items = items.concat(getHrefs(node.childNodes[i]))
	}
	return items
}

function fix_url (url) {
	if (url[0] === '/' && url[1] !== '/') {
		url = document.location.protocol + '//' + document.location.host + url
	}
	return url
}

function count_items () {
	browser.runtime.sendMessage({type: 'count', url: getItems()})
}

if (!window.loadedSelectionDownlaod) {
	browser.runtime.onMessage.addListener(download_items)
	document.onselectionchange = count_items
	window.loadedSelectionDownlaod = true
}
