DOCKER_IMAGE ?= typescript-book-tools:local
PUBLISHED_REPOSITORY ?= gibbok/typescript-book
DOCKER_RUN = docker run --rm --user "$$(id -u):$$(id -g)" --tmpfs /workspace/tools/node_modules:uid=$$(id -u),gid=$$(id -g),mode=755 --volume "$$(cd .. && pwd):/workspace" --workdir /workspace $(DOCKER_IMAGE)

.PHONY: format check website website-deploy website-preview website-e2e books verify-books docker-build docker-fonts docker-format docker-check docker-website docker-books docker-verify-books

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

docker-build: docker-fonts
	docker build --tag $(DOCKER_IMAGE) --file Dockerfile .

docker-fonts:
	./install-noto-fonts.sh --prepare

docker-format: docker-build
	$(DOCKER_RUN) make -C tools format

docker-check: docker-build
	$(DOCKER_RUN) make -C tools check

docker-website: docker-build
	$(DOCKER_RUN) make -C tools website

docker-books: docker-build
	$(DOCKER_RUN) make -C tools books

docker-verify-books: docker-build
	$(DOCKER_RUN) make -C tools verify-books