import React from 'react';
import { Route, Routes} from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Category from '../pages/Category';
import Employee from '../pages/Employee';
import Customer from '../pages/Customer';
import Product from '../pages/Product';
import Order from '../pages/Order';

const RoutesItems = ({colorScheme,location,logoUrl}) => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee" element={<Employee/>} />
            <Route path="/products" element={<Product/>} />
            <Route path="/category" element={<Category/>} />
            <Route path="/customer" element={<Customer/>} />
            <Route path="/order" element={<Order/>} />
        </Routes>
    )
}

export default RoutesItems
