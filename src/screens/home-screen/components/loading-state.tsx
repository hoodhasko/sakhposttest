import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const LoadingState = () => {
  return (
    <View pointerEvents="none" style={styles.loaderOverlay}>
      <ActivityIndicator color="red" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});
