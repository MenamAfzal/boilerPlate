import React, { useCallback, useMemo, useRef, useState } from "react";
import type { ColorSchemeName } from "react-native";
import { Appearance, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { getContentCSS, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useTheme } from "@shopify/restyle";
import { ScreenHeader } from "@/components/screen-header";
import { setPostJobDescription, usePostJob } from "@/store/post-job";
import type { Theme } from "@/theme";
import { Button, Screen, View } from "@/ui";

interface IProps {
  navigation: any;
  theme?: ColorSchemeName;
}

function createContentStyle(theme: ColorSchemeName) {
  // Can be selected for more situations (cssText or contentCSSText).
  const contentStyle = {
    backgroundColor: "#2e3847",
    color: "#fff",
    caretColor: "red",
    placeholderColor: "gray",

    contentCSSText: "font-size: 16px; min-height: 200px;", // initial valid
  };
  if (theme === "light") {
    contentStyle.backgroundColor = "#fff";
    contentStyle.color = "#000033";
    contentStyle.placeholderColor = "#a9a9a9";
  }
  return contentStyle;
}

export function JobDescription(props: IProps) {
  const { colors } = useTheme<Theme>();
  const { height } = useWindowDimensions();

  const description2 = usePostJob((state) => state?.description2);

  const { theme: initTheme = Appearance.getColorScheme(), navigation } = props;
  const richText = useRef<RichEditor>(null);

  const scrollRef = useRef<ScrollView>(null);
  // save on html
  const contentRef = useRef();

  const [theme] = useState(initTheme);

  const contentStyle = useMemo(() => createContentStyle(theme), [theme]);

  // on save to preview
  const handleSave = useCallback(() => {
    const result = `${contentRef.current},${getContentCSS()}`;
    // console.log("result", result);

    navigation.navigate("PostJobDetail");

    return;

    setPostJobDescription({
      content: contentRef.current,
      css: getContentCSS(),
    });

    navigation.navigate("PostJobDetail");
  }, [navigation]);

  // editor change data
  const handleChange = useCallback((html: string) => {
    // save html to content ref;
    // @ts-ignore
    contentRef.current = html;
  }, []);

  const editorInitializedCallback = useCallback(() => {
    // richText.current.registerToolbar(function (items) {
    // console.log('Toolbar click, selected items (insert end callback):', items);
    // });
  }, []);

  // editor height change
  const handleHeightChange = useCallback((height: number) => {
    console.log("editor height change:", height);
  }, []);

  const handlePaste = useCallback((data: any) => {
    console.log("Paste:", data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyUp = useCallback(() => {
    // console.log('KeyUp:', data);
  }, []);

  // @deprecated Android keyCode 229
  const handleKeyDown = useCallback(() => {
    // console.log('KeyDown:', data);
  }, []);

  const handleInput = useCallback(() => {
    // console.log(inputType, data)
  }, []);

  const handleFocus = useCallback(() => {
    console.log("editor focus");
  }, []);

  const handleBlur = useCallback(() => {
    console.log("editor blur");
  }, []);

  const handleCursorPosition = useCallback((scrollY: number) => {
    // Positioning scroll bar
    scrollRef.current!.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={["top"]}>
      <ScreenHeader title="Job Description" />
      <ScrollView
        style={[styles.scroll]}
        keyboardDismissMode={"none"}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}
      >
        <RichToolbar
          style={[styles.richBar]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          selectedIconTint={"#2095F2"}
          disabledIconTint={"#bfbfbf"}
        />
        <RichEditor
          // initialFocus={true}
          initialFocus={false}
          firstFocusEnd={false}
          editorStyle={contentStyle} // default light style
          ref={richText}
          style={styles.rich}
          useContainer={true}
          initialHeight={height * 0.6}
          enterKeyHint={"done"}
          containerStyle={{ borderRadius: 24 }}
          placeholder={"Write Your Job Description"}
          initialContentHTML={description2} //{`<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Business Analyst</title>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,300&display=swap\" rel=\"stylesheet\">\n    <style>\n       /* http://meyerweb.com/eric/tools/css/reset/ \n        v2.0 | 20110126\n        License: none (public domain)\n        */\n\n        html, body, div, span, applet, object, iframe,\n        h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n        a, abbr, acronym, address, big, cite, code,\n        del, dfn, em, img, ins, kbd, q, s, samp,\n        small, strike, strong, sub, sup, tt, var,\n        b, u, i, center,\n        dl, dt, dd, ol, ul, li,\n        fieldset, form, label, legend,\n        table, caption, tbody, tfoot, thead, tr, th, td,\n        article, aside, canvas, details, embed, \n        figure, figcaption, footer, header, hgroup, \n        menu, nav, output, ruby, section, summary,\n        time, mark, audio, video {\n            margin: 0;\n            padding: 0;\n            border: 0;\n            font-size: 100%;\n            font: inherit;\n            vertical-align: baseline;\n        }\n        /* HTML5 display-role reset for older browsers */\n        article, aside, details, figcaption, figure, \n        footer, header, hgroup, menu, nav, section {\n            display: block;\n        }\n        body {\n            line-height: 1;\n            padding: 16px;\n            font-size: 14px;\n            line-height: 24px;\n            font-weight: 400;\n            font-family: 'Poppins', sans-serif;\n        }\n        ol, ul {\n            list-style: none;\n        }\n        blockquote, q {\n            quotes: none;\n        }\n        blockquote:before, blockquote:after,\n        q:before, q:after {\n            content: '';\n            content: none;\n        }\n        table {\n            border-collapse: collapse;\n            border-spacing: 0;\n        } \n\n        .job-description .description-section{\n            margin: 16px;\n        }\n\n        .section-title {\n            font-size: 20px;\n            line-height: 30px;\n            font-family: 'Poppins', sans-serif;\n            font-weight: 500;\n            margin-bottom: 16px;\n        }\n\n        .description-section ul {\n            list-style: disc;\n            margin-left: 16px;\n            color: #494A50;\n        }\n\n        .description-section ul li:not(:last-child) {\n            margin-bottom: 8px;\n        }\n\n        .description-section p {\n            font-size: 14px;\n            line-height: 24px;\n            color: #494A50;\n            margin: 8px 0;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"job-description\">\n        <div class=\"description-section\">\n            <h2 class=\"section-title\">Job brief</h2>\n            <p>We're looking for a Business Analyst to help guide our projects and improve the efficiency of our operations.</p>\n        </div>\n\n        <div class=\"description-section\">\n            <h2 class=\"section-title\">Responsibilities</h2>\n            <ul>\n                <li>Analyze and interpret data to identify trends.</li>\n                <li>Prepare detailed reports and present findings.</li>\n                <li>Collaborate with teams to integrate new features.</li>\n            </ul>\n        </div>\n\n        <div class=\"description-section\">\n            <h2 class=\"section-title\">Requirements and skills</h2>\n            <ul>\n                <li>Previous experience in business analysis.</li>\n                <li>Strong analytical and technical skills.</li>\n                <li>Excellent written and verbal communication.</li>\n            </ul>\n        </div>\n    </div>\n</body>\n</html>`}
          //initialContentHTML={initHTML}
          editorInitializedCallback={editorInitializedCallback}
          onChange={handleChange}
          onHeightChange={handleHeightChange}
          onPaste={handlePaste}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onCursorPosition={handleCursorPosition}
          pasteAsPlainText={true}
        />
      </ScrollView>
      <View
        paddingVertical={"large"}
        marginVertical={"large"}
        borderTopWidth={1}
        borderTopColor={"grey400"}
      >
        <Button label="Next" marginHorizontal={"large"} onPress={handleSave} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e3e3e3",
  },
  topVi: {
    backgroundColor: "#fafafa",
  },
  richBar: {
    borderColor: "#efefef",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: "#191d20",
    borderColor: "#696969",
  },
  scroll: {
    backgroundColor: "#ffffff",
  },
  scrollDark: {
    backgroundColor: "#2e3847",
  },
  darkBack: {
    backgroundColor: "#191d20",
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: "center",
    color: "#515156",
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});
