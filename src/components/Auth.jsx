import React,{useState} from 'react'
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
import { auth, googleProvider } from '../Config/Firebase';

export default function Auth() {
    const [email, setemail] = useState('')
    const [Password,setpassword]=useState('')

    console.log(auth?.currentUser?.email)

    const SignIn=async ()=>{
        try {
            await createUserWithEmailAndPassword(auth,email,Password)
        } catch (error) {
            console.error(error);
        }
        
    };

    const SignInWithGoogle= async()=>{
            try {
                await signInWithPopup(auth,googleProvider)
                
            } catch (error) {
                console.error(error)
            }
    }

    const LogOut=async()=>{
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <div>
      <input placeholder='Email....' onChange={(e)=>setemail(e.target.value)}/>
      <input placeholder='Password.....' type='password' onChange={(e)=>setpassword (e.target.value)}/>
    </div>
    <button onClick={SignIn}>Sign IN</button>
    <br />
    <button onClick={SignInWithGoogle}>Sign In With Google</button>
    <button onClick={LogOut}>Log Out</button>
    </>
  )
}
