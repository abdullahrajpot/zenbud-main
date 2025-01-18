// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
// import { Avatar } from 'react-native-paper';
// import Back from 'react-native-vector-icons/Ionicons';
// import { RadioButton } from 'react-native-paper';
// import ImagePicker from 'react-native-image-crop-picker';
// import Toast from 'react-native-toast-message';

// import { firebase } from '@react-native-firebase/auth';
// import { updateProfile } from '@react-native-firebase/storage';
// import { getDatabase, ref, set } from 'firebase/database';
// import { useAuthContext } from '../../../contexts/AuthContext';

// // Firebase storage setup
// const db = getDatabase();

// const height = Dimensions.get('window').height * 1;

// function UpdateProfile() {
//   const { user, updateUser } = useAuthContext(); // Access user data and update function
//   const [image, setImage] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [gender, setGender] = useState('');
//   const [profession, setProfession] = useState('');
//   const [mobile, setMobile] = useState('');

//   // Initialize the state with the user data from context
//   useEffect(() => {
//     if (user) {
//       setEmail(user.email);
//       setGender(user.gender);
//       setImage(user.image);
//       setProfession(user.profession);
//       setName(user.name);
//       setMobile(user.mobile);
//     }
//   }, [user]);

//   // Function to select a photo from the gallery
//   const selectPhoto = () => {
//     ImagePicker.openPicker({
//       width: 400,
//       height: 400,
//       cropping: true,
//       includeBase64: true, // Keep base64 data, but compress image
//       compressImageMaxWidth: 800,  // Reduce max width
//       compressImageMaxHeight: 800, // Reduce max height
//       compressImageQuality: 0.3,  // Compress the quality of the image
//     }).then(image => {
//       const data = `data:${image.mime};base64,${image.data}`;
//       setImage(data);  // Set the image data
//     });
//   };

//   // Update user profile and call Firebase to update
//   const updateProfileInfo = () => {
//     const userData = {
//       name: name,
//       image,
//       email,
//       profession,
//       mobile,
//       gender
//     };

//     const userRef = ref(db, 'users/' + user.uid);
//     set(userRef, userData)
//       .then(() => {
//         // Update the user data in context (if necessary)
//         updateUser(userData);
//         Toast.show({
//           type: 'success',
//           text1: 'Profile Updated',
//         });
//       })
//       .catch(err => {
//         console.error(err);
//         Toast.show({
//           type: 'error',
//           text1: 'Something went wrong',
//         });
//       });
//   };

//   return (
//     <ScrollView
//       keyboardShouldPersistTaps={'always'}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: 40 }}>
//       <View>
//         <View style={styles.header}>
//           <View style={{ flex: 1 }}>
//             <Back name="arrow-back" size={30} style={styles.backIcon} />
//           </View>
//           <View style={{ flex: 3 }}>
//             <Text style={styles.nameText}>Edit Profile</Text>
//           </View>
//           <View style={{ flex: 1 }}></View>
//         </View>

//         <View style={styles.camDiv}>
//           <View style={styles.camIconDiv}>
//             <Back name="camera" size={22} style={styles.cameraIcon} />
//           </View>

//           <TouchableOpacity onPress={() => selectPhoto()}>
//             <Avatar.Image
//               size={140}
//               style={styles.avatar}
//               source={{
//                 uri: image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08lhUqq3QBw4ojkUJrdtYmXDTf3Oebq6k47ygg0z4yxKjmEDx9uogxkxv9xL5c79m1M14nkY9AD+gGgkAeAg/fIiAovN8ywnlS61gRI4f52d4FLI/cjGs4rWz9CgZKfCqj/7HXr4n2Vop7gjLBbfgvo0lTS3AaDSddqd2A3fNKp9Ipx6wE0nNxFz3xMfsw0nUwv6gdwAAAABJRU5ErkJggg==',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={styles.inputTitle}>Name</Text>
//           <TextInput
//             value={name}
//             onChangeText={setName}
//             style={styles.textInput}
//             placeholder="Enter Your Full Name"
//           />

//           <Text style={styles.inputTitle}>Email</Text>
//           <TextInput
//             value={email}
//             editable={false}
//             style={styles.textInput}
//             placeholder="Email Address"
//           />

//           <Text style={styles.inputTitle}>Mobile</Text>
//           <TextInput
//             value={mobile}
//             onChangeText={setMobile}
//             style={styles.textInput}
//             placeholder="Enter Mobile Number"
//           />

//           <Text style={styles.inputTitle}>Gender</Text>
//           <View style={styles.radioGroup}>
//             <View style={styles.radioButton}>
//               <RadioButton
//                 value="male"
//                 status={gender === 'male' ? 'checked' : 'unchecked'}
//                 onPress={() => setGender('male')}
//               />
//               <Text>Male</Text>
//             </View>
//             <View style={styles.radioButton}>
//               <RadioButton
//                 value="female"
//                 status={gender === 'female' ? 'checked' : 'unchecked'}
//                 onPress={() => setGender('female')}
//               />
//               <Text>Female</Text>
//             </View>
//           </View>

//           <Text style={styles.inputTitle}>Profession</Text>
//           <TextInput
//             value={profession}
//             onChangeText={setProfession}
//             style={styles.textInput}
//             placeholder="Enter Your Profession"
//           />

//           <TouchableOpacity onPress={updateProfileInfo} style={styles.saveBtn}>
//             <Text style={styles.saveBtnText}>Save Changes</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = {
//   header: {
//     marginTop: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   backIcon: {
//     color: '#000',
//     marginLeft: 10,
//   },
//   nameText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   camDiv: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   camIconDiv: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 2,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     padding: 10,
//   },
//   cameraIcon: {
//     color: '#000',
//   },
//   avatar: {
//     borderColor: '#FFF',
//     borderWidth: 4,
//   },
//   formContainer: {
//     marginTop: 40,
//     marginLeft: 20,
//     marginRight: 20,
//   },
//   inputTitle: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 20,
//   },
//   radioGroup: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   saveBtn: {
//     backgroundColor: '#007bff',
//     borderRadius: 8,
//     paddingVertical: 15,
//     alignItems: 'center',
//   },
//   saveBtnText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// };

// export default UpdateProfile;
