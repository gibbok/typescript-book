FROM node:22-bookworm

ARG EPUBCHECK_VERSION=5.3.0

RUN apt-get update \
    && apt-get install --no-install-recommends --yes \
        calibre \
        ca-certificates \
        curl \
        default-jre-headless \
        fonts-dejavu-core \
        fonts-noto-cjk \
        make \
        pandoc \
        python3 \
        unzip \
    && curl --fail --location --retry 3 \
        --output /tmp/epubcheck.zip \
        "https://github.com/w3c/epubcheck/releases/download/v${EPUBCHECK_VERSION}/epubcheck-${EPUBCHECK_VERSION}.zip" \
    && unzip -q /tmp/epubcheck.zip -d /opt \
    && mv "/opt/epubcheck-${EPUBCHECK_VERSION}" /opt/epubcheck \
    && rm /tmp/epubcheck.zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/typescript-book-tools
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY docker-entrypoint.sh /usr/local/bin/typescript-book-tools
RUN chmod +x /usr/local/bin/typescript-book-tools

COPY epubcheck-wrapper.sh /usr/local/bin/epubcheck
RUN chmod +x /usr/local/bin/epubcheck \
    && epubcheck --version 2>&1 | grep --fixed-strings 'EPUBCheck v'

ENV PATH="/opt/typescript-book-tools/node_modules/.bin:${PATH}" \
    NODE_PATH="/opt/typescript-book-tools/node_modules" \
    HOME="/tmp" \
    XDG_CACHE_HOME="/tmp/.cache" \
    XDG_CONFIG_HOME="/tmp/.config"

WORKDIR /workspace
ENTRYPOINT ["/usr/local/bin/typescript-book-tools"]
CMD ["make", "-C", "tools", "books"]
