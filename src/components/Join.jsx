import React, {useState} from 'react'
import { app } from '../firebaseInit'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, setDoc} from 'firebase/firestore'

const Join = ({history}) => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const [form, setForm] = useState({
        email:'user20@email.com',
        password:'12341234'
    });
    const {email, password} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        //회원가입
        createUserWithEmailAndPassword(auth, email, password)
        .then((success)=>{
            setDoc(doc(db, 'users', email), {
                email:email, 
                name:'',
                address:'',
                phone:'',
                photo:''
            })
            alert("회원가입성공!");
            history.push('/login');
        })
        .catch((error)=> {
            alert("회원가입실패!" + error.message);
        })
    }

    return (
        <div className='login'>
            <h1>회원가입</h1>
            <form onSubmit={onSubmit}>
                <input name="email" 
                    onChange={onChange}
                    value={email} placeholder='email'/>
                <input name="password" 
                    onChange={onChange} type="password"
                    value={password} placeholder='password'/>
                <button>회원가입</button>
            </form>
        </div>
    )
}

export default Join