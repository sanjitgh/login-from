
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const Main = () => {
    return (
        <div className='container mx-auto px-3'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;