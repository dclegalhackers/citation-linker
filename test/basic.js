// setup citation linker
var citationLinker = require('../lib/citation-linker'),
    pagedown = require('pagedown'),
    fs = require('fs'),
    expect = require('expect.js'),
    safeConverter = pagedown.getSanitizingConverter();
citationLinker.addCitationLinkerToPagedownConverter(safeConverter);


// tests, one per citation type

describe('addCitationLinks', function() {
    it('adds citation links to an example', function() {
        expect(citationLinker.addCitationLinks(
            fs.readFileSync('test/data/example.txt', 'utf8')))
                .to.eql(fs.readFileSync('test/data/example.result', 'utf8'));
    });
});
