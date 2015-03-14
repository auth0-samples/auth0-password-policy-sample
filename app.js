// Auth0 variable in global scope for JSONP
var Auth0 = {
    client: {},
    setClient: function (e) { this.client = e }
};

$(document).ready(function () {
    function clientOptionsUrl(clientId) {
        return 'https://cdn.auth0.com/client/' + clientId + '.js';
    }

    function getClientData(clientId, done) {
        var jsonp = document.createElement('script');
        jsonp.src = clientOptionsUrl(clientId);
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(jsonp, firstScript);
        jsonp.addEventListener('load', done);
    }

    function postClientData () {
        function getPolicy (connection) {
            var dbConnections = _.findWhere(Auth0.client.strategies, {name: 'auth0'}).connections;
            return _.findWhere(dbConnections, {name: connection}).passwordPolicy;
        }
        // Change this to use an arbitrary database connection
        var policy = getPolicy('OWASP-PW-Policy-DB');
        $('#policy').html('Password policy set to <code>' + policy + '</code>');

        var sheriff = new PasswordPolicy(policy);
        $("input[type='password']").on('input change paste', function () {
            if (sheriff.check(this.value)) {
                this.style.backgroundColor = 'green';
            } else {
                this.style.backgroundColor = 'red';
            }
        });
    }

    // Change this to use your own client ID
    getClientData('jGMow0KO3WDJELW8XIxolqb1XIitjkYL', postClientData);
});
