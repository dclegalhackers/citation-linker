/*  supported types. from: https://github.com/unitedstates/citation/blob/master/citation.js#L220-L229

    Citation.types.usc = require("./citations/usc");                  // yes
    Citation.types.law = require("./citations/law");                  // todo
    Citation.types.cfr = require("./citations/cfr");                  // yes
    Citation.types.va_code = require("./citations/va_code");          // todo
    Citation.types.dc_code = require("./citations/dc_code");          // yes
    Citation.types.dc_register = require("./citations/dc_register");  // todo
    Citation.types.dc_law = require("./citations/dc_law");            // todo
    Citation.types.stat = require("./citations/stat");                // todo

*/

var citation = require("citation");

var CitationLinker = {
  usc: function (citation) {
    return "http://www.law.cornell.edu/uscode/text/" + citation.usc.title + "/" + citation.usc.section;
  },

  cfr: function (citation) {
    return "http://www.law.cornell.edu/cfr/text/" + citation.cfr.title + "/" + citation.cfr.part;
  },

  dc_code: function (citation) {
    return "http://dccode.org/browser/#/" + citation.dc_code.title + "/" + citation.dc_code.title + "-" + citation.dc_code.section;
  }
};

function makeUrl(citation) {
  if (CitationLinker[citation.type]) return CitationLinker[citation.type](citation)

  // if no match, silently default to the plain text
  else return citation.match;
}

function addCitationLinks(text) {
  return Citation.find(text).citations.reduce(function(memo, citation) {
    return memo.replace(citation.match,
      "[" + citation.match + "]" + "(" + makeUrl(citation) + ")");
  }, text);
}

// Lets you add the citation linker to a Pagedown converter
function addCitationLinkerToPagedownConverter(converter) {
  converter.hooks.chain("preConversion", addCitationLinks);
}

exports.addCitationLinks = addCitationLinks;
exports.addCitationLinkerToPagedownConverter = addCitationLinkerToPagedownConverter;
