DOCKER_IMAGE ?= typescript-book-tools:local
DOCKER_RUN = docker run --rm --user "$$(id -u):$$(id -g)" --tmpfs /workspace/tools/node_modules:uid=$$(id -u),gid=$$(id -g),mode=755 --volume "$$(cd .. && pwd):/workspace" --workdir /workspace $(DOCKER_IMAGE)

.PHONY: format check website website-deploy website-preview website-e2e books verify-books docker-books

format:
	npm run format

check:
	npm run check

website:
	python3 ./make-website-content.py

website-deploy:
	cd ../website && npm run deploy

website-preview:
	cd ../website && npm run build && npm run preview

website-e2e:
	cd ../website && npm run build && npm run e2e

books:
	./make-books.sh

verify-books:
	python3 ./verify-books.py --downloads-dir ../downloads --artifacts-file ./book-artifacts.sh

docker-books:
	docker build --tag $(DOCKER_IMAGE) --file Dockerfile .
	$(DOCKER_RUN) make -C tools books
