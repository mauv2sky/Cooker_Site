import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Feed from './components/Feed';
import { useReducer, useState } from 'react';

function App() {
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    const [userType, setUserType] = useState(window.localStorage.getItem('state'));

    const fetchCurrentUser = async () => {
        const apiUrl = userType === 'user' ? 'user/current' : 'boss/current';
        setUserType(() => {
            return apiUrl === 'user/current' ? 'user' : 'boss';
        });
    };
    return (
        <Router>
            <Switch>
                <Route path={routes.home} exact />
            </Switch>
        </Router>
    );
}

export default App;
