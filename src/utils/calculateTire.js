export function calculateTire(tire) {
    const { width, aspectRatio, rimDiameter } = tire;

    // タイヤ片側の高さ(mm)
    const sidewallHeight = width * (aspectRatio / 100);

    // ホイールの直径(mm)
    const rimDiameterMn = rimDiameter * 25.4;

    // タイヤの理論外径(mm)
    const tireDiameter = rimDiameterMn + sidewallHeight * 2;

    // タイヤの理論外周(m)
    const circumference = (tireDiameter * Math.PI) / 1000;

    return {
        diameter: tireDiameter,
        circumference: circumference
    };
}