let conversion = {
    "Advent": "Shul Calendar",
    "Christmas": "Chanuka",
    "Santa": "The Rebbe",
    "elf": "chossid",
    "elves'": "chassidim's",
    "elves": "chassidim",
    "reindeer": "Moshiach's donkey",
    "stars": "Chanuka candles",
    "star": "Chanuka candle"
}

// Optimisations so we don't do this every time the function is called
conversion = Object.entries(conversion).map(([from, to]) => [new RegExp(`\\b${from}\\b`, 'ig'), to]);

/**
 * 
 * @param {Node} node 
 */
function processNode(node) {
    if (node instanceof Text)
        node.textContent = fix(node.textContent);
    else
        node.childNodes.forEach(processNode);
}

/**
 * 
 * @param {string} text 
 */
function fix(text) {
    return conversion.reduce(
        (txt, [from, to]) => txt.replaceAll(from, (match) => match[0] === match[0].toUpperCase() ? `${to[0].toUpperCase()}${to.slice(1)}` : to), 
        text
    );
}

processNode(document);