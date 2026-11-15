import { useState } from "react";
import { vehicles } from "./data/vehicles";
import { calculateTire } from "./utils/calculateTire";
import { calculateRpm } from "./utils/calculateRpm";

import SpeedControl from "./components/SpeedControl";
import GearControl from "./components/GearControl";
import NormalMeter from "./components/NormalMeter";

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
    <main className="app">
      <header className="app-header">
        <h1>Gear Ratio Simulator</h1>

        <p>{vehicle.manufacturer} {vehicle.name}</p>
        <p>{vehicle.grade} / {vehicle.transmisson}</p>
      </header>

      <NormalMeter
        speed={speed}
        setSpeed={setSpeed}
        rpm={rpm}
        selectedGear={selectedGear}
      />

      <SpeedControl
        speed={speed}
        setSpeed={setSpeed}
      />

      <GearControl
        gears={vehicle.gears}
        selectedGear={selectedGear}
        setSelectedGear={setSelectedGear}
      />

      <p className="calculation-note">
        ※ エンジン回転数はタイヤの理論外周から算出した参考値です。
      </p>
    </main>
  )
}

export default App;
