/**
 * @config.js
 * This config page is used to declare server configurations
 *
 */

var environment = "local";
var configurations = {};
configurations.loadConfigurations = loadConfigurations;
var configuration = {};


function loadConfigurations() {

    if (environment == 'local') {
        configuration.apiUrl = "http://localhost:4000";
        configuration.clientApiUrl = "http://localhost:4200";
        configuration.clientApiBaseUrl = "http://localhost:4200";
        configuration.port = 3000
    }
    function genRandomString(length) {
        var result = '';
        var characters = 'abcdef0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            if (result.length == 8) {
                result = result + "-"
            } else if (result.length == 13) {
                result = result + "-"
            } else if (result.length == 18) {
                result = result + "-"
            }
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    configuration.genRandomString=genRandomString;
    return configuration;
}
module.exports = configurations;