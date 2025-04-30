const net = require('net');

const client = new net.Socket();
client.connect(5001, '127.0.0.1', () => {
  const hex =
    '787840a219040f0a202dc000ab769c081c3bfa000c0002dc7b00000c25000000000027a30311000000400300010000440800000000086382907928606602000001bbd80d0a';
  const buffer = Buffer.from(hex, 'hex');
  client.write(buffer);
  client.end();
});
