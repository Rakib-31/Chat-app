let expect = require('expect');

var {generatedMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", () => {
        let from = "wdj",
            text = "some random text"
            message = generatedMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('Generate Location Message', () => {
    it("should generate correct location object", () => {
        let from = "clairer",
            lat = 15,
            long = 56,
            url = `https://www.google.com/maps?q=${lat}, ${long}`
            message = generateLocationMessage(from, lat, long);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});