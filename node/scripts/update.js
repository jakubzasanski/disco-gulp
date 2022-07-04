/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import cp from "child_process";
import log from "fancy-log";

// #####################################################################################################################

import config from "../config.js";

// #####################################################################################################################

log(`Install latest npm and npm-check-updates versions...`);
cp.execSync("npm install --location=global npm@latest npm-check-updates@latest", config.execOptions);

log('Upgrade all version hints in `package.json`...');
cp.execSync("ncu -u", config.execOptions);

log('Install new packages from `package.json`...');
cp.execSync("npm update", config.execOptions);

log('Create shrinkwrap file...');
cp.execSync("npm shrinkwrap", config.execOptions);

// EOF
