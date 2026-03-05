import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect, Polygon, G, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ThermometerGauge = ({ value = 35.5, min = 10, max = 35 }) => {
  const CARD_WIDTH = SCREEN_WIDTH - 40;
  const GAUGE_WIDTH = CARD_WIDTH - 60; // 좌우 패딩 제외
  const SVG_HEIGHT = 100;

  // 디자인 수치 정밀 조정
  const BULB_R = 25;      // 왼쪽 큰 원 반지름
  const BAR_H = 22;       // 막대 부분 높이 (이미지상 구보다 훨씬 얇음)
  const CENTER_Y = 50;    // 수직 중앙점
  const BAR_START_X = 50; // 구 중심에서 막대가 시작되는 지점
  const BAR_END_X = GAUGE_WIDTH;
  
  // 온도 비율 계산
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const INDICATOR_X = BAR_START_X + ((BAR_END_X - BAR_START_X) * percentage);

  // 1. 온도계 전체 외곽선 (이미지의 독특한 '열쇠구멍' 형태)
  const mainPath = `
    M ${BAR_START_X},${CENTER_Y - BAR_H / 2}
    H ${BAR_END_X}
    A ${BAR_H / 2},${BAR_H / 2} 0 0 1 ${BAR_END_X},${CENTER_Y + BAR_H / 2}
    H ${BAR_START_X}
    A ${BULB_R},${BULB_R} 0 1 1 ${BAR_START_X},${CENTER_Y - BAR_H / 2}
    Z
  `;

  return (
    <View style={styles.card}>
      {/* 상단 텍스트 레이아웃 */}
      <View style={styles.header}>
        <Text style={styles.title}>온도</Text>
        <Text style={styles.recommend}>온도는 20 ~ 25°C를 권장합니다</Text>
      </View>
      
      <Text style={styles.tempValue}>{value.toFixed(1)}°C</Text>

      <View style={styles.svgWrapper}>
        {/* 상단 화살표 지시계 (빨간색 역삼각형) */}
        <View style={[styles.indicator, { left: INDICATOR_X - 10 }]}>
          <Svg width="20" height="15" viewBox="0 0 20 20">
            <Polygon points="0,0 20,0 10,20" fill="#FF5C5C" />
          </Svg>
        </View>

        <Svg width={GAUGE_WIDTH + 10} height={SVG_HEIGHT}>
          <Defs>
            {/* 게이지 내부 그라데이션 (보라색 -> 분홍색 -> 주황색) */}
            <LinearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#94a3ff" />
              <Stop offset="50%" stopColor="#cb90f9" />
              <Stop offset="100%" stopColor="#ff7e7e" />
            </LinearGradient>

            {/* 현재 온도만큼만 자르는 ClipPath */}
            <ClipPath id="clip">
              <Rect x="0" y="0" width={INDICATOR_X} height={SVG_HEIGHT} />
            </ClipPath>
          </Defs>

          {/* 1. 바깥쪽 두꺼운 테두리 (Border) */}
          <Path 
            d={mainPath} 
            fill="#1e1e1e" 
            stroke="#3a3a3a" 
            strokeWidth="5" 
          />

          {/* 2. 내부 눈금선 (이미지에 있는 회색 세로선들) */}
          <G opacity="0.3">
            {[...Array(12)].map((_, i) => (
              <Rect 
                key={i}
                x={BAR_START_X + (i * (BAR_END_X - BAR_START_X) / 11)} 
                y={CENTER_Y - BAR_H / 4} 
                width="1.5" 
                height={BAR_H / 2} 
                fill="#555" 
              />
            ))}
          </G>

          {/* 3. 채워진 게이지 (클립 적용) */}
          <G clipPath="url(#clip)">
            <Path d={mainPath} fill="url(#gaugeGrad)" />
            {/* 왼쪽 구 안쪽의 더 밝은 색 처리 */}
            <Circle cx={BAR_START_X - 15} cy={CENTER_Y} r={BULB_R - 5} fill="#94a3ff" opacity="0.5" />
          </G>
        </Svg>

        {/* 수치 라벨 (파란색 10도, 빨간색 35도) */}
        <View style={styles.labelRow}>
          <Text style={styles.lowLabel}>{min}°C</Text>
          <Text style={styles.highLabel}>{max}°C</Text>
        </View>
      </View>

      <Text style={styles.warningText}>악기 주변이 너무 뜨겁습니다!!</Text>
      <Text style={styles.updateText}>온도는 일정시간 마다 갱신 됩니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#262626', borderRadius: 20, padding: 20, marginBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  recommend: { color: '#888', fontSize: 13, marginTop: 4 },
  tempValue: { color: '#FF7E7E', fontSize: 42, fontWeight: 'bold', marginVertical: 15 },
  
  svgWrapper: { backgroundColor: "white", marginTop: 10, position: 'relative' },
  indicator: { position: 'absolute', top: 15, zIndex: 5 },
  
  labelRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginTop: -20, 
    paddingHorizontal: 15 
  },
  lowLabel: { color: '#7a8fff', fontSize: 18, fontWeight: 'bold' },
  highLabel: { color: '#ff7e7e', fontSize: 18, fontWeight: 'bold' },

  warningText: { color: '#e0e0e0', fontSize: 20, fontWeight: 'bold', marginTop: 30 },
  updateText: { color: '#666', fontSize: 14, marginTop: 5 },
});