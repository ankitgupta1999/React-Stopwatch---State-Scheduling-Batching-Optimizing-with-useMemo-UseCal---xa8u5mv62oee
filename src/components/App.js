const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const startTimer = () => {
    if (intervalRef.current !== 0) {
      return;
    }

    startTime.current = Date.now() - currentTime;
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime.current);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  };

  const addLap = () => {
    const lapTime = formatTime(currentTime);
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    setCurrentTime(0);
    setLaps([]);
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">{formatTime(currentTime)}</h1>
        <section className="buttons">
          <button className="start-btn" onClick={startTimer}>
            START
          </button>
          <button className="stop-btn" onClick={stopTimer}>
            STOP
          </button>
          <button className="lap-btn" onClick={addLap}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetTimer}>
            RESET
          </button>
        </section>
      </section>
      {laps.length > 0 && (
        <section className="lap-section">
          <h2>Laps</h2>
          <section className="laps">
            {laps.map((lap, index) => (
              <p key={index}>{lap}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  );
};


export default App;
