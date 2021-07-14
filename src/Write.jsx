import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import { db } from './firebase_config';
import { useHistory } from 'react-router-dom';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


const Write = (props) => {

    const [note, setNote] = useState({ title: "", content: ''});
    const [myNotes, setMyNotes] = useState([]);
    const [c, setC] = useState(false);
    const history = useHistory();
    

    useEffect(() => {
        if (props.user) {
            const temp = db.collection('notes').doc(props.user.uid);
            temp.onSnapshot(docSnap => {
                if (docSnap.exists) {
                    setMyNotes(docSnap.data().notes)
                } else {
                    console.log('No Notes')
                }
            })
        } else {
            history.push('/login');
        }
// eslint-disable-next-line
    }, [])

    const InputF = (event) => {
        // alert('clicked');
        const { name, value } = event.target;
        console.log(name, value);
        setNote((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const AddE = () => {
        // props.pass(note);
        db.collection('notes').doc(props.user.uid).set({
            notes: [...myNotes, note]
        })
        setNote({ title: "", content: "" });
        
    }

    const check = () => {
        setC(true);
    }

    const Del = (del) =>{
        const temp = db.collection('notes').doc(props.user.uid)
        temp.get().then(docSnap=>{
            const res = docSnap.data().notes.filter((val, index) =>{
                return del !== index
            })
            temp.update({
                notes:res
            })
        })
    }

    return (
        <>  
            <div className="write" onChange={InputF} onClick={check} onDoubleClick={() => { setC(false) }}>
                {c === true ?
                    <>
                        <input type='text' value={note.title} name='title' placeholder='Title' className='title' autoComplete='off' />
                    </> : null
                }
                <textarea type='text-area' rows='' column='' value={note.content} name='content' placeholder='Write here' autoComplete='off' className='content' />
                {c === true ?
                    <>

                        <Button onClick={AddE} className='btn'>
                            <AddCircleIcon style={{ color: 'green', fontsize: 40 }} />
                        </Button></> : null
                }
            </div>

            <div className="show">
                {myNotes.map((val, i) => {
                    return (
                        <div className="showin" key={val}>

                            <h2>{val.title}</h2>
                            <p>{val.content}</p>
                            <div className='abs'>
                                <Button onClick={()=>Del(i)} className='b1'>
                                    <DeleteRoundedIcon style={{ color: 'red' }} />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Write;