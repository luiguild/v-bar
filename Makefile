build: node_modules
	npm run build

deploy: build
	./deploy.sh

clean:
	rm -rf dist

init:
	yarn

node_modules: package.json
	yarn

.PHONY: build
