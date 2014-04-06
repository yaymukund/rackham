.PHONY: build watch all

all:
	ember server --proxy-port 3000

build:
	zsh scripts/build.sh

watch:
	node_modules/nodemon/bin/nodemon.js --exec "make build" -e "scss js hbs" -w app
