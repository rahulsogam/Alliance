import React from 'react';
import { Route, Routes} from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import FormLayoutDemo from '../components/FormLayoutDemo';
import InputDemo from '../components/InputDemo';
import FloatLabelDemo from '../components/FloatLabelDemo';
import ButtonDemo from '../components/ButtonDemo';
import TableDemo from '../components/TableDemo';
import ListDemo from '../components/ListDemo';
import TreeDemo from '../components/TreeDemo';
import PanelDemo from '../components/PanelDemo';
import OverlayDemo from '../components/OverlayDemo';
import MediaDemo from '../components/MediaDemo';
import MenuDemo from '../components/MenuDemo';
import MessagesDemo from '../components/MessagesDemo';
import FileDemo from '../components/FileDemo';
import ChartDemo from '../components/ChartDemo';
import MiscDemo from '../components/MiscDemo';
import Documentation from '../components/Documentation';
import BlocksDemo from '../components/BlocksDemo';
import IconsDemo from '../utilities/IconsDemo';
import CrudDemo from '../pages/CrudDemo';
import Category from '../pages/Category';
import CalendarDemo from '../pages/CalendarDemo';
import Invoice from '../pages/Invoice';
import Help from '../pages/Help';
import EmptyPage from '../pages/EmptyPage';
import InvalidStateDemo from '../components/InvalidStateDemo';
import TimelineDemo from '../pages/TimelineDemo';
import Employee from '../pages/Employee';
import Customer from '../pages/Customer';
import Product from '../pages/Product';

const RoutesItems = ({colorScheme,location,logoUrl}) => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/formlayout" element={<FormLayoutDemo />} />
            <Route path="/employee" element={<Employee/>} />
            <Route path="/products" element={<Product/>} />
            <Route path="/customer" element={<Customer/>} />
            <Route path="/input" element={<InputDemo />} />
            <Route path="/floatlabel" element={<FloatLabelDemo />} />
            <Route path="/invalidstate" element={<InvalidStateDemo />} />
            <Route path="/button" element={<ButtonDemo />} />
            <Route path="/table" element={<TableDemo />} />
            <Route path="/list" element={<ListDemo />} />
            <Route path="/tree" element={<TreeDemo />} />
            <Route path="/panel" element={<PanelDemo />} />
            <Route path="/overlay" element={<OverlayDemo />} />
            <Route path="/media" element={<MediaDemo />} />
            <Route path="/menu/*" element={<MenuDemo />} />
            <Route path="/messages" element={<MessagesDemo />} />
            <Route path="/file" element={<FileDemo />} />
            <Route path="/chart" element={<ChartDemo colorMode={colorScheme} location={location} />} />
            <Route path="/misc" element={<MiscDemo />} />
            <Route path="/icons" element={<IconsDemo />} />
            <Route path="/crud" element={<CrudDemo />} />
            <Route path="/category" element={<Category/>} />
            <Route path="/blocks" element={<BlocksDemo />} />
            <Route path="/calendar" element={<CalendarDemo />} />
            <Route path="/timeline" element={<TimelineDemo />} />
            <Route path="/invoice" element={<Invoice logoUrl={logoUrl} location={location} />} />
            <Route path="/help" element={<Help />} />
            <Route path="/empty" element={<EmptyPage />} />
            <Route path="/documentation" element={<Documentation />} />
        </Routes>
    )
}

export default RoutesItems
