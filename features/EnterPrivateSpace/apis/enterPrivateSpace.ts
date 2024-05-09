import backendAPI from '../../../apis/backend';
import { EnterPrivateSpaceInputType, EnterPrivateSpaceOutputType } from '../types';

export const enterPrivateSpace = async (input: EnterPrivateSpaceInputType): Promise<EnterPrivateSpaceOutputType> => {
  try {
    const result = await backendAPI.post('/spaces/private', input);
    const { space } = result.data.data;
    return {
      space,
    };
  } catch (error) {
    throw error;
  }
};

// const onDonePress = async () => {
//   // ここでsecretKeyを全部大文字にするようにする。
//   const payload = {
//     userId: auth._id,
//     secretKey: secretKey.toUpperCase(),
//   };
//   showLoadingSpinner();
//   const result = await backendAPI.post('/spaces/private', payload);
//   const { spaceAndUserRelationship } = result.data;
//   setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
//   if (!spaceAndUserRelationships.length) {
//     setCurrentSpaceAndUserRelationship(spaceAndUserRelationship);
//   }
//   setUpdatesTable((previous) => {
//     return {
//       ...previous,
//       [spaceAndUserRelationship.space._id]: {},
//     };
//   });
//   hideLoadingSpinner();
//   setSnackBar({ isVisible: true, message: 'Joined private space successfully.', status: 'success', duration: 5000 });
//   props.navigation?.navigate('SpacesDrawerNavigator');
// };
