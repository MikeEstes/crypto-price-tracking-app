import GlobalStyles from './GlobalStyles';
import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ListItem from './src/components/ListItem';
import ListHeader from './ListHeader';

import { SAMPLE_DATA } from './assets/data/sampleData';

export default function App() {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={SAMPLE_DATA}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.current_price}
            priceChangePercentage7d={
              item.price_change_percentage_7d_in_currency
            }
            logoUrl={item.image}
          />
        )}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
