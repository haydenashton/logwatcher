start:
	babel --presets es2015,react public/javascripts --out-dir public/build
	browserify public/build/app.js > public/build/bundle.js
	npm start
