// import React, { useRef } from "react";
// import BottomSheet from "reanimated-bottom-sheet";
// import Animated from "react-native-reanimated";
// import FlatListStyles from './FlatListStyles';

// export default function FlatListSheet() {

//   const showHeader = () => (
//     <View style={FlatListStyles.panelHeader}>
//       <View style={FlatListStyles.modalHeader}>
//         <View style={FlatListStyles.panelHandle} />
//         <Text style={FlatListStyles.modalHeaderText}>
//           Swipe down to close the modal
//         </Text>
//       </View>
//     </View>
//   );
  
//   const showContent = () => (
//     <>
//       <View style={FlatListStyles.panel}>
//         <Text style={{ marginBottom: 10 }}>
//           Hello World!
//         </Text>
//       </View>
//     </>
//   );

//   var sheetRef = useRef(null);
//   var fall = new Animated.Value(1);
//   return (
//     <BottomSheet
//             ref={sheetRef}
//             snapPoints={[330, 0]}
//             initialSnap={1}
//             // callbackNode={this.fall}
//             enabledGestureInteraction={true}
//             renderContent={showContent}
//             renderHeader={showHeader}
// />
//   )
// }
