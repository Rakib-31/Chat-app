let expect = require('expect');

var {generatedMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", () => {
        let from = "wdj",
            text = "some random text"
            message = generatedMessage(from, text);

        expect(typeof message.createdAt).type('number');
        expect(message).toMatchObject({from, text});
    });
});