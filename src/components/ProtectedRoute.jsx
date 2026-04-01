import { Navigate } from 'react-router-dom';

export default function protectedRoute({ user, loading, children }) {
    if (loading) {
        return(
            <div className='min-h-screen flex items-center justify-center'>
                <span className='loading loading-spinner loading-lg'></span>
            </div>
        );
    }
    
    if (!user) {
        return < Navigate to='/login' replace />; 
    }

    return children;
}