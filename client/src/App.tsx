import React, {useEffect} from 'react';
import LoginForm from './components/LoginForm';
import {StoreContext} from './index';
import {observer} from 'mobx-react-lite';
import {IUser} from './models/IUser';
import {UserService} from './services/UserService';

const App = () => {
    const {store} = React.useContext(StoreContext);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    if (store.isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!store.isAuth) {
        return (
            <>
                <LoginForm/>
                <div>
                    <button onClick={getUsers}>Get users</button>
                </div>
            </>
        );
    }

    return (
        <>
            <h1>{store.isAuth ? `User is authorized ${store.user.email}` : 'Authorize'}</h1>
            <h1>{store.user.isActivated ? 'Account is activated' : 'Verify your account'}</h1>
            <button onClick={() => store.logout()}>Logout</button>
            <div>
                <button onClick={getUsers}>Get users</button>
            </div>
            {
                users.map(user => (
                    <div key={user.id} style={{padding: 15, border: '1px solid gray'}}>
                        {user.email} - {user.id}
                    </div>
                ))
            }
        </>
    );
};

export default observer(App);
