#################################################
# Assemble and minify PureLib.js files.         #
# Require node.js and npm                       #
#################################################

#################################################
# Config                                        #
#################################################

SRC_FOLDER := src
SRC_ES5_FOLDER := src/es5
SRC_ES6_FOLDER := src/es6

SRC_CORE_JS_FILE := ${SRC_FOLDER}/core.js
SRC_ES5_FILES := ${shell find ${SRC_ES5_FOLDER} -type f -name '*.js'}
SRC_ES6_FILES := ${shell find ${SRC_ES6_FOLDER} -type f -name '*.js'}

DOC_FOLDER := doc
DIST_JS_FOLDER := dist
DIST_JS_ES5_FILE := ${DIST_JS_FOLDER}/purelib-es5.js
DIST_JS_ES5_MIN_FILE := ${DIST_JS_FOLDER}/purelib-es5.min.js
DIST_JS_ES6_FILE := ${DIST_JS_FOLDER}/purelib-es6.js
DIST_JS_ES6_MIN_FILE := ${DIST_JS_FOLDER}/purelib-es6.min.js
DIST_JS_FULL_FILE := ${DIST_JS_FOLDER}/purelib-full.js
DIST_JS_FULL_MIN_FILE := ${DIST_JS_FOLDER}/purelib-full.min.js

STRIP_COMMENT_MULTILINE_JS_SED := sed -r ':a; s%(.*)/\*.*\*/%\1%; ta; /\/\*/ !b; N; ba'
STRIP_COMMENT_LINE_JS_SED := sed -r '/\/\/.*$$/d'
STRIP_EMPTY_LINE_SED := sed -r '/^(\s|\t)*$$/d'
STRIP_ALL_SED := ${STRIP_COMMENT_MULTILINE_JS_SED} | ${STRIP_COMMENT_LINE_JS_SED} | ${STRIP_EMPTY_LINE_SED}


#################################################
# Tasks                                         #
#################################################

# ES5
## join ES5 js files in purelib-es5.js
join-es5:
	cat ${SRC_CORE_JS_FILE} ${SRC_ES5_FILES} | ${STRIP_ALL_SED} > ${DIST_JS_ES5_FILE}

## minify the es5 lib
minify-es5: join-es5
	uglifyjs ${DIST_JS_ES5_FILE} > ${DIST_JS_ES5_MIN_FILE}

## build es-5
build-es5: minify-es5

# ES6
## join ES6 js files in purelib-es6.js
join-es6:
	cat ${SRC_CORE_JS_FILE} ${SRC_ES6_FILES} | ${STRIP_ALL_SED} > ${DIST_JS_ES6_FILE}

## minify the es6 lib
minify-es6: join-es6
	uglifyjs ${DIST_JS_ES6_FILE} > ${DIST_JS_ES6_MIN_FILE}

## build es-6
build-es6: minify-es6

# full
join-full:
	cat ${SRC_CORE_JS_FILE} ${SRC_ES5_FILES} ${SRC_ES6_FILES} | ${STRIP_ALL_SED} > ${DIST_JS_FULL_FILE}

## minify the es6 lib
minify-full: join-full
	uglifyjs ${DIST_JS_FULL_FILE} > ${DIST_JS_FULL_MIN_FILE}

## build es-6
build-full: minify-full

build: build-es5 build-es6 build-full

install-dependencies:
	sudo npm install -g jsdoc mishoo/UglifyJS2#harmony

doc:
	jsdoc -r ${SRC_FOLDER} -d ${DOC_FOLDER}

.PHONY: build build-full build-es6 build-es5 doc install-dependencies