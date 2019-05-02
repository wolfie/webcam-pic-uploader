const SnapshotTaker = require("./snapshot-taker");
const FileSender = require("./file-sender");

const fileSender = new FileSender({
  uri: "http://localhost/image.jpg",
  headers: { "x-shared-secret": 1 }
});

const snapshotTaker = new SnapshotTaker();
snapshotTaker.onError = err => console.error(err);
snapshotTaker.onSnapshotBuffer = buffer => fileSender.send(buffer);

snapshotTaker.takeSnapshot();
