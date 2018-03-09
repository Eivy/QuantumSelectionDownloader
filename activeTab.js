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
					urlObj = new URL(node.getAttribute('href'))
					break
				case 'img':
					urlObj = new URL(node.getAttribute('src'))
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

function count_items () {
	browser.runtime.sendMessage({type: 'count', url: getItems()})
}

if (!window.loadedSelectionDownlaod) {
	browser.runtime.onMessage.addListener(download_items)
	document.onselectionchange = count_items
	window.loadedSelectionDownlaod = true
}
