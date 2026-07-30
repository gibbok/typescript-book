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
