#!/usr/bin/env zsh

APP_JS_PATH="../music-room/app/assets/javascripts/";

node_modules/ember-cli/bin/ember build
echo 'Compiled to dist/assets/app.js';

cp dist/assets/app.js "${APP_JS_PATH}/rackham.js";
echo "Copied dist/assets/app.js to ${APP_JS_PATH}";
