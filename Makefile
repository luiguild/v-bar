build: node_modules
	npm run build

deploy: build
	./deploy.sh

publish:
	./npm.sh

clean:
	rm -rf dist

init:
	yarn

node_modules: package.json
	yarn

.PHONY: build
