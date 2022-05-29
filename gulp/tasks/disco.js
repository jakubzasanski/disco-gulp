
/**
 * @author Jakub Zasański <jakub.zasanski.dev@gmail.com>
 * @version 1.0.0
 */

// #####################################################################################################################

/**
 *
 */
function welcome(done) {
    console.log("");
    console.log("  ___ ___ ___  ___ ___     ___ _   _ _    ___ ");
    console.log(" |   \\_ _/ __|/ __/ _ \\   / __| | | | |  | _ \\");
    console.log(" | |) | |\\__ \\ (_| (_) | | (_ | |_| | |__|  _/");
    console.log(" |___/___|___/\\___\\___/   \\___|\\___/|____|_|  ");
    console.log("                                              ");
    console.log("");

    done();
}

// #####################################################################################################################

welcome.displayName = "welcome";
welcome.description = "Prints welcome section to the console.";
export {welcome};
export default welcome;

// #####################################################################################################################

// EOF
