import React, {FC, useContext} from 'react';
import {StoreContext} from '../index';
import {observer} from 'mobx-react-lite';

const LoginForm: FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {store} = useContext(StoreContext);

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <input value={email} onChange={emailChangeHandler} type="email" placeholder="Email"/>
            <input value={password} onChange={passwordChangeHandler} type="password" placeholder="Password"/>
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.registration(email, password)}>Register</button>
        </div>
    );
};

export default observer(LoginForm);
