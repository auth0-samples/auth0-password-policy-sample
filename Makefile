BROWSERIFY = ./node_modules/.bin/browserify
UGLIFYJS = ./node_modules/.bin/uglifyjs

all:
	npm install
	$(BROWSERIFY) index.js | $(UGLIFYJS) > bundle.js
