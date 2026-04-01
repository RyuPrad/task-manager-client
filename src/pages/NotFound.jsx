import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-6xl font-bold'>404</h1> 
                <p className='text-xl mt-4 mb-6'>Page not found</p>
                <Link to='/' className='btn btn-primary'>Go Home</Link>
            </div>
        </div>
    );
}