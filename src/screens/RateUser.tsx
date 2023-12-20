import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  //TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../core/theme';
import Background from '../components/Background';
import Header from '../components/Header';
import {RadioButton} from 'react-native-paper';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import firestore from '@react-native-firebase/firestore';
const RateUser = (props: any) => {
  let [userId, setUserId] = useState('');
  // let [username, setUserName] = useState('');
  // let [useremail, setUserEmail] = useState('');
  // const [checked, setChecked] = React.useState('first');
  console.log('PPPP user---', props.route.params);
  const user = props.route.params;
  console.log(user.name);
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(2);
  userId = user.id;
  console.log(defaultRating);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  // Filled Star. You can also give the path from local
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const RateUser = () => {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        rate: defaultRating,
      })
      .then(() => {
        console.log('USER RATED SUCCESSFUL');
        Alert.alert(
          'Success',
          'Rated Successfully',
          [
            {
              text: 'Ok',
              onPress: () => props.navigation.navigate('Dashboard'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        Alert.alert(
          'Exception',
          error.message,
          [
            {
              text: 'Ok',
              onPress: () => console.log(error.message),
            },
          ],
          {cancelable: false},
        );
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <Header>EditUser</Header>
        <View style={styles.container}>
          <Text style={styles.textStyleSmall}>Please Rate Us</Text>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
              }}>
              {/* <Image
                style={{width: 120, height: 80, resizeMode: 'contain'}}
                source={{
                  uri: user.profile_image,
                }}
              />  */}
              <Text style={[styles.label, {fontWeight: 'bold', fontSize: 20}]}>
                {user.name}
              </Text>
            </View>
          </View>
          {/* View to hold our Stars */}
          <CustomRatingBar />
          <Text style={styles.textStyle}>
            {/* To show the rating selected */}
            {defaultRating} / {Math.max.apply(null, maxRating)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={() =>
              Alert.alert('success', 'Rated Successfully', [
                {
                  text: 'Ok',
                  onPress: () => RateUser(),
                },
              ])
            }>
            {/* //   Alert.alert(defaultRating)}>  */}
            {/* Clicking on button will show the rating as an alert */}
            <Text style={styles.buttonTextStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  box: {
    height: '20%',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 8,
    //flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: theme.colors.secondary,
  },
  input: {
    fontSize: 18,
    width: '40%',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});
export default RateUser;
