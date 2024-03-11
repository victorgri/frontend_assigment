import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__top">
        <a href="/" className="header__logo">
          <img
            src="./Logo.svg"
            alt="logo"
            className="header__logo--img"
          />
        </a>
        <div className="header__top--buttons">
          <a href="#get" className="header__top--button">Users</a>
          <a href="#post" className="header__top--button header__top--button-2">Sign up</a>
        </div>

      </div>

      <div className="header__bottom">
        <div className="container">
          <div className="header__bottom--inner">
            <h1 className="header__bottom--title">Test assignment for front-end developer</h1>
            <p className="header__bottom--text">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they`ll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
            <a href="/" className="header__bottom--btn">Sign up</a>
          </div>
        </div>

      </div>

    </div>
  )
}