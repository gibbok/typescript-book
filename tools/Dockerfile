FROM node:22-bookworm

RUN apt-get update \
    && apt-get install --no-install-recommends --yes \
        calibre \
        epubcheck \
        fonts-dejavu-core \
        fonts-noto-cjk \
        make \
        pandoc \
        python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/typescript-book-tools
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY docker-entrypoint.sh /usr/local/bin/typescript-book-tools
RUN chmod +x /usr/local/bin/typescript-book-tools

COPY epubcheck-wrapper.sh /usr/local/bin/epubcheck
RUN chmod +x /usr/local/bin/epubcheck && epubcheck --version

ENV PATH="/opt/typescript-book-tools/node_modules/.bin:${PATH}" \
    NODE_PATH="/opt/typescript-book-tools/node_modules" \
    HOME="/tmp" \
    XDG_CACHE_HOME="/tmp/.cache" \
    XDG_CONFIG_HOME="/tmp/.config"

WORKDIR /workspace
ENTRYPOINT ["/usr/local/bin/typescript-book-tools"]
CMD ["make", "-C", "tools", "books"]
