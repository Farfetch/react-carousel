function checkSnapSupport() {
    return (
        'scrollSnapAlign' in document.documentElement.style ||
        'webkitScrollSnapAlign' in document.documentElement.style ||
        'msScrollSnapAlign' in document.documentElement.style
    );
}

export default checkSnapSupport;
