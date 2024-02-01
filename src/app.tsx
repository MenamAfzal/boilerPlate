import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@shopify/restyle";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BootSplash from "react-native-bootsplash";
import { useAppFonts } from "@/hooks";
import { NavigationContainer, Root } from "@/navigation";
import { APIProvider } from "@/services/api/api-provider";
import { getToken } from "@/storage";
import { login } from "@/store/auth";
import { theme } from "@/theme";

const App = () => {
  const appFontsLoaded = useAppFonts();

  const appInit = async () => {
    let token = getToken();

    console.log("token", token);

    if (token) {
      login(token);
    }
  };

  useEffect(() => {
    appInit().finally(async () => {
      if (appFontsLoaded) {
        await BootSplash.hide({ fade: true });
      }
    });
  }, [appFontsLoaded]);

  if (!appFontsLoaded) return;

  return (
    <GestureHandlerRootView style={styles.appContainer}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <APIProvider>
            <BottomSheetModalProvider>
              <Root />
              <FlashMessage position="bottom" />
            </BottomSheetModalProvider>
          </APIProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
