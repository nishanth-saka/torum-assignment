import { StyleSheet } from "react-native";

const ITEM_HEIGHT = 400;
const styles = new StyleSheet.create({
    "container":{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: "#2A292D",
    },
    "scrollContainer":{
      flex: 1,
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
      height: 40,
      backgroundColor: "#d01257",
      flexDirection:'row',
      justifyContent:'space-between',            
    },
    'headerText1': {
      color: "#fff",      
      padding: 10
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
      borderWidth: 20,
      borderColor: '#2A292D'
    },
    'profileImage':{
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 25,
      bottom: 20,
      right: 20,
      borderWidth: 2,
      borderColor: '#fff'
    },
    'btn': {
        width:70, 
        height:70, 
        backgroundColor:'#C80435', 
        padding:10, marginRight: 15, 
        borderColor:'#fff', 
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
      
      left: 10,
      top: 10,
      position: 'absolute',
      padding: 10
    },
    'overlay': {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(63,63,70,0.9)',
    },
    'chart': {
      borderRadius: 10,
      padding: 10,
      margin: 10
    },
    panelHeader: {
      backgroundColor: "#ffffff",
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: "#ffffff",
    },
    panel: {
      padding: 20,
      backgroundColor: "#ffffff",
      paddingTop: 20,
      marginBottom: 0,
    },
    modalHeader: {
      justifyContent: "center",
      alignItems: "center",
    },
    modalHeaderText: {
      fontSize: 15,
      fontFamily: "ubuntu-semibold",
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#00000040",
      marginBottom: 10,
    },
})

export default styles;