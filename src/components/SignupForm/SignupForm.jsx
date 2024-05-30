import React, { useState } from "react";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import { setDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../slices/userSlice";
import { toast } from "react-toastify";
import FileInput from "../common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SelectInput from "../common/Input/SelectInput";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // const handleSignup = async () => {
  //   if (!displayImage) {
  //     console.log("chandan");
  //   }
  //   setLoading(true);
  //   if (password == confirmPassword && password.length >= 6 && name && email) {
  //     try {
  //       // Creating user's account.
  //       console.log(name, password);
  //       const userCredential = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       const user = userCredential.user;

  //       console.log("user created");

  //       //Display image
  //       const displayImageRef = ref(
  //         storage,
  //         `podcasts/${auth.currentUser.uid}/${Date.now()}`
  //       );
  //       await uploadBytes(displayImageRef, displayImage);
  //       const displayImageUrl = await getDownloadURL(displayImageRef);

  //       //Seving user's details.
  //       await setDoc(doc(db, "users", user.uid), {
  //         name: name,
  //         email: user.email,
  //         uid: user.uid,
  //         profilePic: displayImageUrl,
  //       });

  //       //Save data in the redux, call the redux action
  //       dispatch(
  //         setUser({
  //           name: name,
  //           email: user.email,
  //           uid: user.uid,
  //           profilePic: displayImageUrl,
  //         })
  //       );

  //       //Setting a toast message to show the user
  //       toast.success("User has been created successfully!");

  //       //setting loader false
  //       setLoading(false);

  //       // after successfully signup we are redirecting to profile page..
  //       navigate("/profile");
  //     } catch (err) {
  //       toast.error(err.message);
  //       setLoading(false);
  //     }
  //   } else {
  //     // check all input fealds are filled
  //     if (password.trim() == "") {
  //       toast.error("Please enter your password");
  //     } else if (password != confirmPassword) {
  //       toast.error(
  //         "Please Make Suer your password and confirm password matches!"
  //       );
  //     } else if (password.length < 6) {
  //       toast.error("Your password length should more then 6");
  //     } else {
  //       toast.error("Your name and email can not be Empty");
  //     }
  //     setLoading(false);
  //   }
  // };

  const handleSignup = async () => {
    setLoading(true);

    const randomAvatarUrl = `https://avatar.iran.liara.run/public/${gender}?username=${name}`;

    if (
      password === confirmPassword &&
      password.length >= 6 &&
      name &&
      email &&
      gender
    ) {
      try {
        // Creating user's account.
        console.log(name, password);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        console.log("user created");

        let displayImageUrl;

        if (displayImage) {
          // If displayImage is provided, upload it
          const displayImageRef = ref(
            storage,
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
          await uploadBytes(displayImageRef, displayImage);
          displayImageUrl = await getDownloadURL(displayImageRef);
        } else {
          // If displayImage is not provided, use the random avatar URL
          displayImageUrl = randomAvatarUrl;
        }

        // Saving user's details.
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          uid: user.uid,
          profilePic: displayImageUrl,
        });

        // Save data in the redux, call the redux action
        dispatch(
          setUser({
            name: name,
            email: user.email,
            uid: user.uid,
            profilePic: displayImageUrl,
          })
        );

        // Setting a toast message to show the user
        toast.success("User has been created successfully!");

        // Setting loader false
        setLoading(false);

        // After successfully signup, redirect to profile page.
        navigate("/profile");
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    } else {
      // Check if all input fields are filled
      if (password.trim() === "") {
        toast.error("Please enter your password");
      } else if (password !== confirmPassword) {
        toast.error(
          "Please make sure your password and confirm password match!"
        );
      } else if (password.length < 6) {
        toast.error("Your password length should be more than 6");
      } else {
        toast.error("Your name, email and gender cannot be empty");
      }
      setLoading(false);
    }
  };

  const displayImageHandleFun = (file) => {
    setDisplayImage(file);
  };
  return (
    <div className="formContainerWithFlex">
      <Input
        state={name}
        setState={setName}
        placeholder={"Your Name"}
        type="text"
        required={true}
      />
      <Input
        state={email}
        setState={setEmail}
        placeholder={"Your Email"}
        type="email"
        required={true}
      />
      <Input
        state={password}
        setState={setPassword}
        placeholder={"Password"}
        type="password"
        required={true}
      />
      <Input
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"Confirm Password"}
        type="password"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id={"proPic"}
        fileHandleFun={displayImageHandleFun}
      />

      <SelectInput gender={gender} handleGenderChange={handleGenderChange} />

      <Button
        text={loading ? "Loading..." : "Sign Up"}
        disabled={loading}
        onClick={handleSignup}
      />
    </div>
  );
};

export default SignupForm;
