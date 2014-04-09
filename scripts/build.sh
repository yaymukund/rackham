#!/usr/bin/env zsh

APP_ASSETS_PATH="../music-room/app/assets";
APP_JS_PATH="${APP_ASSETS_PATH}/javascripts";
APP_CSS_PATH="${APP_ASSETS_PATH}/stylesheets";

node_modules/ember-cli/bin/ember build --env $1
echo 'Compiled to dist/assets/';

cp dist/assets/app.js "${APP_JS_PATH}/rackham.js";
echo "Copied dist/assets/app.js to ${APP_JS_PATH}";

cp dist/assets/app.css "${APP_CSS_PATH}/rackham.css";
echo "Copied dist/assets/app.css to ${APP_CSS_PATH}";
