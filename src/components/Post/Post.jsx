import { useState } from 'react';
import './Post.scss';

export const Post = () => {
  const [id, setId] = '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dataUri, setDataUri] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      photo: dataUri,
    };

    fetch("https://wish-factory.onrender.com/api/dream/dreams/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newUser),
    });

    setId('');
    setName('');
    setEmail('');
    setPhone('');
    setDataUri('');
  };
  return (
    <div className="post">
      <div className="container">
        <div className="post__body">
          <h1 className="post__title">Working with POST request</h1>
          <form className="post__form" onSubmit={handleSubmit}>
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

            <label className="post__select">
              Select your position
              <input type="select" />
              <option className="post__select">Frontend developer</option>
              <option className="post__select">Backend developer</option>
              <option className="post__select">Designer</option>
              <option className="post__select">QA</option>
            </label>
            <label className="post__file">
              <input type="file" className="post__file--input" />
              <div className="post__file--bottom">
                <span className="post__file--bottom-left">Upload</span>
                <span className="post__file--bottom-right">Upload your photo</span>
              </div>
            </label>
            <button className="post__btn">Sign up</button>
          </form>

        </div>
      </div>
    </div>
  )
}