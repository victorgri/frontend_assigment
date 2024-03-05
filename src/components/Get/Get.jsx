import { useEffect, useState } from 'react';
import './Get.scss';

export const Get = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(1)

  useEffect(() => {
    fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${6 * count}`)
      .then(res => res.json())
      .catch(() => console.log('Oops, something went wrong!'))
      .then(data => setUsers(data.users))
  }, [count]);

  return (
    <div className="get">
      <div className="container">
        <div className="get__body">
          <h1 className="get__title">
            Working with GET request
          </h1>
          <div className="get__cards">
            {users.map(u => (
              <div className="get__card" key={u.id}>
                <img className="get__card--img" src={u.photo} alt="" />
                <h2 className="get__card--name">{u.name}</h2>
                <div className="get__card--bottom">
                  <p className="get__card--bottom-item">{u.email}</p>
                  <p className="get__card--bottom-item">{u.phone}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="get__btn"
            onClick={() => setCount(prev => prev + 1)}
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  )
}