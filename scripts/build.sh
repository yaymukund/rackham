#!/usr/bin/env zsh

APP_PUBLIC_PATH="../pinback/public";

node_modules/ember-cli/bin/ember build --env $1
echo 'Compiled to dist/assets/';

mkdir -p ${APP_PUBLIC_PATH}
cp dist/assets/env.js "${APP_PUBLIC_PATH}/assets";
cp dist/assets/app.js "${APP_PUBLIC_PATH}/assets";
cp dist/assets/app.css "${APP_PUBLIC_PATH}/assets";
cp dist/assets/mobile.css "${APP_PUBLIC_PATH}/assets";
cp -r dist/images "${APP_PUBLIC_PATH}";
echo "Copied env.js, app.js, app.css, mobile.css to ${APP_PUBLIC_PATH}";
