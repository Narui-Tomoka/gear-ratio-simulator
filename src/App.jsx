import { useState } from "react";
import { vehicles } from "./data/vehicles";
import { calculateTire } from "./utils/calculateTire";
import { calculateRpm } from "./utils/calculateRpm";

function App() {
  const vehicle = vehicles[0];
  const tireResult = calculateTire(vehicle.tire);

  const [speed, setSpeed] = useState(60);
  const [selectedGear, setSelectedGear] = useState(3);

  const gearRatio = vehicle.gears[selectedGear - 1];
  const rpm = calculateRpm(
            speed,
            gearRatio,
            vehicle.finalDrive,
            tireResult.circumference
          );

  return (
    <main>
      <h1>Gear Ratio Simulator</h1>

      <h2>{vehicle.manufacturer} {vehicle.name}</h2>
      <p>{vehicle.grade} / {vehicle.transmisson}</p>

      <div>
        <h3>走行速度</h3>

        <input type="number"
        min="0"
        max="180"
        step="1"
        value={speed}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (Number.isInteger(value) && value >= 0 && value <= 180) {
            setSpeed(value);
          }
        }}
        aria-label="走行速度を入力"
        />

        <span> km/h</span>

        <input
          type="range"
          min="0"
          max="180"
          step="1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          aria-label="走行速度をスライダーで変更"
         />
      </div>

      <button
        type="button"
        onClick={() => setSpeed((prev) => Math.max(0, prev - 1))}
        disabled={speed <= 0}
        >
          -1
        </button>

      <button
        type="button"
        onClick={() => setSpeed((prev) => Math.min(180, prev + 1))}
        disabled={speed >= 180}
      >
        +1
      </button>

      <div>
        <h3>ギア選択</h3>

        {vehicle.gears.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedGear(index + 1)}
            aria-pressed={selectedGear === index + 1}
          >
            {index + 1}速
          </button>
        ))}
      </div>

      <div>
        <h3>エンジン回転数</h3>
        <p>{Math.round(rpm)} rpm</p>
      </div>

    </main>
  )
}

export default App;
