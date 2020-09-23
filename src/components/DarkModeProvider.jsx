import React, { useState } from 'react';

const setClass = (isDark) => {
  if (isDark) {
    document.body.classList.add(`dark`);
  } else {
    document.body.classList.remove(`dark`);
  }
  localStorage.setItem(`isDark`, isDark);
  return isDark;
};

const initState = () => {
  const isDark = localStorage.getItem(`isDark`);
  if (isDark) {
    return isDark === `true`;
  } else if (window.matchMedia) {
    return window.matchMedia(`(prefers-color-scheme: dark)`).matches;
  } else {
    return false;
  }
};

export const DarkModeContext = React.createContext({
  setIsDark: () => {},
  isDark: false,
});

export default function DarkModeProvider({ children }) {
  const [isDark, _setIsDark] = useState(
    () => setClass(initState()),
  );
  const setIsDark = (state) => _setIsDark(
    (_state) => setClass(state ?? !_state),
  );

  return (
    <DarkModeContext.Provider
      value={{ isDark, setIsDark }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
