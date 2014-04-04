.PHONY: build watch

build:
	zsh scripts/build.sh

watch:
	node_modules/nodemon/bin/nodemon.js --exec "make build" -e "scss js hbs" -w app