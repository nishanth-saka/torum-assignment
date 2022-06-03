import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FlatListStyles from './FlatListStyles';

export default function FlatListHeader(props) {
    return (
        <View style={FlatListStyles.header}>
          <Text style={FlatListStyles.headerText1}>_FlatHeader</Text>
        </View>
      )
}
