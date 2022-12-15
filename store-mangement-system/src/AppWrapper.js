import React, { useEffect } from 'react';
import { Route, Routes, useLocation ,Navigate} from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';
import { Access } from './pages/Access';
import { useSelector } from 'react-redux';

const AppWrapper = () => {
    let location = useLocation();
    const isLogin = useSelector((state) => state.login.access)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            {isLogin ?
                <Routes>
                    <Route path="*" element={<App />} />
                </Routes> :
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/access" element={<Access />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            }
        </div>
    );
};

export default AppWrapper;
