browser.menus.create({
	id: 'selection-download-item',
	title: 'Download selected items',
	contexts: ['selection']
})

browser.menus.create({
	id: 'download-item',
	title: 'Download link',
	contexts: ['all']
})

browser.menus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
		case 'selection-download-item':
			browser.tabs.sendMessage(tab.id, { type: 'selection' })
			break
		case 'download-item':
			if (info.linkUrl !== '') {
				download_item({url: info.linkUrl})
			}
			break
	}
})

function download_item (request, sender, sendResponse) {
	browser.storage.local.get('options').then((result) => {
		let filter = result.filter || '\\.(jpg|gif|png|zip|mp4)$'
		if (filter.length > 0 && !request.url.match((new RegExp(filter)))) {
			return
		}
		try {
			browser.downloads.download({
				url: request.url
			}).catch((reason) => { console.log(reason) })
		} catch (e) {
			console.log(e)
		}
	})
}

browser.runtime.onMessage.addListener(download_item)
