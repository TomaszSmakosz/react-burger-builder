import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.isAuthenticated);
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        // setTimeout(() =>{
        //     alert('saved data to cloud');
        // }, 1000);
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {

            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    })

    console.log('[Cockpit.js] render');
    let assignedClasses = [];
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }
    if (props.personsLength <= 2){
        assignedClasses.push(classes.red);
    }
    if(props.personsLength <=1){
        assignedClasses.push(classes.bold);
    }
    return(
        <div className={classes.Cockpit}>
            <h1>Cześć jestem aplikacją reaktywną brrrr</h1>
            <p className={assignedClasses.join(' ')}>ale ze to dziala kox</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}>Toggle persons</button>
            <button onClick={authContext.login}>login</button>

        </div>
    );
};

export default React.memo(cockpit);