
import * as React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { scale } from "react-native-size-matters";
import { icons } from "@/assets/icons";
import { useCompanies } from "@/services/api/company";
import { closeDrawer, openDrawer, useApp } from "@/store/app";
import { logOut } from "@/store/auth";
import { useUser, removeUserData, setUserCompanyWithRoles } from "@/store/user";
import { PressableScale, Screen, Text, View } from "@/ui";
import { Avatar } from "../avatar";
import { CompanyButton } from "../company-button";
import { palette } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { useRefreshOnFocus } from "@/hooks";
import { Image } from "expo-image";

const { width } = Dimensions.get("screen");

type AppDrawer = {
  children: React.ReactNode;
};

export function AppDrawer({ children }: AppDrawer) {
  const { navigate } = useNavigation();

  const drawerStatus = useApp((state) => state.drawerStatus);
  const user = useUser((state) => state?.profile);
  const company = useUser((state) => state?.company);

  const { data: companies, refetch } = useCompanies();

  useRefreshOnFocus(refetch);

  React.useEffect(() => {
    // @ts-ignore
    if (companies?.response?.status === 201) {
      logOut();
    }
    // @ts-ignore
  }, [companies?.response?.status]);

  return (
    <Drawer
      open={drawerStatus}
      onOpen={openDrawer}
      onClose={closeDrawer}
      drawerStyle={{ width: width * 0.8 }}
      renderDrawerContent={() => {
        return (
          <Screen>
            <View flex={1}>
              <View
                paddingHorizontal={"large"}
                flexDirection={"row"}
                paddingTop={"medium"}
                alignItems={"center"}
              >
                <Avatar source={icons.avatar} size="medium" />
                <View>
                  <Text
                    variant={"medium16"}
                    textTransform={"capitalize"}
                    paddingLeft={"medium"}
                    color={"black"}
                  >
                    {user?.full_name} 👋
                  </Text>
                  <Text
                    variant={"regular14"}
                    paddingLeft={"medium"}
                    paddingTop={"tiny"}
                    color={"grey200"}
                  >
                    View profile
                  </Text>
                </View>
              </View>

              <View
                backgroundColor={"grey500"}
                paddingVertical={"small"}
                paddingHorizontal={"large"}
                marginTop={"medium"}
              >
                <Text variant={"regular13"} color={"grey100"}>
                  Your Companies
                </Text>
              </View>

              <View marginTop={"small"} />

              {companies?.response?.data?.map((item, index) => {
                const isSelected = item?.id === company?.id;

                return (
                  <PressableScale
                    key={index}
                    onPress={() => {
                      setUserCompanyWithRoles({ company: item });
                      navigate("CompanyDetail");
                      closeDrawer();
                    }}
                  >
                    <View
                      flexDirection={"row"}
                      alignItems={"center"}
                      paddingHorizontal={"large"}
                      //backgroundColor={"info"}
                      paddingVertical={"small"}
                      borderBottomColor={"grey500"}
                      borderBottomWidth={StyleSheet.hairlineWidth * 2}
                    >
                      <View flex={1} flexDirection={"row"} alignItems={"center"}>
                        <CompanyButton
                          backgroundColor={"black"}
                          icon="company"
                          onPress={() => null}
                          size={scale(48)}
                          imageSize={scale(48)}
                        />
                        <View paddingLeft={"small"}>
                          <Text
                            variant={"semiBold14"}
                            color={isSelected ? "primary" : "black"}
                          >
                            {item?.name}
                          </Text>
                          <Text
                            variant={"regular12"}
                            paddingTop={"tiny"}
                            color={isSelected ? "primary" : "black"}
                          >
                            {item?.member_since}
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={icons["arrow-right"]}
                        style={{
                          height: scale(24),
                          width: scale(24),
                          tintColor: isSelected ? palette?.primary : null,
                        }}
                        contentFit="contain"
                      />
                    </View>
                  </PressableScale>
                );
              })}

              <View alignSelf={"center"} paddingVertical={"large"}>
                <PressableScale
                  onPress={() => {
                    closeDrawer();
                    navigate("AddCompany");
                  }}
                >
                  <Text variant={"medium14"} color={"primary"}>
                    + Add New Company
                  </Text>
                </PressableScale>
              </View>

              <View flex={1} paddingBottom={"large"} justifyContent={"flex-end"}>
                <PressableScale onPress={() => navigate("MyAccount")}>
                  <View
                    height={scale(56)}
                    alignItems={"center"}
                    marginHorizontal={"large"}
                    borderRadius={scale(8)}
                    marginBottom={"large"}
                    backgroundColor={"grey500"}
                    flexDirection={"row"}
                    paddingHorizontal={"large"}
                  >
                    <Image
                      source={icons.settings}
                      style={{ height: scale(24), width: scale(24) }}
                    />
                    <Text variant={"medium14"} color={"grey200"} paddingLeft={"large"}>
                      Account
                    </Text>
                  </View>
                </PressableScale>

                <PressableScale
                  onPress={() => {
                    removeUserData();
                    logOut();
                  }}
                >
                  <View
                    height={scale(56)}
                    backgroundColor={"grey500"}
                    alignItems={"center"}
                    marginHorizontal={"large"}
                    borderRadius={scale(8)}
                    flexDirection={"row"}
                    paddingHorizontal={"large"}
                  >
                    <Image
                      source={icons["log-out"]}
                      style={{ height: scale(24), width: scale(24) }}
                    />
                    <Text variant={"medium14"} color={"error"} paddingLeft={"large"}>
                      Sign Out
                    </Text>
                  </View>
                </PressableScale>
              </View>
            </View>
          </Screen>
        );
      }}
    >
      {children}
    </Drawer>
  );
}
