import { View, Text, FlatList, FlatListStylesheet, Image, TouchableOpacity } from 'react-native'
import React, {useCallback, useMemo, useState, Suspense, useRef} from 'react'
import { QueryClient, useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import FlatListStyles from './FlatListStyles';
import FlatListComponent from './FlatList';
import axios from 'react-native-axios';
const sampleData = {
  id: "iLNPS0N_6J4",
  user: {profile_image: "https://images.unsplash.com/profile-1634227720022-77e396999fc8image?ixlib=rb-1.2.1&crop=faces&fit=crop&w=128&h=128"},
  urls:{full: "https://images.unsplash.com/photo-1638913971873-bcef634bdcd9?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjg2Nzh8MXwxfGFsbHwxfHx8fHx8Mnx8MTY1NDEwNjc5OQ&ixlib=rb-1.2.1&q=80"}
};

const sampleArray = [1,2,3].map((value, index) => {
  return sampleData;
})

export default function HomeScreen() {
  var _FlatListRef = useRef();
  const [showLoadMore, setLoadMore] = useState(false)
  const queryClient = useQueryClient();
 
  
  const _fetchData =  ({ pageParam = 0 }) =>  
  fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${pageParam}`).then(async(response) => {
    const results = await response.json();
    return { results, nextPage: pageParam + 1, totalPages: 5 };
    // return  res.json();
  })

  const {
    isLoading, 
    error, 
    status,
    isFetching,
    isFetched, 
    isFetchingNextPage,
    data, 
    fetchNextPage, 
    hasNextPage
  } = useInfiniteQuery('item', _fetchData, {
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage !== null) {
        return lastPage.nextPage;
      }
      return lastPage;
    },
    staleTime: 10 * 60 * 1000
  })

    

  const _flattenData = data?.pages?.map(page => {
    console.log(``);
    console.log(`page:`);
    console.log(page?.results?.data);
    console.log(``);
    return page?.results?.data
  }).flat();

 


  return (
    <View style={FlatListStyles.container}>
      {(isLoading) && <Text  style={FlatListStyles.headerText1}>Loading...</Text>}
      {_flattenData?.[0] && 
      <>
        <FlatListComponent 
          data={_flattenData?.[0] ? _flattenData : []}
          isLoading={isLoading}
          isFetched={isFetched}
          showLoadMore={showLoadMore}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          setLoadMore={setLoadMore}
          isFetchingNextPage={isFetchingNextPage}
        />
          <TouchableOpacity style={[FlatListStyles.btn, {display: showLoadMore ? 'flex' : 'none'}]}
              onPress={(args) => {

              }} />  
      </>                
      }  
    </View>
  )
}

