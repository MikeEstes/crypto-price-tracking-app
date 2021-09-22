import GlobalStyles from './GlobalStyles';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView } from 'react-native';
// Custom Components
import ListItem from './src/components/ListItem';
import Chart from './src/components/Chart';
import ListHeader from './ListHeader';
// External Tools
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { getMarketData } from './src/services/cryptoService';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['45%'], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              logoUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}>
        {selectedCoinData ? (
          <Chart
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol}
            currentPrice={selectedCoinData.current_price}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
            logoUrl={selectedCoinData.image}
            sparkline={selectedCoinData.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  bottomSheet: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
});
