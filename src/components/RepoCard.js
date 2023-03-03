import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function RepoCard({data}) {
  const {owner, name, stargazers_count, description, language} = data;

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Image
          style={styles.avatar}
          source={{
            uri: owner.avatar_url,
          }}
        />
        <View style={{display: 'flex', alignItems: 'center', marginLeft: 10}}>
          <Text style={styles.heading_text}>Repository Name</Text>
          <Text style={{width: 210, textAlign: 'center'}}>{name}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.text_container}>Stars: {stargazers_count}</Text>
        <Text style={styles.text_container}>Description: {description}</Text>
        <Text style={styles.text_container}>Language: {language}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: 340,
    margin: '4%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '1%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  heading_text: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    paddingLeft: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    margin: 15,
    borderColor: '#000',
    padding: 5,
  },
  text_container: {
    width: 250,
    height: 30,
    bottom: 0,
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {},
});
