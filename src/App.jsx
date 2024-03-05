import { Header } from "./components/Header/Header";
import { Get } from "./components/Get";
import { Post } from "./components/Post";

import './styles/main.scss';



export const App = () => {
  return (
    <div className="app">
      <Header />
      <Get/>
      <Post />
    </div>
  )
}
