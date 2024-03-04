import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Get } from "./components/Get";
import { Post } from "./components/Post";

import './styles/main.scss';



export const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(' https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
      .then(res => res.json())
      .catch(() => console.log('Oops, something went wrong!'))
      .then(data => setUsers(data.users))
  }, []);

  return (
    <div className="app">
      <Header />
      <Get users={users} />
      <Post />
    </div>
  )
}
