.DEFAULT_GOAL := run

.PHONY: run
run: install
	yarn start

.PHONY: build
build: install
	rm -rf build
	yarn run build

.PHONY: install
install:
	yarn install

.PHONY: upgrade
upgrade:
	yarn upgrade

.PHONY: clean
clean:
	git clean -xdf
