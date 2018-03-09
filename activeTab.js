function download_items (request, sender, sendResponse) {
	const selection = document.getSelection()
	for (var i = 0; i < selection.rangeCount; ++i) {
		var range = selection.getRangeAt(i)
		getHrefs(range.cloneContents())
	}
}

function getHrefs (node) {
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
				browser.runtime.sendMessage({ url: urlObj.href })
			}
		} catch (e) {
			console.log(e)
		}
	}
	for (var i = 0; i < node.childNodes.length; ++i) {
		getHrefs(node.childNodes[i])
	}
}

if (!window.loadedSelectionDownlaod) {
	browser.runtime.onMessage.addListener(download_items)
	window.loadedSelectionDownlaod = true
}
