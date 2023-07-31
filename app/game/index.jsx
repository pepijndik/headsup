// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Container, Text } from 'native-base';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import useCountdown from "@bradgarropy/use-countdown"
import { useRouter } from 'expo-router';
import GameComponent from '@/components/GameComponent';
const getScreenInfo = () => {
  const dim = Dimensions.get('window');
  return dim;
}   

export default Game = () => {
   const router = useRouter();

  const [onForehead, setOnForehead] = useState(false);
  const [ready, setReady] = useState(false);
  const countdown = useCountdown({
    minutes: 0,
    seconds: 30,
    format: "mm:ss",
    autoStart: false,
    onCompleted: () => {
  
      setReady(true);
    }
   
})
 
  
  useEffect( () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  
    DeviceMotion.addListener(dm => {
      onMotionChange(dm);
    });
  
    return () => {
      cleanUp();
    }
  }, []);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  },[]);
  
  const onMotionChange = (dm) => {

    if (dm && dm.rotation) {
      let angle = (dm.rotation.gamma * (57.2958)) + 90;
      if (Math.abs(angle) < 30) {
        //On Forehead
        setOnForehead(true);
        countdown.start();
      }
    }
  }


  const cleanUp = () => {
    DeviceMotion.removeAllListeners();
    countdown.reset();
  }
  const { t, i18n } = useTranslation();
  if(onForehead && !countdown.isRunning){
    countdown.pause();
  }
  return(
    <SafeAreaView>
      <View>
      <ImageBackground
        resizeMode="cover"
        resizeMethod="scale"
        source={require("@/assets/images/bg-white.png")}
        style={styles.imgBackground }
      >
        { !onForehead ? (
          <View style={styles.container}>
            <Text style={styles.text}>{t('game.description')}</Text>
          </View>
        ): null 
        }
        {
           onForehead && !ready  ? (
            <View style={styles.container}>
            <Text style={styles.text}>Get Ready!!</Text>
            <Text style={styles.text} animation="zoomIn">{countdown.seconds}</Text>
          </View>
          ): 
          onForehead && ready?
          (
           <GameComponent />
          ): null
        }

      </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imgBackground:{
    width: '100%',
    height: '100%',
    backgroundColor:"#000"
  },
  container: {
		flex: 1,
		padding: 24,
		alignItems: "center",
	},
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    padding: 10,
  },
});
