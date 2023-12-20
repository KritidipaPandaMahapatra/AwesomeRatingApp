import React, {memo, useEffect, useState} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {Navigation} from '../types';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
type Props = {
  navigation: Navigation;
};
const DATA = [
  {
    id: 1,
    Name: 'Kriti',
    profile_image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU`,
  },
  {
    id: 2,
    Name: 'Dipa',
    profile_image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU`,
  },
  {
    id: 3,
    Name: 'Nupur',
    profile_image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU`,
  },
  {
    id: 4,
    Name: 'Ariyan',
    profile_image: `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000`,
  },
  {
    id: 5,
    Name: 'Dev',
    profile_image: `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000`,
  },
];

const Dashboard = (props: any) => {
  let [listData, setListData] = useState([]);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        /*
          A QuerySnapshot allows you to inspect the collection,
          such as how many documents exist within it,
          access to the documents within the collection,
          any changes since the last query and more.
      */
        let temp: any = [];
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          console.log('user Id: ', documentSnapshot.id);
          /*
          A DocumentSnapshot belongs to a specific document,
          With snapshot you can view a documents data,
          metadata and whether a document actually exists.
        */
          let userDetails: any = {};
          // Document fields
          userDetails = documentSnapshot.data();
          // All the document related data
          userDetails['id'] = documentSnapshot.id;
          temp.push(userDetails);
          setListData(temp);
        });
      });
    //  somefunctionfive();
  }, [isFocused]);
  // const [userData]: any = listData;
  console.log('Listdata', listData);
  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <Header>Dashboard</Header>
        <View style={styles.container}>
          {listData && (
            <FlatList
              data={listData}
              renderItem={({item}: any) => (
                <TouchableOpacity>
                  <View style={styles.box}>
                    {/* <Image
                    style={{width: '50%', height: '50%', resizeMode: 'contain'}}
                    source={{
                      uri: item.profile_image,
                    }}
                  /> */}
                  
                    <View
                      style={{
                        alignItems: 'flex-start',
                        marginLeft: 10,
                        marginHorizontal: 20,
                      }}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text style={styles.title}>{item.role}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('ViewUser', item)
                        }>
                        <Image
                          source={require('../assets/view.png')}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('EditUser', item)
                        }>
                        <Image
                          source={require('../assets/edit.png')}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('RateUser', item)
                        }>
                        <Image
                          source={require('../assets/star.png')}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </Background>
    </SafeAreaView>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  box: {
    height: 120,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 15,
    elevation: 8,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: 15,
  },
  image: {
    width: 20,
    height: 15,
    marginBottom: 12,
  },
});
