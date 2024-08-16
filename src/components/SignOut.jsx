import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Cookies from "universal-cookie";

const cookies = new Cookies();
function SignOut({setIsAuth , setRoom}){
    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
        setRoom(null);
      }
    return (
        <div className="sign-out">
        <button className="btn btn-danger" onClick={signUserOut}> Sign Out </button>
      </div>
    )
}
export default SignOut;
