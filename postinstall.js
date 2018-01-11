#!/usr/bin/env node

"use strict";

// CLI options

const NOT_SILENT = process.argv.indexOf( "--silent" ) === -1;
const CWD = process.argv.indexOf( "--cwd" ) === -1;
const MODULE = process.argv.indexOf( "--module" );

// Dependencies

const existsSync = require( "fs" ).existsSync;
const readFileSync = require( "fs" ).readFileSync;
const execSync = require( "child_process" ).execSync;
const join = require( "path" ).join;
const satisfies = require( "semver" ).satisfies;

// Settings

const $module = MODULE !== -1 ? process.argv[ MODULE + 1 ]
    : CWD ? process.cwd()
    : join( __dirname, "..", ".." );

const $node_modules = join( $module, "node_modules" );
const $package = join( $module, "package.json" );

const $dependencies = {

    parent: {},

    required: [

        "@babel/runtime",
        "@babel/polyfill",
        "core-js",
        "regenerator-runtime",

    ],

};

const $config = {

    stdio: "inherit",
    cwd: $module,

};

// Helpers

function debug( $message ) {

    if ( NOT_SILENT ) console.log( "es-runtime: " + $message );

}

function readJSON( $filename ) {

    return JSON.parse( readFileSync( $filename, "utf8" ) );

}

function install( $dependency, $version ) {

    const $package = join( $node_modules, $dependency, "package.json" );
    const $semver = $version !== "*" && $version !== "latest";

    if ( existsSync( $package ) ) {

        const $current = readJSON( $package ).version;
        if ( $semver && ! satisfies( $current, $version ) ) {

            debug( `Version ${ $version } of ${ $dependency } is required, but ${ $current } is installed instead.` );
            process.exit( 1 );

        }

    } else {

        const $data = $dependency + ( $semver ? "@" + $version : "" );
        debug( "Adding " + $data );
        execSync( "npm install " + $data, $config );

    }

}

// Main

if ( MODULE === -1 && process.cwd() === __dirname ) {

    debug( `Cannot run in ${ __dirname }` );
    process.exit( 0 );

}

if ( existsSync( $package ) ) {

    $dependencies.parent = readJSON( $package ).dependencies || {};

}

$dependencies.required.forEach( $dependency => {

    install( $dependency, $dependencies.parent[ $dependency ] || "*" );

} );
