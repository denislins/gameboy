module.exports = {
  "extends": "airbnb-base",
  "globals": {
    "fetch": false,
    "FileReader": false,
    "requestAnimationFrame": false,
    "cancelAnimationFrame": false,
  },
  "rules": {
    "import/extensions": ["error", "always"],
    "no-bitwise": "off",
    "no-plusplus": "off",
    "class-methods-use-this": "off",
    "no-console": "off",
  },
};
