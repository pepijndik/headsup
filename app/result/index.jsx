import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import * as ScreenOrientation from 'expo-screen-orientation';
// @ts-ignore
import bg from '@/assets/images/blue.png';
import { useRouter,useLocalSearchParams } from 'expo-router';
// @ts-ignore
export default Result = () => {

  const router = useRouter();
  const localSearchParams = useLocalSearchParams();
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN);
  },[]);

  let state = localSearchParams.data;

  let temp = [];

  let successCount = 0;
  let passCount = 0;

  state.forEach((element, index) => {
    if (state.status === localSearchParams.flags.ARRIVED) {
      state.status = localSearchParams.flags.PASS;
    }
    if (element.status == localSearchParams.flags.PASS) {

      passCount++;

      temp.push(<Text style={[styles.attemptedText, styles.textRed]} key={index}>{element.text}</Text>);

    } else if (element.status === localSearchParams.flags.SUCCESS) {

      successCount++;

      temp.push(<Text style={[styles.attemptedText, styles.textGreen]} key={index}>{element.text}</Text>);

    }

  });

  return (
    <View style={styles.bgBlack}>
      <ImageBackground
        resizeMode="cover"
        source={bg}
        style={[styles.bgImage]}
      >
        <View style={styles.view}>
          <Text style={styles.text}>Game Over !!</Text>
          <Text style={[styles.result, { fontSize: Math.min(Dimensions.get('window').height, Dimensions.get('window').width) / 8, fontStyle: 'italic', fontWeight: 'bold' }]}>Result</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={[styles.result, styles.textGreen]}>Success: {successCount}</Text>
            <Text style={[styles.result, styles.textRed]}>Pass: {passCount}</Text>
          </View>
          <ScrollView>
            {temp}
          </ScrollView>
          <View style={{
            // flexDirection: 'row',
            justifyContent: "flex-end"
          }}
          >
            <Button
              onPress={() => router.push('/')}
              style={{ alignSelf: 'center', margin: 10, backgroundColor: '#fff' }}
            >
              <Icon name='home' style={{ color: '#000' }} />
              <Text style={{ color: '#000' }}>Home</Text>
            </Button>

          </View>
        </View>
      </ ImageBackground>
    </View>
  );

}
const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
    width: '100%',
  },
  bgBlack: {
    backgroundColor: '#000'
  },
  textRed: {
    color: "rgba(254, 32, 32, 0.9)"
  },
  textGreen: {
    color: "rgba(12, 178, 12, 0.9)"
  },
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingTop: Dimensions.get('window').height / 16,
    paddingHorizontal: 10
  },
  text: {
    fontSize: Math.min(Dimensions.get('window').height, Dimensions.get('window').width) / 6,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic', fontWeight: 'bold'
  },
  result: {
    fontSize: Math.min(Dimensions.get('window').height, Dimensions.get('window').width) / 10,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    alignSelf: 'center',
    fontStyle: 'italic', fontWeight: 'bold'
  },
  attemptedText: {
    fontSize: Math.min(Dimensions.get('window').height, Dimensions.get('window').width) / 12,
    textAlign: 'center',
    color: '#fff',
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#eee",
  },
});

