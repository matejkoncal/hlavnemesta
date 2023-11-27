import { useContext } from "react"
import { FirebaseContext } from "./firebaseProvider"

export const useUser = () => {
  return useContext(FirebaseContext);
}
