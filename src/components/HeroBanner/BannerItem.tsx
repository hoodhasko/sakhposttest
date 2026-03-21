import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeroBanner } from '../../types/hero';

interface BannerItemProps {
  banner: HeroBanner;
  width: number;
}

export const BannerItem = memo(({ banner, width }: BannerItemProps) => {
  return (
    <View style={[styles.cardContainer, { width }]}>
      <View style={styles.image}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          {banner.badge ? (
            <Text style={styles.badge}>{banner.badge}</Text>
          ) : null}
          <Text numberOfLines={2} style={styles.title}>
            {banner.title}
          </Text>
          {banner.subtitle ? (
            <Text numberOfLines={2} style={styles.subtitle}>
              {banner.subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    height: '100%',
  },
  image: {
    backgroundColor: '#42255c',
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 72,
    rowGap: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
});

BannerItem.displayName = 'BannerItem';
