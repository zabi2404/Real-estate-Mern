import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../../firsbase';
import axios from "axios";
import { signInSuccess } from "../../redux/user/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";


export default function Oauth() {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const getGoogleAuthErrorMessage = (code?: string) => {
        switch (code) {
            case "auth/popup-blocked":
                return "Popup blocked by browser. Please allow popups and try again.";
            case "auth/popup-closed-by-user":
                return "Google sign in popup was closed before completing.";
            case "auth/unauthorized-domain":
                return "This domain is not authorized in Firebase. Add your Netlify domain in Firebase Authentication > Authorized domains.";
            case "auth/invalid-api-key":
                return "Invalid Firebase API key. Check Netlify environment variables.";
            case "auth/network-request-failed":
                return "Network issue while contacting Firebase. Please check your connection and try again.";
            default:
                return "Google sign in failed. Please try again.";
        }
    };

    const handleGoogleClick = async () => {
        if (loading) return;

        try {
            const missingFirebaseEnv = [
                import.meta.env.VITE_FIREBASE_API_KEY,
                import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
                import.meta.env.VITE_FIREBASE_PROJECT_ID,
                import.meta.env.VITE_FIREBASE_APP_ID,
            ].some((value) => !value);

            if (missingFirebaseEnv) {
                toast.error("Firebase configuration is missing. Please set all VITE_FIREBASE_* variables in Netlify.");
                return;
            }

            setLoading(true);
            const provider = new GoogleAuthProvider()
            provider.setCustomParameters({ prompt: "select_account" });
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)

            const { displayName, email, photoURL } = result.user;
            const response = await axios.post('/api/auth/google', { username: displayName, email, photoURL })
            dispatch(signInSuccess(response.data))
            toast.success("Signed in with Google");
            Navigate('/')
        } catch (error: any) {
            if (error?.code?.startsWith("auth/")) {
                toast.error(getGoogleAuthErrorMessage(error.code));
                return;
            }

            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
                return;
            }

            toast.error("Could not complete Google sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <button disabled={loading} onClick={handleGoogleClick} type='button' className="text-white bg-red-700 w-full  max-w-[450px] min-w-[300px]  p-4 rounded-[6px] flex justify-center items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Signing in with Google..." : "Continue with Google"}
        </button>
    )
}
