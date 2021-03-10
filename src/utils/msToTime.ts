const msToTime = (ms: number) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);

  const formatedSeconds = seconds.toLocaleString('fr-FR', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return `${minutes}:${formatedSeconds}`;
};

export default msToTime;
