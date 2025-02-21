import { call, put, takeLatest } from 'redux-saga/effects';
//import { auth } from '../firebase'
import { getAuth,signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, collection, addDoc, serverTimestamp } from '../firebase'
import { 
    loginRequest, loginSuccess, loginFailure, 
    signupRequest, signupSuccess, signupFailure ,logoutRequest,logoutSuccess,logoutFailure
} from '../slices/AuthSlice'

const auth = getAuth(); 

// Login function
function* login(action) {
    console.log(" Attempting to log in:", action.payload);
    try {
        const { email, password } = action.payload;
        const userCredential = yield call(signInWithEmailAndPassword, auth, email, password);
        
        const user = userCredential.user;
        console.log("User logged in:", user.uid);

        yield put(loginSuccess({ uid: user.uid, email: user.email }));
    } catch (error) {
        yield put(loginFailure(error.message));
    }
}

// Signup function
function* signup(action) {
    try {
        const { email, password } = action.payload;
        console.log("Signing up user:", email);
        const userCredential = yield call( createUserWithEmailAndPassword,auth,
            email,
            password);
            const user = userCredential.user;
            console.log("Firebase Auth User Created:", user.uid);

            //Save user to Firestore in real-time
            yield call(addDoc, collection(db, "users"), {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp(),
            });

       
        yield put(signupSuccess({ uid: user.uid, email: user.email }));
    } catch (error) {
        console.error("Signup error:", error);
        yield put(signupFailure(error.message));
    }
}
function* Logout() {
    try {
        console.log(" Logging out user...");
        yield call(() => signOut(auth));  //  Logs out from Firebase
        console.log("Successfully logged out.");
        yield put(logoutSuccess());
    } catch (error) {
        console.error(" Logout failed:", error.message);
        yield put(logoutFailure(error.message));
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest ,login);
    yield takeLatest(signupRequest, signup);
    yield takeLatest(logoutRequest, Logout);
}
