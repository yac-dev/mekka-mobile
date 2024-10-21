// import React, { useEffect, useRef } from 'react';
// import { ActivityIndicator, Animated, Image, StyleSheet, View } from 'react-native';
// import { useQuery } from '@tanstack/react-query';
// import { queryKeys, getMySpaces, getLogsByUserId } from '../../../query';
// import { useRecoilState } from 'recoil';
// import { authAtom } from '../../../recoil';

// export const ReloadingIndicator = () => {
//   const [auth] = useRecoilState(authAtom);
//   const { isRefetching: isRefetchingMySpaces } = useQuery({
//     queryKey: [queryKeys.mySpaces, auth],
//   });
//   const { isRefetching: isRefetchingLogs } = useQuery({
//     queryKey: [queryKeys.logs, auth],
//   });

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const positionAnim = useRef(new Animated.Value(0)).current;
//   const fadeAnimStyle = { opacity: fadeAnim };
//   const positionAnimStyle = {
//     transform: [
//       {
//         translateY: positionAnim,
//       },
//     ],
//   };

//   useEffect(() => {
//     // Animated.timing(fadeAnim, {
//     //   toValue: isRokuoDeliveryButtonBlured ? 0.2 : 1,
//     //   duration: 100,
//     //   useNativeDriver: true,
//     // }).start();

//     Animated.timing(positionAnim, {
//       toValue: isRefetchingMySpaces && isRefetchingLogs ? 50 : 0,
//       duration: 700,
//       useNativeDriver: true,
//     }).start();
//   }, [isRefetchingMySpaces, isRefetchingLogs]);

//   return (
//     <Animated.View style={[positionAnimStyle]}>
//       <View style={styles.container}>
//         {/* <ActivityIndicator size='small' color='white' /> */}
//       </View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     alignSelf: 'center',
//     width: 65,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'red',
//   },
//   button: {
//     width: 16,
//     height: 16,
//     position: 'absolute',
//     top: 13,
//     right: -3,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
// });
