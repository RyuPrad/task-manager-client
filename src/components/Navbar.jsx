import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabase';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Task Manager</a>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={user.user_metadata?.avatar_url} alt="avatar" referrerPolicy='no-referrer'/>
              </div>
            </div>
            <span className="text-sm">{user.user_metadata?.full_name}</span>
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}