import { useEffect, useState } from "react";

function SpeedInput({ speed, setSpeed }) {
    const [inputValue, setInputValue] = useState(String(speed));

    useEffect(() => {
        setInputValue(String(speed));
    }, [speed]);

    const handleChange = (e) => {
        const value = e.target.value;

        setInputValue(value);

        if (
            Number.isInteger(number) &&
            number >= 0 && 
            number <= 180
        ) {
            setSpeed(number);
        }
    };

    const handleBlur = () => {
        setInputValue(String(speed));
    };

    return (
        <div className="speed-input">
            <input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur} // 入力欄からフォーカスが外れた時に呼ばれるイベント
                aria-label="走行速度"
            />
            <span>km/h</span>
        </div>
    )
}

export default SpeedInput;
