(function () {
    let idleDurationSecs = 600;    // X number of seconds
    let redirectUrl = '/';  // Redirect idle users to this URL
    let idleTimeout; // variable to hold the timeout, do not modify

    const resetIdleTimeout = function () {

        // Clears the existing timeout
        if (idleTimeout) clearTimeout(idleTimeout);

        // Set a new idle timeout to load the redirectUrl after idleDurationSecs
        idleTimeout = setTimeout(() => {
            if (location.pathname !== redirectUrl)
                location.href = redirectUrl
        }, idleDurationSecs * 1000);
    };

    // Init on page load
    resetIdleTimeout();

    // Reset the idle timeout on any of the events listed below
    document.addEventListener('click touchstart mousemove', resetIdleTimeout, true);
})();