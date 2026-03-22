import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {HeroBannerResponseItem} from '../../types/hero';

interface BannerItemProps {
  banner: HeroBannerResponseItem;
  width: number;
}

export const BannerItem = memo(({banner, width}: BannerItemProps) => {
  return (
    <View style={[styles.cardContainer, {width}]}>
      <View style={styles.image}>
        <Image source={{uri: banner.media.url}} style={styles.bannerImage} />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.title}>
            {banner.title}
          </Text>
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
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 72,
    rowGap: 6,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
});
