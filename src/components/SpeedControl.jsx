function SpeedControl({ speed, setSpeed }) {
    const minSpeed = 0;
    const maxSpeed = 180;

    return (
        <div className="speed-control">
            <label htmlFor="speed-slider">
                走行速度を調整
            </label>

            <input
                id="speed-slider" 
                type="range"
                min={minSpeed}
                max={maxSpeed}
                step="1"
                value={speed}
                onChange={(e) => 
                    setSpeed(Number(e.target.value))
                } 
            />

            <div className="speed-buttons">
                <button
                    type="button"
                    disabled={ speed <= minSpeed}
                    onClick={() =>
                        setSpeed((prev) => Math.max(minSpeed, prev - 1))
                }>
                    -1 km/h
                </button>

                <button
                    type="button"
                    disabled={ speed >= maxSpeed}
                    onClick={() =>
                        setSpeed((prev) => Math.min(maxSpeed, prev + 1))
                     }
                >
                    +1 km/h
                </button>
            </div>
        </div>
    )
}

export default SpeedControl;
