/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.1.0
 */

// #####################################################################################################################

import chalk from "chalk";

/**
 *
 */
function disco(done) {

    const text = [
        "###################################################",
        "#   ___ ___ ___  ___ ___     ___ _   _ _    ___   #",
        "#  |   \\_ _/ __|/ __/ _ \\   / __| | | | |  | _ \\  #",
        "#  | |) | |\\__ \\ (_| (_) | | (_ | |_| | |__|  _/  #",
        "#  |___/___|___/\\___\\___/   \\___|\\___/|____|_|    #",
        "###################################################"
    ];

    console.log("");
    for(let line of text) {
        console.log(colors(line));
    }
    console.log("");

    done();
}

// #####################################################################################################################

/**
 *
 * @param string
 * @returns {string}
 */
function colors(string = ''){
    const color = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];

    let output = '';
    for(const char of string){
        output += chalk[color[Math.floor(Math.random() * color.length)]](char);
    }
    return output;
}

// #####################################################################################################################

disco.displayName = "disco";
disco.description = "Prints disco.";
export {disco};
export default disco;

// #####################################################################################################################

// EOF
