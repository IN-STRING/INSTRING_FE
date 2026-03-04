import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors } from "@/constants/theme";
import { Screen } from "@/components/Screen";
import { HumidityGauge } from "@/components/Humidity";
import { ThermometerGauge } from "@/components/Thermometer";

export default function InstrumentDashboard() {
  return (
    <Screen variant="main">
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.headerTitle}>내 악기 현황</Text>

        {/* 1. 온도 카드 */}
        <ThermometerGauge />

        {/* 2. 습도 카드 (에러 수정됨) */}
        <HumidityGauge />

        {/* 3. 악기 줄 카드 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>악기 줄</Text>
            <Text style={styles.recommendation}>
              코팅된 줄은 4 ~ 6개월 교체 권장
            </Text>
          </View>
          <Text style={[styles.valueText, { color: "#FF6B6B" }]}>코팅줄</Text>
          <View style={styles.gaugeWrapper}>
            <View style={[styles.triangle, { left: "90%" }]} />
            <View style={styles.stepBarContainer}>
              <View
                style={[
                  styles.stepBar,
                  { backgroundColor: "#4CAF50", flex: 1 },
                ]}
              />
              <View
                style={[
                  styles.stepBar,
                  { backgroundColor: "#FF9800", flex: 1, marginHorizontal: 2 },
                ]}
              />
              <View
                style={[
                  styles.stepBar,
                  { backgroundColor: "#F44336", flex: 1 },
                ]}
              />
            </View>
          </View>
          <Text style={styles.footerWarning}>
            악기줄이 너무 오래 되었습니다!!
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#262626",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: { color: "white", fontSize: 18, fontWeight: "bold" },
  recommendation: { color: "#888", fontSize: 11 },
  valueText: { fontSize: 28, fontWeight: "bold", marginVertical: 10 },
  gaugeWrapper: { height: 40, justifyContent: "center", marginTop: 10 },
  barTrack: {
    height: 20,
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    overflow: "hidden",
  },
  barGradient: { height: "100%", width: "100%" },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#f5576c",
    transform: [{ rotate: "180deg" }],
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  circularWrapper: { alignItems: "center" },
  circularValue: { color: "#f5576c", fontSize: 32, fontWeight: "bold" },
  circularSubText: { color: "#888", fontSize: 11 },
  stepBarContainer: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  stepBar: { height: "100%" },
  footerWarning: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
});
