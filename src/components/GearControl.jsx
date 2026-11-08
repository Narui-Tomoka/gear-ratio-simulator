function GearControl({ gears, selectedGear, setSelectedGear }) {
    return (
        <div className="gear-control">
            <p>ギアを選択</p>

            <div className="gear-buttons">
                {gears.map((_, index) =>{
                    const gearNumber = index + 1;

                    return (
                        <button
                            key={gearNumber}
                            type="button"
                            className={
                                selectedGear === gearNumber ? "active" : ""
                            }
                            aria-pressed={selectedGear === gearNumber}
                            onClick={() => setSelectedGear(gearNumber)}
                        >
                            {gearNumber}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

export default GearControl;
