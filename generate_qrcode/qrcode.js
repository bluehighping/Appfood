const QRCode = require('qrcode');

QRCode.toFile('qrcode.png', 'https://68f9-223-24-189-250.ngrok-free.app', function (err) {
  if (err) throw err;
  console.log('QR Code created!');
});
