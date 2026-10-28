/* CloudLocal app replica logic (ported from the design artboard). */
(function(){
"use strict";
if(!document.querySelector(".appwin"))return;
(function () {
	'use strict';
	var ICONS = {
		folderRow: '<svg class="aw-ficon folder" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M6.5 2.5c.4 0 .8.24.96.61l.4.89h4.64c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-10c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5h4z"/></svg>',
		fileRow: '<svg class="aw-ficon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M9.5 1.5H4.5c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V4.5l-3-3z"/><path d="M9.5 1.5v3h3"/></svg>',
		folderPlate: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M6.5 2.5c.4 0 .8.24.96.61l.4.89h4.64c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-10c-.83 0-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5h4z"/></svg>',
		filePlate: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M9.5 1.5H4.5c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V4.5l-3-3z"/><path d="M9.5 1.5v3h3"/></svg>',
		eye: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8 12.1 12.5 8 12.5 1.5 8 1.5 8z"/><circle cx="8" cy="8" r="1.8"/></svg>',
		down: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 2v8M5 7l3 3 3-3M2.5 13.5h11"/></svg>',
		move: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 12.2V5.4c0-.4.3-.7.7-.7h2.1l.9 1.2h3.6c.4 0 .7.3.7.7v5.6c0 .4-.3.7-.7.7H2.7c-.4 0-.7-.3-.7-.7z"/><path d="M9.6 8.6H6.1M7.3 7.3 6.1 8.6l1.2 1.3"/></svg>',
		trash: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 4.5h10M6.5 4.5V3.2c0-.4.3-.7.7-.7h1.6c.4 0 .7.3.7.7v1.3M4.5 4.5l.6 8c0 .4.4.8.8.8h4.2c.4 0 .8-.4.8-.8l.6-8"/></svg>',
		undo: '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4.2 3.6 1.8 6l2.4 2.4"/><path d="M1.8 6h7.4a3.6 3.6 0 0 1 0 7.2H6.6"/></svg>'
	};
	var MONTHS = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 };
	var KIND_DOC = ['pdf', 'word', 'excel', 'powerpoint', 'text'];
	var NOW = '4 nov 2026, 18:42';
	var DATA = {
		'': [
			{ name: 'Documentos', type: 'directory' },
			{ name: 'Fotos 2026', type: 'directory' },
			{ name: 'backup-servidor.zip', type: 'archive', size: '1,8 GiB', mod: '25 oct 2026, 3:12' },
			{ name: 'contrato-renta.pdf', type: 'pdf', size: '812,4 KiB', mod: '2 nov 2026, 11:03' },
			{ name: 'notas-reunion.txt', type: 'text', size: '2,4 KiB', mod: '27 oct 2026, 8:41' },
			{ name: 'playa-atardecer.jpg', type: 'image', size: '4,2 MiB', mod: '27 oct 2026, 19:45' },
			{ name: 'presupuesto-2026.xlsx', type: 'excel', size: '96,1 KiB', mod: '28 oct 2026, 16:20' }
		],
		'Documentos': [
			{ name: 'contrato-renta.pdf', type: 'pdf', size: '812,4 KiB', mod: '2 nov 2026, 11:03' },
			{ name: 'cv-actualizado.docx', type: 'word', size: '58,3 KiB', mod: '14 sep 2026, 10:22' },
			{ name: 'escritura-piso.pdf', type: 'pdf', size: '3,1 MiB', mod: '9 jun 2026, 17:48' },
			{ name: 'factura-luz-octubre.pdf', type: 'pdf', size: '84,7 KiB', mod: '3 nov 2026, 9:05' },
			{ name: 'notas-reunion.txt', type: 'text', size: '2,4 KiB', mod: '27 oct 2026, 8:41' },
			{ name: 'presupuesto-2026.xlsx', type: 'excel', size: '96,1 KiB', mod: '28 oct 2026, 16:20' }
		],
		'Fotos 2026': [
			{ name: 'Montaña', type: 'directory' },
			{ name: 'Playa', type: 'directory' },
			{ name: 'amanecer-sierra.jpg', type: 'image', size: '5,8 MiB', mod: '18 ago 2026, 7:12' },
			{ name: 'cumple-ana.jpg', type: 'image', size: '3,4 MiB', mod: '12 sep 2026, 22:03' },
			{ name: 'fiesta-empresa.mp4', type: 'video', size: '212,6 MiB', mod: '20 dic 2026, 1:44' },
			{ name: 'foto-grupal.png', type: 'image', size: '8,9 MiB', mod: '20 dic 2026, 1:41' }
		],
		'Fotos 2026/Montaña': [
			{ name: 'cumbre-2800m.jpg', type: 'image', size: '6,7 MiB', mod: '18 ago 2026, 12:36' },
			{ name: 'sendero-niebla.jpg', type: 'image', size: '4,9 MiB', mod: '18 ago 2026, 9:20' }
		],
		'Fotos 2026/Playa': [
			{ name: 'conchas-mar.jpg', type: 'image', size: '3,8 MiB', mod: '2 ago 2026, 13:57' },
			{ name: 'playa-atardecer.jpg', type: 'image', size: '4,2 MiB', mod: '27 oct 2026, 19:45' },
			{ name: 'saltos-roca.mp4', type: 'video', size: '96,3 MiB', mod: '2 ago 2026, 16:10' }
		]
	};
	var TRASH = [
		{ id: 1, name: 'captura-antigua.png', type: 'image', size: '1,4 MiB', origin: 'Fotos 2026/Playa', orig: '12 mar 2026, 9:04', deleted: '3 nov 2026, 18:22' },
		{ id: 2, name: 'video-viejo.mp4', type: 'video', size: '348,2 MiB', origin: 'Fotos 2026', orig: '7 feb 2026, 21:15', deleted: '1 nov 2026, 20:08' },
		{ id: 3, name: 'informe-borrador.docx', type: 'word', size: '214,7 KiB', origin: 'Documentos', orig: '24 oct 2026, 10:37', deleted: '30 oct 2026, 9:12' },
		{ id: 4, name: 'captura-blur.png', type: 'image', size: '2,8 MiB', origin: 'Documentos', orig: '18 oct 2026, 16:45', deleted: '29 oct 2026, 13:04' },
		{ id: 5, name: 'backup-viejo.zip', type: 'archive', size: '1,2 GiB', origin: '', orig: '2 sep 2026, 8:20', deleted: '27 oct 2026, 19:41' },
		{ id: 6, name: 'gastos-septiembre.xlsx', type: 'excel', size: '38,4 KiB', origin: 'Documentos', orig: '30 sep 2026, 17:55', deleted: '25 oct 2026, 11:29' }
	];
	var trashSeq = 6;
	var state = { section: 'files', folder: '', view: 'list', filter: 'all', selected: [], query: '', recentQuery: '', theme: 'light' };
	var root = document.querySelector('.appwin');

	function $(id) { return document.getElementById(id); }
	function items(folder) { return DATA[folder] || []; }
	function kindOf(name) {
		var ext = String(name).split('.').pop().toLowerCase();
		return { jpg: 'image', jpeg: 'image', png: 'image', gif: 'image', webp: 'image', mp4: 'video', pdf: 'pdf', xlsx: 'excel', docx: 'word', txt: 'text', zip: 'archive' }[ext] || 'unknown';
	}
	function ts(entry) {
		if (entry._ts !== undefined) return entry._ts;
		var m = /^(\d{1,2}) ([a-z]{3}) (\d{4}), (\d{1,2}):(\d{2})$/.exec(entry.mod || '');
		entry._ts = m ? Date.UTC(+m[3], MONTHS[m[2]], +m[1], +m[4], +m[5]) : 0;
		return entry._ts;
	}
	function entries() {
		var q = state.query.trim().toLowerCase();
		return items(state.folder).filter(function (e) {
			if (state.filter !== 'all') {
				if (e.type === 'directory') return false;
				if (state.filter === 'document') { if (KIND_DOC.indexOf(e.type) < 0) return false; }
				else if (e.type !== state.filter) return false;
			}
			return q ? e.name.toLowerCase().indexOf(q) >= 0 : true;
		});
	}
	function allFiles() {
		var out = [];
		Object.keys(DATA).forEach(function (folder) {
			DATA[folder].forEach(function (entry) {
				if (entry.type !== 'directory') out.push({ folder: folder, entry: entry });
			});
		});
		return out.sort(function (a, b) { return ts(b.entry) - ts(a.entry); });
	}
	function recentFiles() {
		var seen = {};
		var q = state.recentQuery.trim().toLowerCase();
		return allFiles().filter(function (row) {
			if (seen[row.entry.name]) return false;
			seen[row.entry.name] = true;
			return q ? row.entry.name.toLowerCase().indexOf(q) >= 0 : true;
		});
	}
	function crumbsHtml() {
		var parts = state.folder === '' ? [] : state.folder.split('/');
		var html = parts.length === 0
			? '<button aria-current="page">Inicio</button>'
			: '<button data-crumb="">Inicio</button>';
		for (var i = 0; i < parts.length; i++) {
			var path = parts.slice(0, i + 1).join('/');
			html += '<span class="sep">/</span>' + (i === parts.length - 1
				? '<button aria-current="page">' + parts[i] + '</button>'
				: '<button data-crumb="' + path + '">' + parts[i] + '</button>');
		}
		return html;
	}
	function plateHtml(type) {
		return '<span class="aw-gicon" data-type="' + type + '">' + (type === 'directory' ? ICONS.folderPlate : ICONS.filePlate) + '</span>';
	}
	function rowActions(entry, folder) {
		var html = '';
		if (entry.type !== 'directory') html += '<button class="aw-act" data-act="preview" data-name="' + entry.name + '" title="Vista previa (demo)" aria-label="Vista previa de ' + entry.name + '">' + ICONS.eye + '</button>';
		html += '<button class="aw-act" data-act="download" data-name="' + entry.name + '" title="Descargar (demo)" aria-label="Descargar ' + entry.name + '">' + ICONS.down + '</button>';
		html += '<button class="aw-act del" data-act="trash" data-name="' + entry.name + '" data-folder="' + folder + '" title="Enviar a papelera" aria-label="Enviar ' + entry.name + ' a la papelera">' + ICONS.trash + '</button>';
		return '<span class="aw-actions">' + html + '</span>';
	}
	function gridActions(entry) {
		return '<span class="aw-gacts">' +
			'<button class="aw-gact" data-act="download" data-name="' + entry.name + '" title="Descargar (demo)" aria-label="Descargar ' + entry.name + '">' + ICONS.down + '</button>' +
			'<button class="aw-gact" data-act="preview" data-name="' + entry.name + '" title="Vista previa (demo)" aria-label="Vista previa de ' + entry.name + '">' + ICONS.eye + '</button>' +
			'<button class="aw-gact" data-act="move" data-name="' + entry.name + '" title="Mover (demo)" aria-label="Mover ' + entry.name + '">' + ICONS.move + '</button>' +
			'<button class="aw-gact del" data-act="trash" data-name="' + entry.name + '" data-folder="' + state.folder + '" title="Enviar a papelera" aria-label="Enviar ' + entry.name + ' a la papelera">' + ICONS.trash + '</button>' +
			'</span>';
	}
	function chipsHtml() {
		var all = items(state.folder);
		var counts = { all: all.length, image: 0, video: 0, document: 0 };
		all.forEach(function (e) {
			if (e.type === 'directory') return;
			if (e.type === 'image') counts.image += 1;
			else if (e.type === 'video') counts.video += 1;
			else if (KIND_DOC.indexOf(e.type) >= 0) counts.document += 1;
		});
		var labels = [['all', 'Todo'], ['image', 'Imágenes'], ['video', 'Vídeo'], ['document', 'Documentos']];
		return labels.map(function (label) {
			var on = state.filter === label[0];
			return '<button class="aw-chip' + (on ? ' on' : '') + '" data-filter="' + label[0] + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + label[1] + ' <span class="cnt">' + counts[label[0]] + '</span></button>';
		}).join('');
	}
	function tableHtml(list, emptyMsg) {
		var head = '<div class="aw-thead"><span></span><span>NOMBRE</span><span class="aw-th-r">MODIFICADO</span><span class="aw-th-r aw-size">TAMAÑO</span><span class="aw-th-r">ACCIONES</span></div>';
		if (list.length === 0) {
			return head + '<div class="aw-row"><span></span><span class="aw-empty aw-empty-cell">' + emptyMsg + '</span></div>';
		}
		return head + list.map(function (e) {
			var isDir = e.type === 'directory';
			var check = '<span class="aw-colcheck">' + (isDir ? '' : '<input type="checkbox" class="aw-check" data-check="' + e.name + '"' + (state.selected.indexOf(e.name) >= 0 ? ' checked' : '') + ' aria-label="Seleccionar ' + e.name + '">') + '</span>';
			var name = '<span class="aw-namecell">' + (isDir ? ICONS.folderRow : ICONS.fileRow) +
				(isDir ? '<button class="aw-fname dir" data-open="' + e.name + '" title="' + e.name + '">' + e.name + '</button>'
					: '<span class="aw-fname" title="' + e.name + '">' + e.name + '</span>') + '</span>';
			return '<div class="aw-row' + (isDir ? '' : ' file') + '">' + check + name +
				'<span class="aw-meta">' + (isDir ? '—' : e.mod) + '</span>' +
				'<span class="aw-meta aw-size">' + (isDir ? '—' : e.size) + '</span>' + rowActions(e, state.folder) + '</div>';
		}).join('');
	}
	function gridHtml(list, emptyMsg) {
		if (list.length === 0) return '<div class="aw-empty">' + emptyMsg + '</div>';
		return list.map(function (e) {
			var isDir = e.type === 'directory';
			var type = isDir ? 'directory' : e.type;
			var selected = !isDir && state.selected.indexOf(e.name) >= 0;
			return '<div class="aw-gitem' + (selected ? ' selected' : '') + '" data-open="' + (isDir ? e.name : '') + '" data-select="' + (isDir ? '' : e.name) + '" role="button" tabindex="0" aria-pressed="' + (selected ? 'true' : 'false') + '" aria-label="' + e.name + (isDir ? ', carpeta' : '') + '">' +
				(!isDir ? '<span class="aw-gcheck"><input type="checkbox" class="aw-check" data-check="' + e.name + '"' + (selected ? ' checked' : '') + ' aria-label="Seleccionar ' + e.name + '"></span>' : '') +
				plateHtml(type) +
				'<span class="aw-gname">' + e.name + '<small>' + (isDir ? 'Carpeta' : e.size) + '</small></span>' +
				(!isDir ? gridActions(e) : '') +
				'</div>';
		}).join('');
	}
	function recentStripHtml() {
		return allFiles().slice(0, 2).map(function (row) {
			var e = row.entry;
			return '<button type="button" class="aw-rtile" data-goto="' + row.folder + '" title="' + (row.folder || 'Inicio') + '">' +
				plateHtml(e.type) +
				'<span class="aw-rdetails"><span class="aw-rname">' + e.name + '</span><span class="aw-rmeta">' + e.size + ' · ' + e.mod + '</span></span>' +
				'</button>';
		}).join('');
	}
	function recentTableHtml(list) {
		var head = '<div class="aw-thead"><span>NOMBRE</span><span class="aw-th-r">MODIFICADO</span><span class="aw-th-r aw-size">TAMAÑO</span><span class="aw-th-r">ACCIONES</span></div>';
		if (list.length === 0) {
			return head + '<div class="aw-row"><span class="aw-empty aw-empty-cell">' + (state.recentQuery.trim() ? 'No hay coincidencias.' : 'Aún no hay archivos recientes.') + '</span></div>';
		}
		return head + list.map(function (row) {
			var e = row.entry;
			return '<div class="aw-row file">' +
				'<span class="aw-namecell">' + ICONS.fileRow + '<span class="aw-fname" title="' + (row.folder ? row.folder + '/' : '') + e.name + '">' + e.name + '</span></span>' +
				'<span class="aw-meta">' + e.mod + '</span>' +
				'<span class="aw-meta aw-size">' + e.size + '</span>' + rowActions(e, row.folder) + '</div>';
		}).join('');
	}
	function trashTableHtml() {
		var head = '<div class="aw-thead"><span></span><span>NOMBRE</span><span class="aw-th-r">MODIFICADO</span><span class="aw-th-r aw-size">TAMAÑO</span><span class="aw-th-r">ACCIONES</span></div>';
		if (TRASH.length === 0) {
			return head + '<div class="aw-row"><span class="aw-trash-empty"><span class="aw-te-ico">' + ICONS.trash + '</span><span>La papelera está vacía.</span></span></div>';
		}
		return head + TRASH.map(function (item) {
			var path = (item.origin ? item.origin + '/' : '') + item.name;
			return '<div class="aw-row">' +
				'<span class="aw-colcheck"></span>' +
				'<span class="aw-namecell">' + ICONS.fileRow + '<span class="aw-fname" title="Antes: ' + path + '">' + item.name + '<small>Antes: ' + path + '</small></span></span>' +
				'<span class="aw-meta">' + item.deleted + '</span>' +
				'<span class="aw-meta aw-size">' + item.size + '</span>' +
				'<span class="aw-actions">' +
					'<button class="aw-act" data-restore="' + item.id + '" title="Restaurar" aria-label="Restaurar ' + item.name + '">' + ICONS.undo + '</button>' +
					'<button class="aw-act del" data-purge="' + item.id + '" title="Eliminar definitivamente" aria-label="Eliminar definitivamente ' + item.name + '">' + ICONS.trash + '</button>' +
				'</span></div>';
		}).join('');
	}
	function notify(message) {
		var el = $('awNotice');
		el.textContent = message;
		el.classList.add('show');
	}
	function applyTheme(theme) {
		state.theme = theme === 'dark' ? 'dark' : 'light';
		root.setAttribute('data-apptheme', state.theme);
		var on = state.theme === 'dark';
		$('awThemeSwitch').setAttribute('aria-checked', on ? 'true' : 'false');
		$('awThemeLabel').textContent = on ? 'Activado' : 'Desactivado';
	}
	function toggleTheme() { applyTheme(state.theme === 'dark' ? 'light' : 'dark'); }
	function renderRail() {
		Array.prototype.forEach.call(root.querySelectorAll('[data-nav]'), function (button) {
			var on = button.getAttribute('data-nav') === state.section;
			button.classList.toggle('active', on);
			if (on) button.setAttribute('aria-current', 'page');
			else button.removeAttribute('aria-current');
		});
	}
	function renderTopbar() {
		var meta = {
			files: ['Mis archivos', ''],
			recent: ['Recientes', 'Ordenados por fecha de modificación en esta carpeta.'],
			trash: ['Papelera', 'Restaura o elimina permanentemente los archivos borrados.'],
			settings: ['Configuración', '']
		}[state.section];
		$('awTitle').textContent = meta[0];
		$('awSubtitle').textContent = meta[1];
		$('awSubtitle').hidden = meta[1] === '';
		$('awCrumbs').innerHTML = state.section === 'files' ? crumbsHtml() : '<button aria-current="page">Inicio</button>';
		var actions = state.section === 'files' || state.section === 'recent';
		$('awTopActions').hidden = !actions;
		$('awNewFolder').hidden = state.section !== 'files';
	}
	function renderRecentStrip() {
		var strip = $('awRecent');
		var show = state.section === 'files' && state.view === 'grid';
		strip.hidden = !show;
		$('awRecentGrid').innerHTML = show ? recentStripHtml() : '';
	}
	function renderFiles() {
		var list = entries();
		var emptyMsg = state.query.trim() ? 'No hay coincidencias en esta carpeta.' : 'Esta carpeta está vacía. Puedes crear una carpeta o subir archivos.';
		$('awBack').classList.toggle('show', state.folder !== '');
		$('awChips').innerHTML = chipsHtml();
		$('awTable').innerHTML = state.view === 'list' ? tableHtml(list, emptyMsg) : '';
		$('awTable').style.display = state.view === 'list' ? '' : 'none';
		$('awGrid').innerHTML = state.view === 'grid' ? gridHtml(list, emptyMsg) : '';
		$('awGrid').classList.toggle('show', state.view === 'grid');
		$('awViewList').classList.toggle('on', state.view === 'list');
		$('awViewList').setAttribute('aria-checked', state.view === 'list' ? 'true' : 'false');
		$('awViewGrid').classList.toggle('on', state.view === 'grid');
		$('awViewGrid').setAttribute('aria-checked', state.view === 'grid' ? 'true' : 'false');
		$('awSelbar').classList.toggle('show', state.selected.length > 0);
		$('awSelCount').textContent = state.selected.length + ' seleccionado' + (state.selected.length !== 1 ? 's' : '');
		renderRecentStrip();
	}
	function render() {
		$('awFilesView').hidden = state.section !== 'files';
		$('awRecentView').hidden = state.section !== 'recent';
		$('awTrashView').hidden = state.section !== 'trash';
		$('awSettingsView').hidden = state.section !== 'settings';
		renderRail();
		renderTopbar();
		if (state.section === 'files') renderFiles();
		else if (state.section === 'recent') $('awRecentTable').innerHTML = recentTableHtml(recentFiles());
		else if (state.section === 'trash') {
			$('awTrashTable').innerHTML = trashTableHtml();
			$('awEmptyTrash').disabled = TRASH.length === 0;
		}
	}
	function toggleSelect(name) {
		state.selected = state.selected.indexOf(name) >= 0
			? state.selected.filter(function (n) { return n !== name; })
			: state.selected.concat([name]);
		render();
	}
	function openEntry(name) {
		state.folder = state.folder === '' ? name : state.folder + '/' + name;
		state.selected = [];
		state.query = '';
		$('awQuery').value = '';
		render();
	}
	function goSection(section) {
		state.section = section;
		state.selected = [];
		render();
	}
	function trashFile(folder, name) {
		var list = items(folder);
		var index = -1;
		for (var i = 0; i < list.length; i++) { if (list[i].name === name) { index = i; break; } }
		if (index < 0) return;
		var entry = list.splice(index, 1)[0];
		trashSeq += 1;
		TRASH.unshift({ id: trashSeq, name: entry.name, type: entry.type, size: entry.size, origin: folder, orig: entry.mod, deleted: NOW });
		state.selected = state.selected.filter(function (n) { return n !== name; });
		notify('«' + name + '» está en la papelera.');
		render();
	}
	function restoreItem(id) {
		var index = -1;
		for (var i = 0; i < TRASH.length; i++) { if (TRASH[i].id === id) { index = i; break; } }
		if (index < 0) return;
		var item = TRASH.splice(index, 1)[0];
		if (!DATA[item.origin]) DATA[item.origin] = [];
		DATA[item.origin].push({ name: item.name, type: item.type, size: item.size, mod: item.orig });
		notify('«' + item.name + '» restaurado.');
		render();
	}
	function purgeItem(id) {
		var index = -1;
		for (var i = 0; i < TRASH.length; i++) { if (TRASH[i].id === id) { index = i; break; } }
		if (index < 0) return;
		var item = TRASH.splice(index, 1)[0];
		notify('«' + item.name + '» eliminado definitivamente.');
		render();
	}
	function emptyTrash() {
		if (TRASH.length === 0) return;
		TRASH.length = 0;
		notify('Papelera vaciada.');
		render();
	}

	root.addEventListener('click', function (ev) {
		var target = ev.target;
		var nav = target.closest('[data-nav]');
		if (nav) { goSection(nav.getAttribute('data-nav')); return; }
		if (target.closest('#awThemeBtn') || target.closest('#awThemeSwitch')) { toggleTheme(); return; }
		if (target.closest('#awSaveFolder') || target.closest('#awResetFolder')) { notify('Demo: la carpeta no se cambia aquí.'); return; }
		if (target.closest('#awShutdown') || target.closest('#awTopApagar')) { notify('Demo: el servidor no se apaga aquí.'); return; }
		if (target.closest('#awEmptyTrash')) { emptyTrash(); return; }
		var restore = target.closest('[data-restore]');
		if (restore) { restoreItem(Number(restore.getAttribute('data-restore'))); return; }
		var purge = target.closest('[data-purge]');
		if (purge) { purgeItem(Number(purge.getAttribute('data-purge'))); return; }
		var act = target.closest('[data-act]');
		if (act) {
			if (act.getAttribute('data-act') === 'trash') trashFile(act.getAttribute('data-folder') || '', act.getAttribute('data-name'));
			return;
		}
		var crumb = target.closest('[data-crumb]');
		if (crumb) { state.folder = crumb.getAttribute('data-crumb'); state.selected = []; state.query = ''; $('awQuery').value = ''; render(); return; }
		var chip = target.closest('[data-filter]');
		if (chip) { state.filter = chip.getAttribute('data-filter'); state.selected = []; render(); return; }
		var goto = target.closest('[data-goto]');
		if (goto) { state.section = 'files'; state.folder = goto.getAttribute('data-goto'); state.selected = []; state.query = ''; $('awQuery').value = ''; render(); return; }
		var open = target.closest('[data-open]');
		if (open && open.getAttribute('data-open')) { openEntry(open.getAttribute('data-open')); return; }
		var gitem = target.closest('.aw-gitem');
		if (gitem && gitem.getAttribute('data-select') && !target.closest('[data-check]')) { toggleSelect(gitem.getAttribute('data-select')); return; }
		if (target.closest('.aw-selbar button')) return;
		var frow = target.closest('.aw-row.file');
		if (frow && !target.closest('[data-check]')) {
			var box = frow.querySelector('[data-check]');
			if (box) toggleSelect(box.getAttribute('data-check'));
		}
	});
	root.addEventListener('change', function (ev) {
		var box = ev.target.closest('[data-check]');
		if (!box) return;
		var name = box.getAttribute('data-check');
		state.selected = box.checked
			? state.selected.concat([name])
			: state.selected.filter(function (n) { return n !== name; });
		render();
	});
	root.addEventListener('keydown', function (ev) {
		var item = ev.target.classList && ev.target.classList.contains('aw-gitem') ? ev.target : null;
		if (!item) return;
		if (ev.key !== 'Enter' && ev.key !== ' ') return;
		ev.preventDefault();
		var open = item.getAttribute('data-open');
		if (open) { openEntry(open); return; }
		var select = item.getAttribute('data-select');
		if (select) toggleSelect(select);
	});
	$('awBack').addEventListener('click', function () {
		state.folder = state.folder.indexOf('/') >= 0 ? state.folder.slice(0, state.folder.lastIndexOf('/')) : '';
		state.selected = [];
		state.query = '';
		$('awQuery').value = '';
		render();
	});
	$('awTrashBack').addEventListener('click', function () { goSection('files'); });
	$('awViewList').addEventListener('click', function () { state.view = 'list'; render(); });
	$('awViewGrid').addEventListener('click', function () { state.view = 'grid'; render(); });
	$('awSelClear').addEventListener('click', function () { state.selected = []; render(); });
	$('awQuery').addEventListener('input', function (ev) { state.query = ev.target.value; state.selected = []; render(); });
	$('awRecentQuery').addEventListener('input', function (ev) { state.recentQuery = ev.target.value; render(); });

	applyTheme(root.getAttribute('data-apptheme') || 'light');
	render();
})();
})();
