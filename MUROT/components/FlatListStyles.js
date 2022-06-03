import { StyleSheet } from "react-native";

const ITEM_HEIGHT = 400;
const styles = new StyleSheet.create({
    "container":{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: "#2A292D",
    },
    "listContainer":{
      justifyContent: 'center'      
  },
    'row': {
      backgroundColor: "#C80435",
      borderRadius: 30,
      margin: 10,
      height: ITEM_HEIGHT,
      justifyContent: 'center'
    },
    'header': {
      height: 20,
    },
    'headerText1': {
      color: "#fff",      
      fontSize: 20,      
    },
    'headerText2': {
      color: "#fff",      
      fontSize: 25,      
    },
    'previewImage':{
      width: '100%',
      height: ITEM_HEIGHT,
      borderRadius: 10,
      padding: 10,
    },
    'profileImage':{
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 25,
      bottom: 20,
      right: 20     
    },
    'btn': {
        width:70, 
        height:70, 
        backgroundColor:'#C80435', 
        padding:10, marginRight: 15, 
        borderColor:'#C80435', 
        borderWidth:1, 
        borderRadius: 35, 
        alignContent:'center', 
        alignItems:'center',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        position: 'absolute'
    },
    'rowLabels':{
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#2A292D",
      left: 10,
      top: 10,
      position: 'absolute',
      padding: 10
    },
    'overlay': {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(69,85,117,0.8)',
    },
    'chart': {
      borderRadius: 10,
      padding: 10,
      margin: 10
    },
})

export default styles;