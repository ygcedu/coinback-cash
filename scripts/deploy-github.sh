#!/usr/bin/env bash

yarn build &&
  cd build &&
  git init &&
  git add . &&
  git commit -m 'deploy' &&
  git remote add origin https://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@github.com/ygcedu/coinback_react-website.git &&
  git push -u origin master -f &&
  cd -
