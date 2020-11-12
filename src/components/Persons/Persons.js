import React, {PureComponent} from 'react';

import Person from './Person/Person'
import classes from "../../containers/App.css";

class Persons extends PureComponent{
    // static getDerivedStateFromProps(props, state){
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }
    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log('[Persons.js] componentWillReceiveProps');
    // }
    // componentWillUpdate(nextProps, nextState, nextContext) {
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if (nextProps.persons !== this.props.persons){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'snap'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render(){
        console.log('[Persons.js] render');
        return this.props.persons.map( (person, index ) => {
            return <Person
                name={person.name}
                age={person.age}
                click={() => this.props.clicked(index)}
                key={person.id}
                changed={(event) =>this.props.changed(event, person.id)}
                isAuth={this.props.isAuthenticated}
            />}
        );
    }

}

export default Persons;