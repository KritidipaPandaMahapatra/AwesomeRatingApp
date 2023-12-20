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
const ViewUser = (props: any) => {
  let [userId, setUserId] = useState('');
  // let [username, setUserName] = useState('');
  // let [useremail, setUserEmail] = useState('');
  // const [checked, setChecked] = React.useState('first');
  console.log('PPPP user---', props.route.params);
  const user = props.route.params;
  console.log(user.name);
  userId = user.id;

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <Header>ViewUser</Header>
        <View style={styles.container}>
          <View style={styles.box}>
            <View
              style={{
                // flexDirection: 'row',
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
                Name: {user.name}
              </Text>
              <Text style={[styles.label, {fontWeight: 'bold', fontSize: 20}]}>
                Email: {user.email}
              </Text>
              <Text style={[styles.label, {fontWeight: 'bold', fontSize: 20}]}>
                ID: {user.id}
              </Text>
              <Text style={[styles.label, {fontWeight: 'bold', fontSize: 20}]}>
                Role: {user.role}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            // style={styles.buttonStyle}
            onPress={() =>
              Alert.alert('success', 'Rated Successfully', [
                {
                  text: 'Ok',
                  onPress: () => console.log('success'),
                },
              ])
            }></TouchableOpacity>
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
    height: '40%',
    width: '95%',
    backgroundColor: '#ffffff',
    marginHorizontal: 30,
    borderRadius: 15,
    elevation: 8,
    //flexDirection: 'row',
    marginBottom: 20,
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
  // button: {
  //   marginTop: 20,
  // },
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
});
export default ViewUser;
