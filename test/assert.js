"use strict";

const assert = require( "assert" );
const existsSync = require( "fs" ).existsSync;
const join = require( "path" ).join;

const $dependencies = require( "../package.json" ).requiredDependencies;
const $node_modules = join( __dirname, "node_modules" );

$dependencies.forEach( $dependency => {

    const $package = join( $node_modules, $dependency );

    assert(
        existsSync( $package ),
        "Could not find " + $package
    );

} );
