/*
 * Landing translations (S9): automatic initial language from the browser
 * preference plus a manual header selector. The app demo and the story
 * preview stay Spanish regardless of this choice.
 */
(function () {
	'use strict';

	var COPY = {
		en: {
			'nav.download': 'Download',
			'hero.title': 'A quiet place for <em>your files</em>.',
			'hero.lede': "Most clouds rent you a drawer in someone else's building. CloudLocal gives you the whole house: a calm, fast file cloud that runs on the computer already humming in your closet.",
			'hero.download': 'Download free',
			'hero.github': 'View the code on GitHub',
			'story.kicker': 'Your local workspace',
			'story.heading': 'Your files, right where you need them.',
			'story.description': 'CloudLocal runs on your computer and gives you a familiar way to access files across your local network.',
			'story.bullet1': 'Browse folders and search files',
			'story.bullet2': 'Upload and organize your documents',
			'story.bullet3': 'Choose a list or grid view',
			'open.kicker': 'Open source',
			'open.heading': 'Built to be yours.',
			'open.description': 'CloudLocal is an open-source project. Explore the code and make it your own.',
			'open.link': 'View the code on GitHub',
			'cta.heading': 'Bring your files home.',
			'cta.description': 'Get started with CloudLocal and give your files a place on your own network.',
			'cta.download': 'Download free',
			'footer.license': 'MIT license · v1.0',
			'demo.caption': 'An interactive CloudLocal demo with fictional data.'
		},
		es: {
			'nav.download': 'Descargar',
			'hero.title': 'Un lugar tranquilo para <em>tus archivos</em>.',
			'hero.lede': 'CloudLocal convierte tu computadora en un espacio para tus archivos dentro de tu propia red, con una interfaz sencilla y familiar.',
			'hero.download': 'Descargar gratis',
			'hero.github': 'Ver el código en GitHub',
			'story.kicker': 'Tu espacio de trabajo local',
			'story.heading': 'Tus archivos, justo donde los necesitas.',
			'story.description': 'CloudLocal se ejecuta en tu computadora y te permite acceder a tus archivos a través de tu red local.',
			'story.bullet1': 'Explora carpetas y busca archivos',
			'story.bullet2': 'Sube y organiza tus documentos',
			'story.bullet3': 'Elige entre vista de lista o cuadrícula',
			'open.kicker': 'Código abierto',
			'open.heading': 'Creado para que sea tuyo.',
			'open.description': 'CloudLocal es un proyecto de código abierto. Explora el código y hazlo tuyo.',
			'open.link': 'Ver el código en GitHub',
			'cta.heading': 'Tus archivos en tu casa.',
			'cta.description': 'Empieza con CloudLocal y dale a tus archivos un lugar en tu propia red.',
			'cta.download': 'Descargar gratis',
			'footer.license': 'Licencia MIT · v1.0',
			'demo.caption': 'Demostración navegable de CloudLocal con datos ficticios.'
		}
	};

	var select = document.querySelector('.lang-select');
	if (!select || !document.querySelector('[data-i18n]')) return;

	function apply(lang) {
		var dict = COPY[lang];
		document.documentElement.lang = lang;
		select.value = lang;
		document.querySelectorAll('[data-i18n]').forEach(function (el) {
			var value = dict[el.getAttribute('data-i18n')];
			if (typeof value === 'string') el.textContent = value;
		});
		document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
			var value = dict[el.getAttribute('data-i18n-html')];
			if (typeof value === 'string') el.innerHTML = value;
		});
		var caption = document.querySelector('.product-caption');
		if (caption) {
			caption.lang = lang;
			caption.textContent = dict['demo.caption'];
		}
	}

	var preferred = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
	apply(/^es(?:-|$)/i.test(preferred) ? 'es' : 'en');

	select.addEventListener('change', function () {
		apply(select.value);
	});
})();
