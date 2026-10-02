import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';

const auth = getAuth(app);

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // success
    const user = userCredential.user;
    localStorage.setItem("currentUser", JSON.stringify({
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName
    }));
    navigate("/"); // redirect to home page
  })
  .catch((error) => {
    console.error("Login error", error.message);
    toast({
      title: "Login failed",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  });
