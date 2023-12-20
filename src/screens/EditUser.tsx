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
const EditUser = (props: any) => {
  let [userId, setUserId] = useState('');
  let [username, setUserName] = useState('');
  let [useremail, setUserEmail] = useState('');
  const [checked, setChecked] = React.useState('first');
  console.log('PPPP---', props.route.params);
  const user = props.route.params;
  userId = user.id;
  console.log('USER_ID-->', userId);
  console.log(user.name);
  const searchUser = () => {
    console.log('Searching...');
    if (userId) {
      console.log('UserID', userId);
      firestore()
        .collection('Users')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          console.log('Search---', documentSnapshot);
          /*
            A DocumentSnapshot belongs to a specific document,
            With snapshot you can view a documents data,
            metadata and whether a document actually exists.
          */
          if (documentSnapshot.exists) {
            console.log('User data: ', documentSnapshot.data());
            // setUserName(documentSnapshot.data().name);
            // setChecked(documentSnapshot.data().role);
          }
          // else {
          //   setUserName('');
          //   setChecked('');
          // }
        })
        .catch(err => console.error);
    }
  };
    
  const updateUser = () => {
    if (username && useremail && checked) {
      console.log('checked', checked);
      console.log('UserID', userId);
      /*
        Please note update is not just for the update in firebase,
        while updating if record not found in firebase then
        it will create one, update Method also provides support for
        updating deeply nested values via dot-notation
        .update({ 'details.address.zipcode': 452012 })
      */

      firestore()
        .collection('Users')
        .doc(userId)
        .update({
          name: username,
          email: useremail,
          role: checked,
        })
        .then(() => {
          console.log('USER UPDATED');
          Alert.alert(
            'Success',
            'Updated Successfully',
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
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <Header>EditUser</Header>
        <TextInput
          label="UserId"
          returnKeyType="next"
          value={user.id}
          onChangeText={userId => setUserId(userId)}
          keyboardType="default"
          textContentType="name"
        />
        <Button
          mode="contained"
          onPress={() => searchUser()}
          style={styles.button}>
          Search User
        </Button>
        {/* <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}>
             <Image
              style={{width: 120, height: 80, resizeMode: 'contain'}}
              source={{
                uri: user.profile_image,
              }}
            /> 
            <Text style={[styles.label, {fontWeight: 'bold', fontSize: 20}]}>
              {user.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={{marginHorizontal: 20, fontWeight: '700'}}>ROLE</Text>
            <Text style={styles.label}>Manager</Text>
            <RadioButton
              value="Manager"
              status={checked === 'Manager' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Manager')}
            />
            <Text style={styles.label}>Employee</Text>
            <RadioButton
              value="Employee"
              status={checked === 'Employee' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Employee')}
            />
          </View>
          <TouchableOpacity>
            <Text style={[styles.label, {marginBottom: 15}]}>
              Change User Name to
            </Text>
            <TextInput
              label="Name"
              returnKeyType="next"
              value={name}
              onChangeText={text => {
                setName(text);
              }}
              keyboardType="default"
              textContentType="name"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.label}>Change Profile Picture</Text>
          </TouchableOpacity> */}
        <TextInput
          label="Name"
          returnKeyType="next"
          value={username}
          onChangeText={text => {
            setUserName(text);
          }}
          keyboardType="default"
          textContentType="name"
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={useremail}
          onChangeText={text => {
            setUserEmail(text);
          }}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text style={{marginHorizontal: 20, fontWeight: '700'}}>ROLE</Text>
          <Text style={styles.label}>Manager</Text>
          <RadioButton
            value="Manager"
            status={checked === 'Manager' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Manager')}
          />
          <Text style={styles.label}>Employee</Text>
          <RadioButton
            value="Employee"
            status={checked === 'Employee' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Employee')}
          />
        </View>
        <Button
          mode="contained"
          onPress={() => {
            updateUser();
          }}
          style={styles.button}>
          Update
        </Button>
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
    height: '60%',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 8,
    //flexDirection: 'row',
    marginBottom: 10,
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
});
export default EditUser;
