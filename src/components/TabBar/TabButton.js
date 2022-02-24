import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {isAndroid} from '../../constants/IsAndroid';
import TouchableCmp from '../../constants/TouchableCmp';

function TabButton({
  title,
  stylePorp,
  txtColor,
  btnBackgroundColor,
  txtStyleProp,
  setCurrentTab,
  currentTab,
  Icon,
  onPress,
}) {
  return (
    <View style={styles.tabContainer}>
      <TouchableCmp
        style={{
          ...stylePorp,
          ...styles.tabButton,
          backgroundColor:
            currentTab === title ? '#222E57' : btnBackgroundColor,
        }}
        onPress={() => {
          setCurrentTab(title);
          onPress();
        }}>
        <View
          style={
            isAndroid
              ? {
                  ...stylePorp,
                  ...styles.tabButton,
                  backgroundColor:
                    currentTab === title ? '#222E57' : btnBackgroundColor,
                }
              : styles.iosView
          }>
          {Icon}
          <Text
            style={{
              color: currentTab === title ? '#fff' : txtColor,
              ...styles.tabTxt,
              ...txtStyleProp,
            }}>
            {title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
}

export default TabButton;

const styles = StyleSheet.create({
  tabContainer: {width: '100%', padding: 10},
  tabButton: {
    width: '70%',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTxt: {fontWeight: 'bold', textAlign: 'center', fontSize: 17, width: 80},
});
