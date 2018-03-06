function download_items (request, sender, sendResponse) {
	const selection = document.getSelection()
	for (var i = 0; i < selection.rangeCount; ++i) {
		var range = selection.getRangeAt(i)
		getHrefs(range.cloneContents())
	}
}

function getHrefs (node) {
	if (node) {
		if (node.nodeName.toLowerCase() === 'a' && node.hasAttribute('href')) {
			browser.runtime.sendMessage({ url: (new URL(node.getAttribute('href'))).href })
		}
		for (var i = 0; i < node.childNodes.length; ++i) {
			getHrefs(node.childNodes[i])
		}
	}
}

if (!window.loadedSelectionDownlaod) {
	browser.runtime.onMessage.addListener(download_items)
	window.loadedSelectionDownlaod = true
}
