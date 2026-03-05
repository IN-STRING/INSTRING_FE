import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Polygon } from 'react-native-svg';

interface Props {
  value?: number;
  size?: number;
}

export const HumidityGauge: React.FC<Props> = ({
  value = 100,
  size = 260,
}) => {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // 화살표가 선보다 '살짝 안쪽'에 있게 하기 위해 반지름을 더 줄입니다.
  const arrowRadius = radius - 22; // 숫자를 키울수록 화살표가 안쪽으로 들어옵니다.

  const startAngle = 150; 
  const sweepAngle = 240;
  const endAngle = startAngle + (value / 100) * sweepAngle;

  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, r: number, start: number, end: number): string => {
    const startPos = polarToCartesian(x, y, r, start);
    const endPos = polarToCartesian(x, y, r, end);
    const largeArcFlag = end - start <= 180 ? "0" : "1";
    return [
      "M", startPos.x, startPos.y,
      "A", r, r, 0, largeArcFlag, 1, endPos.x, endPos.y
    ].join(" ");
  };

  const backgroundPath = describeArc(center, center, radius, 150, 390);
  const progressPath = describeArc(center, center, radius, 150, endAngle);

  // 화살표 위치 계산 (arrowRadius 사용)
  const cursorPoint = polarToCartesian(center, center, arrowRadius, endAngle);

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>습도</Text>
      <View style={styles.svgContainer}>
        <Svg width={size} height={size}>
          <Defs>
            {/* 그라데이션 ID를 하나만 만들어서 고정 사용 */}
            <LinearGradient 
              id="fixedHumGrad" 
              x1="0" 
              y1={center} // 중심축 기준 가로 방향
              x2={size} 
              y2={center}
              gradientUnits="userSpaceOnUse" // 핵심: 개체 크기가 아닌 전체 캔버스 좌표 사용
            >
              <Stop offset="0%" stopColor="#4facfe" />
              <Stop offset="50%" stopColor="#66ff00" />
              <Stop offset="100%" stopColor="#f5576c" />
            </LinearGradient>
          </Defs>

          {/* 배경 트랙 */}
          <Path
            d={backgroundPath}
            stroke="#3d3d3d"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />

          {/* 진행 바 (고정된 그라데이션 사용) */}
          <Path
            d={progressPath}
            stroke="url(#fixedHumGrad)" // 이제 %가 낮아도 이 전체 그라데이션의 '일부'만 보여줍니다.
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />

          {/* 화살표 (안쪽 궤도) */}
          <View
            style={{
              position: 'absolute',
              left: cursorPoint.x - 8, 
              top: cursorPoint.y - 8,
              transform: [{ rotate: `${endAngle + 90}deg` }],
            }}
          >
            <Svg height="14" width="14" viewBox="0 0 20 20">
              <Polygon
                points="10,0 20,20 0,20"
                fill="#6a6a6a"
              />
            </Svg>
          </View>
        </Svg>

        <View style={styles.textOverlay}>
          <Text style={styles.valueText}>{value.toFixed(1)}%</Text>
          <Text style={styles.subText}>습도는 45 ~ 55%를 권장합니다</Text>
        </View>
      </View>
      <Text style={styles.warningText}>악기 주변이 너무 건조합니다!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#262626', borderRadius: 20, padding: 20, marginBottom: 20 },
  cardLabel: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  svgContainer: { alignItems: 'center', justifyContent: 'center' },
  textOverlay: { position: 'absolute', alignItems: 'center', bottom: '40%' },
  valueText: { color: '#f5576c', fontSize: 32, fontWeight: 'bold' },
  subText: { color: '#888', fontSize: 11, marginTop: 4 },
  warningText: { color: '#ccc', fontSize: 14, fontWeight: '600', marginTop: 15 },
});