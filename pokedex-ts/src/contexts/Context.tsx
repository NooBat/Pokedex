/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo } from 'react';

interface ColorHash {
  [key: string]: {
    bg_color: string;
    text_color: string;
  };
}

interface ContextProviderProps {
  children: React.ReactNode;
}

export const Context = createContext<ColorHash>({});

function ContextProvider({ children }: ContextProviderProps) {
  const colorHash = useMemo(
    () => ({
      bug: {
        bg_color: '#3b9950',
        text_color: '#000'
      },
      dark: {
        bg_color: '#5a5979',
        text_color: '#FFF'
      },
      dragon: {
        bg_color: '#61cad9',
        text_color: '#000'
      },
      electric: {
        bg_color: '#fbfb72',
        text_color: '#000'
      },
      fairy: {
        bg_color: '#ea1369',
        text_color: '#000'
      },
      fighting: {
        bg_color: '#ef6138',
        text_color: '#FFF'
      },
      fire: {
        bg_color: '#fd4c5a',
        text_color: '#000'
      },
      flying: {
        bg_color: '#93b2c7',
        text_color: '#000'
      },
      ghost: {
        bg_color: '#906790',
        text_color: '#FFF'
      },
      grass: {
        bg_color: '#27c84f',
        text_color: '#000'
      },
      ground: {
        bg_color: '#6e491f',
        text_color: '#FFF'
      },
      ice: {
        bg_color: '#d8f0fa',
        text_color: '#000'
      },
      normal: {
        bg_color: '#ca98a7',
        text_color: '#000'
      },
      poison: {
        bg_color: '#9b69d9',
        text_color: '#000'
      },
      psychic: {
        bg_color: '#f81c91',
        text_color: '#000'
      },
      rock: {
        bg_color: '#8b3e21',
        text_color: '#FFF'
      },
      steel: {
        bg_color: '#42bd94',
        text_color: '#000'
      },
      water: {
        bg_color: '#1552e2',
        text_color: '#000'
      }
    }),
    []
  );

  const value = useMemo(() => colorHash, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ContextProvider;
