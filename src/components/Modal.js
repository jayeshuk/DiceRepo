import React from 'react';
import {Modal, Text, View, Pressable, StyleSheet} from 'react-native';

export default function SortModal({
  modalVisible,
  setModalVisible,
  selectedSort,
  setSelectedSort,
  sortData,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{borderWidth: 1}}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Sort Repositories</Text>
          <View>
            {[
              'None',
              'Stars',
              'Watchers Count',
              'Score',
              'Name',
              'Created At',
              'Updated At',
            ].map((sortParam, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  console.log('Setting Sort Parameter', sortParam);
                  setSelectedSort(sortParam);
                  setModalVisible(false);
                  sortData(sortParam);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                  },
                  {borderWidth: selectedSort === sortParam ? 1 : 0},
                ]}>
                <Text style={styles.sortOptionText}>{sortParam}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  sortOptionText: {
    margin: 5,
    // borderWidth: 1,
    padding: 5,
    // backgroundColor: '#DDDDDD',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  modalTitle: {
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
});
