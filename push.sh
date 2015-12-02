#!/bin/sh

./node_modules/.bin/webpack
git push origin master
git push origin master:gh-pages
