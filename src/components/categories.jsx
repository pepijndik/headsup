import { StyleSheet, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Text, Button } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import FlipCard from 'react-native-flip-card'
// @ts-nocheck
export default function Categories(){
    const categories = []
    return(
       {
        categories.map((category, index) => (
        <FlipCard
        style={[this.styles.container]}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
        key={index}
      >
        <View
          style={[this.styles.rect, this.styles.bgBlue]}>
          <ImageBackground
            source="https://picsum.photos/seed/picsum/200/300"
            style={this.styles.image}
            imageStyle={this.styles.image_imageStyle}
          >
            <View style={{
              padding: 5, flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={[this.styles.text, this.styles.textWhite]}>{category.title}</Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={[this.styles.rect, this.styles.bgWhite]}>
          <ImageBackground
            source={require("../../assets/images/bg-blue.png")}
            style={this.styles.image}
            imageStyle={this.styles.image_imageStyle}
          >
            <View style={{
              padding: 5, flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
              <Text style={[this.styles.text, this.styles.textBlue]}>{category.description}</Text>
              <Button
                onPress={() => this.props.navigate(this.props.destinationPage, {
                  data: category.title
                })}
                style={{ alignSelf: 'center', marginBottom: 10 }}
              >
                <Text>Start Game</Text>
              </Button>
            </View>
          </ImageBackground>
        </View>
      </FlipCard>
       ))}
    );
}

StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "rgba(15,15, 15,0)"
    },
    bgBlue: {
      backgroundColor: "rgba(23,137,252,1)",
    },
    bgWhite: {
      backgroundColor: "rgba(238,238,238,1)",
    },
    textBlue: {
      color: "rgba(23,137,252,1)",
    },
    textWhite: {
      color: "rgba(238,238,238,1)",
    },
    rect: {
      width: null,
      height: 200,
      borderWidth: 0,
      borderColor: "rgba(15,15, 15,0)",
      borderRadius: 17,
      marginTop: 30,
      marginHorizontal: 21,
    },
    image: {
      width: '100%',
      height: 201,
      position: "absolute",
      backgroundColor: "rgba(230, 230, 230,0)",
      left: 0,
      top: -1,
      borderWidth: 0,
      borderRadius: 17,
      overflow: "hidden",

      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'space-evenly',
    },
    image_imageStyle: {
      opacity: 1
    },
    text: {
      textAlign: "center",
      fontSize: 38,
      width: '100%',
      height: '100%',
    },
  });