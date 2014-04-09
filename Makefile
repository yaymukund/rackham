.PHONY: watch all production development

all:
	ember server --proxy-port 3000

production:
	zsh scripts/build.sh production

development:
	zsh scripts/build.sh development

watch:
	node_modules/nodemon/bin/nodemon.js --exec "make build" -e "scss js hbs" -w app
