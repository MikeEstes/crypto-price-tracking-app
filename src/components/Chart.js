import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
// External Tools
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';

export const { width: SIZE } = Dimensions.get('window');

const Chart = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  sparkline,
}) => {
  const latestCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);

  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30';

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;

    // Work around to handle Chart Loading bug
    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [currentPrice]);

  const formatUSD = (value) => {
    'worklet';
    if (value === '') {
      const formattedValue = `$${parseFloat(latestCurrentPrice.value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
      return formattedValue;
    }

    const formattedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    return formattedValue;
  };

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
      <View style={styles.chartWrapper}>
        <View style={styles.titleWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image style={styles.image} source={{ uri: logoUrl }} />
              <Text style={styles.subtitle}>
                {name} ({symbol.toUpperCase()})
              </Text>
            </View>
            <Text style={styles.subtitle}>7d</Text>
          </View>
          <View style={styles.lowerTitles}>
            <ChartYLabel format={formatUSD} style={styles.boldTitle} />

            <Text style={[styles.title, { color: priceChangeColor }]}>
              {priceChangePercentage7d.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      {chartReady ? (
        <View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke='black' width={SIZE} />
          <ChartDot style={{ backgroundColor: 'black' }} />
        </View>
      ) : null}
    </ChartPathProvider>
  );
};
const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16,
  },
  titleWrapper: {},
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#A9ABB1',
  },
  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginVertical: 40,
  },
});
export default Chart;
