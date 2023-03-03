import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import SortModal from './src/components/Modal';
import RepoCard from './src/components/RepoCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
const {Octokit} = require('@octokit/rest');

const YourApp = () => {
  const [query, onChangeQuery] = useState('');
  const [repos, setRepos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortDir, setSortDir] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const octokit = new Octokit({
    auth: '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',
  });

  // const octokit = new Octokit({
  //   baseUrl: 'https://api.github.com',
  // });

  // octokit.authenticate({
  //   type: 'basic',
  //   username: 'jayeshukalkar@gmail.com',
  //   password: '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',
  // });

  const FetchRepos = async () => {
    setLoading(true);
    await octokit
      .request('GET /search/repositories', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        q: query, //Replace it with the search query
      })
      .then(res => {
        setLoading(false);
        console.log('Success');
        console.log(res.data.items);
        setRepos([...res.data.items]);
      })
      .catch(err => {
        setLoading(false);
        console.log('Error', err);
        setErrorMessage(JSON.stringify(err));
      });
  };

  const onSearchPress = () => {
    Keyboard.dismiss();
    console.log('Search Pressed');
    FetchRepos();
  };

  const onSortPress = () => {
    console.log('Sort Pressed');
    setModalVisible(true);
  };

  const sortData = sortParam => {
    console.log('Sorting Started');

    const obj = {
      Stars: 'stargazers_count',
      'Watchers Count': 'watchers',
      Score: 'score',
      Name: 'name',
      'Created At': 'created_at',
      'Updated At': 'updated_at',
    };

    console.log('Field Name extracted out of Object', obj[sortParam]);

    console.log('Before Sorting', repos);
    let data = repos;
    let property = obj[sortParam];
    if (['stargazers_count', 'watchers', 'score'].includes(property)) {
      if (sortDir) {
        data.sort((x, y) => (x[property] > y[property] ? -1 : 1));
      } else {
        data.sort((x, y) => (x[property] > y[property] ? 1 : -1));
      }
    } else if (sortParam === 'Name') {
      if (sortDir) {
        data?.sort((a, b) => (a[property] > b[property] ? -1 : 1));
      } else {
        data?.sort((a, b) => (a[property] > b[property] ? 1 : -1));
      }
    } else {
      if (sortDir) {
        data.sort((a, b) =>
          new Date(a[property]) > new Date(b[property]) ? -1 : 1,
        );
      } else {
        data.sort((a, b) =>
          new Date(a[property]) > new Date(b[property]) ? 1 : -1,
        );
      }
    }
    console.log('After Sorting', data);

    setRepos(data);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        margin: 10,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>DiceRepo App</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeQuery}
        value={query}
        placeholder="Type keywords to search. Eg: 'hackathon'"
      />

      {/* Search Button */}
      <View style={styles.button_container}>
        <Button onPress={onSearchPress} title="Search" color="#4871f7" />
      </View>

      {/* Sort and Direction Button */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingBottom: 20,
          justifyContent: 'center',
        }}>
        <Button
          onPress={onSortPress}
          title={
            selectedSort === 'None' || selectedSort === ''
              ? 'Sort'
              : `Sort: ${selectedSort}`
          }
          color="#888"
          style={{flex: 1, marginLeft: 5, marginRight: 5}}
          disabled={repos.length > 0 ? false : true}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            setSortDir(!sortDir);
            sortData(selectedSort);
            console.log('Sort Direction Changed');
          }}>
          <View style={{marginLeft: '8%'}}>
            {sortDir ? (
              <Icon name="sort-amount-down-alt" size={28} color="#000" />
            ) : (
              <Icon name="sort-amount-up" size={28} color="#000" />
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* Loader */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#4871f7" />
        </View>
      ) : (
        <Text style={{color: 'red'}}>
          {errorMessage ? `Error: ${errorMessage}` : null}
        </Text>
      )}

      {/* Repository Card List */}
      <View style={{flex: 1}}>
        {repos ? (
          <FlatList
            data={repos}
            renderItem={({item}) => {
              return <RepoCard data={item} />;
            }}
            keyExtractor={repo => repo.id}
          />
        ) : null}
      </View>

      {/* Sort Selection Modal */}
      <SortModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        sortData={sortData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  button_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '70%',
    paddingBottom: 20,
  },
});

export default YourApp;
