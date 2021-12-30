#!/usr/bin/env bash

yarn build
git add build -f && git commit -m "deploy"
git subtree push --prefix build origin gh-pages
echo https://ygcedu.github.io/coinback-cash/index.html
