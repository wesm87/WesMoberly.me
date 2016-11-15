/**
 * The current logged-in user.
 */

import UserType from 'data/types/UserType';


interface User {
  id: string;
  email: string;
}


const me = {
  type: UserType,
  resolve({ request }) {
    const { user } = request;

    if (!user) {
      return null;
    }

    const { id, email } = user;

    return <User> { id, email };
  },
};

export default me;
