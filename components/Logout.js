import { useContext } from 'react';
import { UserContext } from '../context/user';

function Logout() {
  const { doLogout } = useContext(UserContext);

  return <button onClick={() => doLogout()}>Logout</button>;
}

export default Logout;
