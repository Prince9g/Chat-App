import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const Auth = ( {setIsAuth} ) => {
  const signInWithGoogle = async () => {
    try{
    const result = await signInWithPopup(auth, provider);
    cookies.set("auth-token", result.user.refreshToken);
    setIsAuth(true);
    } catch(err){
        console.log('there is something error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col justify-center items-center border-2 border-sky-200 pt-4 pb-4 rounded-3xl">
      <p className="mb-2 text-xl font-semibold">"Come! Let's Chat"</p>
      <img src="https://media2.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif?cid=6c09b952bnt1uolglv8ywpu7f93nnpkl9108dur3ctvlcpx8&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" className="w-full sm:h-[50%] sm:w-[60%]"/>
      <p className="font-bold text-xl">Sign in With Google To Continue</p>
      <button className="flex items-center justify-center border rounded-full pr-4 pl-2 pt-1 pb-1 gap-2 font-semibold text-lg bg-sky-200 hover:bg-sky-300" onClick={signInWithGoogle}><span><img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-10 h-10"/></span>Sign in with Google</button>
      </div>
    </div>
  );
};
