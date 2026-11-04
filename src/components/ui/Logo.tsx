import React from 'react';
import { Image } from 'react-native';

interface LogoProps {
  size?: number;
}

/** Logo do AtivaMente: a nota presa com o coração e o calendário. */
export const Logo = ({ size = 32 }: LogoProps) => (
  <Image
    source={require('../../../assets/images/logo.png')}
    style={{ width: size, height: size }}
    resizeMode="contain"
    accessibilityLabel="Logo do AtivaMente"
  />
);
