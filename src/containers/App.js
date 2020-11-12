import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] constructor');

    }

    state = {
        persons: [
            { id: '1', name: 'Max', age:28},
            { id: '12', name: 'Manu', age:28},
            { id: '123', name: 'Stephanie', age:28}
        ],
        otherState: 'other val',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        isAuthenticated: false

    }

    static getDerivedStateFromProps(props, state){
        console.log('[App.js] getDerivedStateFromProps');
        return state;
    }

    componentWillMount() {
        console.log('[App.js] componentWillMount');
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[App.js] shouldComponentUpdate');
        return true;
    }

    componentDidUpdate() {
        console.log('[App.js] componentDidUpdate');
    }

    nameChangedHandler = (event, id) =>{
        const personIndex = this.state.persons.findIndex(p =>{
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        }

        person.name = event.target.value;
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            };
        });
    }

    togglePersonsHandler = () =>{
        this.setState(
            {
                showPersons: !this.state.showPersons
            }
        );
    }

    loginHandler = () => {
        this.setState({isAuthenticated: true});
    };

    deletePersonHandler = (index) => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons});
    }

    render() {
        console.log('[App.js] render');
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.nameChangedHandler}
                        isAuthenticated={this.state.isAuthenticated}/>;
        }

        return (
            <Aux classes={classes.App}>
                <button onClick={() => {this.setState({showCockpit: false})}}>remove cockpit</button>
                <AuthContext.Provider value={{isAuthenticated: this.state.isAuthenticated, login: this.loginHandler}}>
                    {this.state.showCockpit ? (<Cockpit
                        title={this.props.appTitle}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonsHandler}/>)
                    : null}
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
}

export default withClass(App, classes.App);
