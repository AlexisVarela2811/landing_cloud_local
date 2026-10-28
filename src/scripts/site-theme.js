/* The page theme is independent from the interactive demo's theme. */
(function () {
	'use strict';
	var root = document.documentElement;
	var button = document.querySelector('[data-site-theme-toggle]');
	if (!button) return;
	var system = window.matchMedia('(prefers-color-scheme: dark)');
	function saved() {
		try { return localStorage.getItem('cloudlocal-site-theme'); } catch (_) { return null; }
	}
	function update() {
		var dark = root.dataset.theme === 'dark';
		var spanish = root.lang.toLowerCase().startsWith('es');
		var label = spanish ? 'Tema de la página' : 'Page theme';
		button.setAttribute('aria-label', label);
		button.setAttribute('title', label);
		button.setAttribute('aria-pressed', String(dark));
	}
	button.addEventListener('click', function () {
		var theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
		root.dataset.theme = theme;
		try { localStorage.setItem('cloudlocal-site-theme', theme); } catch (_) {}
		update();
	});
	system.addEventListener('change', function (event) {
		if (!['light', 'dark'].includes(saved())) {
			root.dataset.theme = event.matches ? 'dark' : 'light';
			update();
		}
	});
	new MutationObserver(update).observe(root, { attributes: true, attributeFilter: ['lang'] });
	update();
})();
