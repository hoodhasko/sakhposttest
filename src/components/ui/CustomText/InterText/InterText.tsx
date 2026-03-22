import React, {FC, memo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

import {BASE_COLORS} from '@config/constants';

interface InterTextProps extends TextProps {
  wight?: keyof typeof fontFamily;
  fs?: number;
  c?: string;
  lh?: number;
  flex?: number;
}

export const InterText: FC<InterTextProps> = memo(
  ({children, wight = 400, fs, c, lh, flex, ...props}) => {
    return (
      <Text
        allowFontScaling={false}
        {...props}
        style={[
          styles.text,
          {
            fontFamily: fontFamily[wight],
            fontSize: fs,
            color: c,
            lineHeight: lh,
            flex,
          },
          props.style,
        ]}>
        {children}
      </Text>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    color: BASE_COLORS.black100,
    fontSize: 14,
    lineHeight: 18,
  },
});

const fontFamily = {
  200: 'Inter_18pt-ExtraLight',
  300: 'Inter_18pt-Light',
  400: 'Inter_18pt-Regular',
  500: 'Inter_18pt-Medium',
  600: 'Inter_18pt-SemiBold',
  700: 'Inter_18pt-Bold',
  800: 'Inter_18pt-ExtraBold',
};
