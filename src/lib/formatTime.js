function formatTime(seconds) {
  let left = seconds;
  let hours = Math.floor(seconds / 60 / 60);
  left -= hours * 60 * 60;

  let minutes = Math.floor(left / 60);
  left -= minutes * 60;

  seconds = left;

  let parts;

  if (hours > 0) {
    parts = [hours, minutes, seconds];
  } else {
    parts = [minutes, seconds];
  }

  parts = parts.map((part) => part.toString());
  parts = parts.map((part) => {
    if (part.length < 2) {
      return "0" + part;
    }
    return part;
  });

  return parts.join(":");
}

module.exports = formatTime;
