// Source: https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available#answer-16427725
isLocalStorageEnabled = function() {
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('feature_test', 'yes');
            if (localStorage.getItem('feature_test') === 'yes') {
                localStorage.removeItem('feature_test');
                return true;
            }
        } catch(e) {
            // Not available...
        }
    }
    return false;
}
