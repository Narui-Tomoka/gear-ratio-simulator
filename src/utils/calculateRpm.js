export function calculateRpm(speed, gearRatio, finalDrive, circumference) {
    // 時速(km/h)を分速(m/min)へ変換
    const speedPerMinute = (speed * 1000) / 60;

    // タイヤの1分間あたりの回転数
    const tireRpm = speedPerMinute / circumference;

    // エンジン回転数
    const engineRpm = tireRpm * gearRatio * finalDrive;

    return engineRpm;
}