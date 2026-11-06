import { vehicles } from "./data/vehicles";

function App() {
  const vehicle = vehicles[0];

  return (
    <main>
      <h1>Gear Ratio Simulator</h1>
      <p>{vehicle.manufacturer} {vehicle.name}</p>
      <p>{vehicle.grade} / {vehicle.transmisson}</p>
    </main>
  )
}

export default App;
