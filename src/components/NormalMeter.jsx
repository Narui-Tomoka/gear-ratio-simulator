import SpeedInput from "./SpeedInput";

function NormalMeter({ speed, setSpeed, rpm, selectedGear }) {
    const maxRpm = 9000;
    const displayRpm = Math.max(0, rpm);

    // SVG内の円の中心と半径
    const cx = 200
    const cy = 165;
    const radius = 112;

    // メーターの開始・終了角度
    const startAngle = 140;
    const endAngle = 400;

    const getPoint = (angle, r) => {
        const radian = (angle * Math.PI) / 180;

        return {
            x: cx + Math.cos(radian) * r,
            y: cy + Math.sin(radian)* r
        };
    };

    // 円弧を描くための関数
    const createArc = (start, end, r) => {
        const startPoint = getPoint(start, r);
        const endPoint = getPoint(end, r);
        const largeArc = end - start > 180 ? 1 : 0;

        return `M ${startPoint.x} ${startPoint.y}
        A ${r} ${r} 0 ${largeArc} 1
        ${endPoint.x} ${endPoint.y}`;
    };

    const progress = Math.min(displayRpm / maxRpm, 1);
    const currentAngle = 
        startAngle + (endAngle - startAngle) * progress;

    const ticks = Array.from({ length: 10}, (_, index) => {
        const angle = 
            startAngle + (endAngle - startAngle) * (index / 9);
        
        return {
        value: index,
        angle
        };
    });

    return (
    <div className="normal-meter">
        <svg
            viewBox="0 0 400 330"
            className="meter-svg"
            aria-label="エンジン回転数メーター"
        >
        {/* 背景の円弧 */}
        <path
            d={createArc(startAngle, endAngle, radius)}
            fill="none"
            stroke="#424a54"
            strokeWidth="5"
        />

        {/* 回転数に応じた円弧 */}
        {progress > 0 && (
            <path
                d={createArc(startAngle, currentAngle, radius)}
                fill="none"
                stroke={rpm >= 7400 ? "#ff4257" : "#ed6473"}
                strokeWidth="5" 
            />
        )}

        {/* 0~9の数字と目盛り */}
        {ticks.map((tick) => {
            const outer = getPoint(tick.angle, radius - 10);
            const inner = getPoint(tick.angle, radius - 22);
            const label = getPoint(tick.angle, radius - 40);

            return (
                <g key={tick.value}>
                    <line
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        stroke={
                            displayRpm >= tick.value * 1000
                                ? "#ffffff"
                                : "#75808e"
                        }
                        strokeWidth="2"
                    />

                    <text
                        x={label.x}
                        y={label.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#ffffff"
                        fontSize="17"
                    >
                        {tick.value}
                    </text>
                </g>
            );
        })}

        {/* 中央の回転数表示 */}
        <text
            x={cx}
            y="115"
            textAnchor="middle"
            fill="#cbd1da"
            fontSize="12"
        >
            ENGINE SPEED
        </text>

        <text
            x={cx}
            y="143"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="24"
            fontWeight="bold"
        >
        {Math.round(rpm).toLocaleString("ja-JP")}
        </text>

        <text
            x={cx}
            y="160"
            textAnchor="middle"
            fill="#a7b0bd"
            fontSize="12"
        >
            rpm
        </text>

        {/* 現在のギア */}
        <text
            x={cx}
            y="239"
            textAnchor="middle"
            fill="#f3b4bc"
            fontSize="24"
            fontWeight="bold"
        >
            {selectedGear}
        </text>
    </svg>

    <div className="meter-speed">
        <SpeedInput speed={speed} setSpeed={setSpeed} />    
    </div>
    </div>
    );
}

export default NormalMeter;
