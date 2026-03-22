import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState = ({onRetry}: ErrorStateProps) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Ошибка загрузки данных</Text>
      <Text style={styles.errorDescription}>
        Проверьте подключение к интернету и повторите попытку
      </Text>
      <Pressable onPress={onRetry} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Повторить</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    backgroundColor: '#0E1628',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorDescription: {
    color: '#D0D6E2',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  errorTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: '#101828',
    fontSize: 14,
    fontWeight: '700',
  },
});
