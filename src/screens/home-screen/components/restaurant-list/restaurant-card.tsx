import React, {memo, useCallback, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ListVendorsFiltersItem} from '@models/index';
import {OutlineHeartSvg, StarFilledSvg} from '@assets/svg';
import {GolosText} from '@components/ui';
import {BASE_COLORS} from '@config/constants';

interface RestaurantCardProps {
  restaurant: ListVendorsFiltersItem;
}

export const RestaurantCard = memo(({restaurant}: RestaurantCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleFavoritePress = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  return (
    <View>
      <View>
        <Image source={{uri: restaurant.image.url}} style={styles.image} />

        <TouchableOpacity
          onPress={handleFavoritePress}
          style={styles.likeButton}>
          <OutlineHeartSvg color={isFavorite ? 'red' : BASE_COLORS.white()} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={{uri: restaurant.logo.url}} style={styles.logo} />
        </View>
      </View>

      <GolosText wight={500} numberOfLines={1} style={styles.name}>
        {restaurant.general_info.name}
      </GolosText>

      <View style={styles.infoRow}>
        <StarFilledSvg size={12} />

        <GolosText fs={13} lh={16}>
          {restaurant.rating ?? '—'}
          <GolosText c={BASE_COLORS.SUI_COLOR_TEXT_TERTIARY}> (10) </GolosText>
          <GolosText c={BASE_COLORS.SUI_COLOR_TEXT_TERTIARY}>
            • Европейская кухня
          </GolosText>
        </GolosText>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 193,
    borderRadius: 16,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    color: BASE_COLORS.SUI_COLOR_TEXT,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: BASE_COLORS.white(),
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: BASE_COLORS.black(0.7),
    padding: 8,
    borderRadius: 100,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
