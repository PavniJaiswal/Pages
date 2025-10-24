// Polyfills for browser compatibility

// Polyfill for require (used by some React Navigation modules)
if (typeof global === 'undefined') {
  window.global = window;
}

// Add a dummy require function for conditional checks
if (typeof window.require === 'undefined') {
  window.require = function(moduleName) {
    console.warn(`Module '${moduleName}' was required but not available in browser context`);
    return {};
  };
}

// Ensure process is available
if (typeof process === 'undefined') {
  window.process = { env: {} };
}

