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
        <div className="flex items-center justify-center">
        <button className="border w-[50%] rounded-full bg-red-400 hover:bg-red-500 mt-2 pl-4 pr-4 p-1" onClick={signUserOut}> Sign Out </button>
      </div>
    )
}
export default SignOut;
