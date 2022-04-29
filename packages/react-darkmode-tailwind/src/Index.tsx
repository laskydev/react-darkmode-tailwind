import {Context, createContext, useContext, useEffect, useState} from "react";

type Theme = "dark" | "light" | "automatic" | "";

type useDarkmode = () => useDarkMode

interface useDarkMode {
  theme: Theme;
  setDark: () => void;
  setWhite: () => void;
  setAutomatic: () => void;
}

const LOCALSTORAGEID = "USE-DARK-MODE-THEME-LASKY";
const DARK: Theme = "dark";
const LIGHT: Theme = "light";
const AUTOMATIC: Theme = "automatic";

const Darkmode: Context<any> = createContext({});

export const DarkmodeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(DARK);

  const setDark = () => setTheme(DARK);
  const setWhite = () => setTheme(LIGHT);
  const setAutomatic = () => setTheme(AUTOMATIC);

  useEffect(() => {
    const body = document.body.classList;

    const _setDark = () => {
      body.remove(LIGHT);
      body.add(DARK);
      window.localStorage.setItem(LOCALSTORAGEID, DARK);
    };

    const _setWhite = () => {
      body.remove(DARK);
      body.add(LIGHT);
      window.localStorage.setItem(LOCALSTORAGEID, LIGHT);
    };

    switch (theme) {
      case DARK:
        _setDark();
        break;
      case LIGHT:
        _setWhite();
        break;
      case AUTOMATIC:
        if (typeof window !== "undefined" && window.localStorage) {
          const isDark = window.matchMedia("(prefers-color-scheme: dark)");
          if (isDark.matches) {
            _setDark();
            break;
          }
          _setWhite();
          break;
        }
        _setWhite();
        break;
      default:
        throw new Error("Invalid theme");
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const useDarkModeLocalStorage =
        window.localStorage.getItem(LOCALSTORAGEID);
      if (!useDarkModeLocalStorage) {
        window.localStorage.setItem(LOCALSTORAGEID, theme);
      }
      if (
          (
              useDarkModeLocalStorage === LIGHT ||
              useDarkModeLocalStorage === DARK ||
              useDarkModeLocalStorage === AUTOMATIC
          ) &&
          (useDarkModeLocalStorage !== theme)
      ) {
        setTheme(useDarkModeLocalStorage as Theme);
      }
    } else {
      throw new Error("Global Window not found");
    }
  }, [window.localStorage]);

  useEffect(() => {
    const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    const setColorScheme = e => {
      if (e.matches) {
        // Dark
        setDark();
      } else if(!e.matches){
        // Light
        setWhite();
      }
    }
    setColorScheme(colorSchemeQueryList);
    colorSchemeQueryList.addEventListener('change', setColorScheme);

    return () =>{
      removeEventListener('change',setColorScheme)
    }
  }, []);


  const provider: useDarkMode = {
    theme,
    setDark,
    setWhite,
    setAutomatic,
  };

  return <Darkmode.Provider value={provider}>{children}</Darkmode.Provider>;
};

export const useDarkmode: useDarkmode = () => useContext<useDarkMode>(Darkmode)
