// import React from 'react'
// import { useContext } from 'react';
// import { useReducer } from 'react';
// import { createContext } from 'react'


// const AuthContext = createContext();
// const initialState= { isAuthenticated:false};



// const reducer= (state  ,{ type }) => {
//   switch (type) {

//   case 'LOGIN':
//     return { ...state, isAuthenticated: true }
//     case 'LOGOUT':
//       return {...state,  isAuthenticated: false }

//   default:
//     return state
//   }
// }


// export default function AuthContextProvider({children}){

//     const [state, dispatch] = useReducer(reducer, initialState)
//     return (
//       <AuthContext.Provider value={{...state, dispatch}}>
// {children}     
//  </AuthContext.Provider>
//     )
//   }

//  export const useAuthContext=()=>{
//     return useContext(AuthContext)
//   }




// import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const AuthContext = createContext();

// const initialState = { isAuthenticated: false, user: null };

// const reducer = (state, { type, payload }) => {
//   switch (type) {
//     case 'SET_LOGGED_IN':
//       return { isAuthenticated: true, user: payload.user };
//     case 'SET_PROFILE':
//       return { ...state, user: payload.user };
//     case 'SET_LOGGED_OUT':
//       return initialState;
//     default:
//       return state;
//   }
// };

// export default function AuthContextProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const handleAuthStateChange = useCallback(() => {
//     const unsubscribe = auth().onAuthStateChanged(async (user) => {
//       if (user) {
//         await fetchUserProfile(user);
//       } else {
//         dispatch({ type: 'SET_LOGGED_OUT' });
//       }
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     const unsubscribe = handleAuthStateChange();
//     return unsubscribe;
//   }, [handleAuthStateChange]);

//   const fetchUserProfile = async (user) => {
//     try {
//       const docSnap = await firestore().collection('users').doc(user.uid).get();
//       if (docSnap.exists) {
//         dispatch({
//           type: 'SET_LOGGED_IN',
//           payload: { user: { ...docSnap.data(), uid: user.uid } }, // Include UID
//         });
//       } else {
//         console.log('No user profile found.');
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };
  

//   const logOut = async () => {
//     try {
//       await auth().signOut();
//       dispatch({ type: 'SET_LOGGED_OUT' });
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   const updateUser = async (updatedUser) => {
//     if (!state.user?.uid) return;

//     try {
//       await firestore().collection('users').doc(state.user.uid).update(updatedUser);
//       dispatch({ type: 'SET_PROFILE', payload: { user: { ...state.user, ...updatedUser } } });
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ ...state,dispatch, user: state.user, logOut, updateUser, }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuthContext = () => useContext(AuthContext);

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: null, loading: true };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOGGED_IN':
      return { isAuthenticated: true, user: payload, loading: false };
    case 'SET_LOGGED_OUT':
      return { ...initialState, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: payload };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docSnap = await firestore().collection('users').doc(user.uid).get();
          if (docSnap.exists) {
            dispatch({
              type: 'SET_LOGGED_IN',
              payload: { ...docSnap.data(), uid: user.uid },
            });
          } else {
            console.log('No user profile found, logging out.');
            await auth().signOut();
            dispatch({ type: 'SET_LOGGED_OUT' });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          dispatch({ type: 'SET_LOGGED_OUT' });
        }
      } else {
        dispatch({ type: 'SET_LOGGED_OUT' });
      }
    });
    return unsubscribe;
  }, []);

  const logOut = async () => {
    try {
      await auth().signOut();
      dispatch({ type: 'SET_LOGGED_OUT' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      if (!state.user?.uid) throw new Error('User not authenticated');
      await firestore().collection('users').doc(state.user.uid).update(updatedUser);
      dispatch({ type: 'SET_LOGGED_IN', payload: { ...state.user, ...updatedUser } });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, logOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
