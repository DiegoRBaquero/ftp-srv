const when = require('when');
const {expect} = require('chai');
const sinon = require('sinon');

const CMD = 'TYPE';
describe(CMD, function () {
  let sandbox;
  const mockClient = {
    reply: () => when.resolve()
  };
  const cmdFn = require(`../../../src/commands/registration/${CMD.toLowerCase()}`).handler.bind(mockClient);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    mockClient.encoding = null;
    sandbox.spy(mockClient, 'reply');
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('A // successful', () => {
    return cmdFn({ command: { arg: 'A' } })
    .then(() => {
      expect(mockClient.reply.args[0][0]).to.equal(200);
      expect(mockClient.encoding).to.equal('utf8');
    });
  });

  it('I // successful', () => {
    return cmdFn({ command: { arg: 'I' } })
    .then(() => {
      expect(mockClient.reply.args[0][0]).to.equal(200);
      expect(mockClient.encoding).to.equal('binary');
    });
  });

  it('L // successful', () => {
    return cmdFn({ command: { arg: 'L' } })
    .then(() => {
      expect(mockClient.reply.args[0][0]).to.equal(200);
      expect(mockClient.encoding).to.equal('binary');
    });
  });

  it('X // successful', () => {
    return cmdFn({ command: { arg: 'X' } })
    .then(() => {
      expect(mockClient.reply.args[0][0]).to.equal(501);
      expect(mockClient.encoding).to.equal(null);
    });
  });
});