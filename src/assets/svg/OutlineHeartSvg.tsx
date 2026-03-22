import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {BASE_COLORS} from '@config/constants';
import {CustomSvgProps} from '@assets/svg/types';

export const OutlineHeartSvg: FC<CustomSvgProps> = ({
  color = BASE_COLORS.black(),
  size = 20,
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.4 5.891c0 1.936.905 3.5 2.073 4.68.82.827 2.209 2.043 3.426 2.213a.874.874 0 00.202 0c1.217-.17 2.605-1.386 3.426-2.214C12.695 9.39 13.6 7.827 13.6 5.891c0-2.607-3.443-3.644-4.962-1.63a.8.8 0 01-1.276 0C5.844 2.248 2.4 3.285 2.4 5.892zm-1.6 0C.8 2.208 5.294.287 8 2.615c2.708-2.324 7.2-.41 7.2 3.276 0 3.804-3.041 7.223-6.545 8.404-.407.14-.903.14-1.31 0C3.842 13.114.8 9.695.8 5.89z"
        fill={color}
      />
    </Svg>
  );
};
