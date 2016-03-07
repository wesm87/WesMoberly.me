(function() {
    function vendorModule() {
        'use strict';

        return {
            'default': window['Tether']
        };
    }

    define( 'tether', [], vendorModule );
})();
