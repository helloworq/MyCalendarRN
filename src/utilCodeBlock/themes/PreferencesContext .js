import React from 'react';

const darkMode = {
    dark: false,
    colors: {
        primary: 'rgb(0, 0, 0)',
        background: 'rgb(255, 255, 0)',
        card: 'rgb(255, 255, 0)',
        text: 'rgb(255, 255, 0)',
        border: 'rgb(255, 0, 0)',
        notification: 'rgb(255, 0, 0)',
    },
};

const lightMode = {
    dark: false,
    colors: {
        primary: 'rgb(255, 220, 255)',
        background: 'rgb(255, 255,250)',
        card: 'rgb(255, 255,255)',
        text: 'rgb(255, 255, 255)',
        border: 'rgb(255, 255, 255)',
        notification: 'rgb(255, 250, 255)',
    },
}

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});