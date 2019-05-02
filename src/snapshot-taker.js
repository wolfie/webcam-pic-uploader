const Webcam = require("node-webcam");
const fs = require("fs");

/**
 * @param {any} fnCandidate
 * @returns {function}
 */
const fn = fnCandidate =>
  (typeof fnCandidate === "function" && fnCandidate) || (() => {});

class SnapshotTaker {
  /** @param {Error} error */
  onError = error => {};

  /** @param {Buffer} buffer */
  onSnapshotBuffer = buffer => {};

  cam = Webcam.create({
    width: 800,
    height: 600,
    quality: 80,
    delay: 3,
    saveShots: false,
    output: "jpeg",
    callbackReturn: "buffer"
  });

  takeSnapshot = () => {
    this.cam.capture(".picture.jpg", (err, buffer) => {
      if (err) {
        this.onError(err);
        return;
      } else {
        this.onSnapshotBuffer(buffer);
      }
    });
  };
}

module.exports = SnapshotTaker;
