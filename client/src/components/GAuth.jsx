import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import app from '../firebase.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { FaGoogle } from "react-icons/fa";
import { useGoogleSignMutation } from '../features/auth/authApi.js';
import { toast } from 'react-toastify';

const GAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [google] = useGoogleSignMutation();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const userData = {
        username: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email
      };
      console.log(userData)

      const response = await google(userData).unwrap();
      console.log(response);
      console.log(response?.data);

      if (response.status === 'success') {
        dispatch(setCredentials(response?.data))
        toast.success(response.message, {
          position: "top-right"
        });
        nav('/')
      }
    } catch (error) {
      console.log('googlesign error:', error);
      toast.error(error.message, {
        position: "top-right"
      });
    }
  }
  return (
    <div className="w-full">
      <div className="border rounded-md border-zinc-900 py-3 px-4 flex gap-3 items-center text-md font-semibold justify-center hover:bg-zinc-800 dark:hover:bg-zinc-200 dark:hover:text-black hover:text-white dark:border-zinc-200 transition-all duration-500 cursor-pointer" onClick={handleGoogleClick}>
        <FaGoogle className="w-6 h-6" />Continue with Google
      </div>
    </div>
  )
}
export default GAuth