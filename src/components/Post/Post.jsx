import { useEffect, useState } from 'react';
import './Post.scss';
import classNames from 'classnames';

const fileToDataUri = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {

      resolve(event.target?.result);
    };
    reader.readAsDataURL(file);
  });

export const Post = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dataUri, setDataUri] = useState('');
  const [position, setPosition] = useState('')
  const [isActive, setIsActive] = useState(false);
  const [token, setToken] = useState('');
  const[positions, setPositions] = useState([]);

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(res => res.json())
      .then(p => setPositions(p.positions))
  }, []);

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then(res => res.json())
      .then(t => setToken(t.token))
  }, []);

  const onPhotoChange = (file) => {
    if (!file) {
      setDataUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      setDataUri(dataUri)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: new Date(),
      email: email,
      name: name,
      phone: phone,
      photo: dataUri,
      position: positions.length + 1,
      position_id: new Date(),
      registration_timestamp: new Date(),
    };

    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      headers: {
        'Token': token,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newUser),
    })
  };

  useEffect(() => {
    setIsActive(email.length && phone.length && name.length);
  }, [email, phone, name]);

  return (
    <div className="post">
      <div className="container">
        <div className="post__body">
          <h1 className="post__title">Working with POST request</h1>
          <form className="post__form" onSubmit={(e) => {
            handleSubmit(e);
            setName('');
            setEmail('');
            setPhone('');
            setDataUri('');
          }}>
            <input
              type="text"
              className="post__input"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="post__input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              <input
                type="text"
                className="post__input"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="post__input--val">
                +38 (XXX) XXX - XX - XX
              </p>
            </label>
            <div className="post__input--pos">
              Select your position
              <div className="post__form--pos">
                <input type="radio" value="Frontend" id='frontend' onChange={(e) => setPosition(e.target.value)} />
                <label htmlFor="frontend">Frontend</label>
              </div>
              <div className="post__form--pos">
                <input type="radio" value="Backend" id='backend' onChange={(e) => setPosition(e.target.value)}/>
                <label htmlFor="backend">Backend</label>
              </div>
              <div className="post__form--pos">
                <input type="radio" value="Designer" id='designer' onChange={(e) => setPosition(e.target.value)} />
                <label htmlFor="designer">Designer</label>
              </div>
              <div className="post__form--pos">
                <input type="radio" value="QA" id='qa' onChange={(e) => setPosition(e.target.value)} />
                <label htmlFor="qa">QA</label>
              </div>
            </div>
            <label className="post__file">
              <input
                type="file"
                className="post__file--input"
                onChange={(event) => {
              if (!event.target.files) {
                return;
              }
              onPhotoChange(event.target.files[0])
                }}
                accept=".jpg, .jpeg"
              />
              <div className="post__file--bottom">
                <span className="post__file--bottom-left">Upload</span>
                <span className="post__file--bottom-right">Upload your photo</span>
              </div>
            </label>
            <button className={classNames('post__btn', {
              'post__btn--active': isActive 
            })}
            >Sign up</button>
          </form>

        </div>
      </div>
    </div>
  )
}