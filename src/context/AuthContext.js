import { useReducer, createContext} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //         "_id":"62ad69b81d7eda68323a4965",
  //         "username":"person2",
  //         "email":"person2@gmail.com",
  //         "password":"$2b$10$38Aez9v2Ee4jhd2n4RVbBO2QMFHZgu77nbiRZ0ASIHfyA9wy1O9oi",
  //         "profilePicture":"person/1.jpg",
  //         "coverPicture":"",
  //         "followers":[],
  //         "isAdmin":false,
  //         "followings":["62ad66f9176efef7556f2ce2","62aeb523caac6db5d9f56685"],
  //         "desc":"Hello, my friends and friends of friends",
  //         "city":"delhi",
  //         "from":"mumbai",
  //         "relationship":1
  //       },
  isFetching: false,
  error: false,
  user:null
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider 
      value = {{
        user: state.user, 
        isFetching: state.isFetching, 
        error:state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>

  )
}