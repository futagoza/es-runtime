#!/usr/bin/env node

"use strict";

// CLI options

const NOT_SILENT = process.argv.indexOf( "--silent" ) === -1;
const MODULE = process.argv.indexOf( "--module" );
const NO_SAVE = process.argv.indexOf( "--save" ) === -1;

// Dependencies

const existsSync = require( "fs" ).existsSync;
const readFileSync = require( "fs" ).readFileSync;
const writeFileSync = require( "fs" ).writeFileSync;
const execSync = require( "child_process" ).execSync;
const join = require( "path" ).join;
const satisfies = require( "semver" ).satisfies;

// Settings

const $cwd = process.cwd();
const $module = MODULE !== -1 ? process.argv[ MODULE + 1 ]
    : __dirname !== $cwd ? $cwd
    : join( __dirname, "..", ".." );

const $node_modules = join( $module, "node_modules" );
const $package = join( $module, "package.json" );

const $dependencies = {

    parent: {},

    required: require( "./package.json" ).requiredDependencies,

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

let $packageData;

if ( MODULE === -1 && __dirname === $cwd && $cwd === $module ) process.exit( 0 );

if ( ! existsSync( $package ) ) {

    debug( `Unless a 'package.json' exists, cannot run in ${ $module }` );
    process.exit( 0 );

}

$dependencies.parent = readJSON( $package ).dependencies || {};
if ( NO_SAVE ) $packageData = readFileSync( $package, "utf8" );

$dependencies.required.forEach( $dependency => {

    install( $dependency, $dependencies.parent[ $dependency ] || "*" );

} );

if ( NO_SAVE ) writeFileSync( $package, $packageData, "utf8" );
