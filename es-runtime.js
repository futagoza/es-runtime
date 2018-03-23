#!/usr/bin/env node

"use strict";

// CLI options

const NOT_SILENT = process.argv.indexOf( "--silent" ) === -1;
const MODULE_INDEX = process.argv.indexOf( "--module" );
const NO_SAVE = process.argv.indexOf( "--save" ) === -1;
const USE_NPM = process.argv.indexOf( "--yarn" ) === -1;

// Dependencies

const join = require( "path" ).join;
const existsSync = require( "fs" ).existsSync;
const readFileSync = require( "fs" ).readFileSync;
const writeFileSync = require( "fs" ).writeFileSync;
const unlinkSync = require( "fs" ).unlinkSync;
const execSync = require( "child_process" ).execSync;
const satisfies = require( "semver" ).satisfies;

// Settings

const $cwd = process.cwd();
const $module = MODULE_INDEX >= 0 ? process.argv[ MODULE_INDEX + 1 ]
    : __dirname !== $cwd ? $cwd
    : join( __dirname, "..", ".." );

const $node_modules = join( $module, "node_modules" );
const $package = join( $module, "package.json" );
const $lockfile = USE_NPM
    ? join( $module, "package-lock.json" )
    : join( $module, "yarn.lock" );

const $dependencies = {

    parent: {},

    required: require( "./package.json" ).requiredDependencies,

};

// Helpers

function debug( $message ) {

    if ( NOT_SILENT ) console.log( "es-runtime: " + $message );

}

function readJSON( $filename ) {

    return JSON.parse( readFileSync( $filename, "utf8" ) );

}

function command( $data ) {

    return USE_NPM
        ? "npm install " + $data
        : "yarn add " + $data;

}

function install( $dependency, $version ) {

    const $package = join( $node_modules, $dependency, "package.json" );
    const HAS_VERSION = $version !== "*" && $version !== "latest";

    if ( existsSync( $package ) ) {

        const $current = readJSON( $package ).version;
        if ( HAS_VERSION && ! satisfies( $current, $version ) ) {

            debug( `Version ${ $version } of ${ $dependency } is required, but ${ $current } is installed instead.` );
            process.exit( 1 );

        }

    } else {

        const $data = $dependency + ( HAS_VERSION ? "@" + $version : "" );
        debug( "Adding " + $data );
        execSync( command( $data ), {

            stdio: "inherit",
            cwd: $module,

        } );

    }

}

// Main

if ( MODULE_INDEX === -1 && __dirname === $cwd && $cwd === $module ) process.exit( 0 );

if ( ! existsSync( $package ) ) {

    debug( `Unless a 'package.json' exists, cannot run in ${ $module }` );
    process.exit( 0 );

}

let $packageData, $lockfileData;

$dependencies.parent = readJSON( $package ).dependencies || {};
if ( NO_SAVE ) {

    $packageData = readFileSync( $package );

    if ( existsSync( $lockfile ) )
        $lockfileData = readFileSync( $lockfile );

}

$dependencies.required.forEach( $dependency => {

    install( $dependency, $dependencies.parent[ $dependency ] || "*" );

} );

if ( NO_SAVE ) {

    writeFileSync( $package, $packageData );

    if ( $lockfileData )
        writeFileSync( $lockfile, $lockfileData );

    else if ( existsSync( $lockfile ) )
        unlinkSync( $lockfile );

}
