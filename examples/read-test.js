const gpio = require('rpi-gpio');
const READ_PIN = 26;
const READ_INTERVAL = 100; // 10 reads/second

gpio.setMode(gpio.MODE_BCM);
gpio.setup(READ_PIN, gpio.DIR_IN, readInput);

function readInput() {
  setInterval(() => {
    gpio.read(READ_PIN, (err, value) => {
      if (value === false) {
        console.log('triggered');
      }
    });
  }, READ_INTERVAL);
}
