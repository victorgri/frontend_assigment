import { useEffect, useState } from 'react';
import './Post.scss';
import classNames from 'classnames';

export const Post = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+380');
  const [dataUri, setDataUri] = useState('');
  const [position, setPosition] = useState(0)
  const [isActive, setIsActive] = useState(false);
  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);



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

  const onPhotoChange = (e) => {
   setDataUri(e.target.files[0])

  };



  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', position);
    formData.append('photo', dataUri);

    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      headers: {
        'Token': token,
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.success) {
          // Handle successful response
          console.log('User registered successfully:', data);
          setName('');
          setEmail('');
          setPhone('+380');
          setDataUri('');
          setPosition('');
        } else {
          // Handle server errors
          console.error('Server error:', data.message);
        }
      })
      .catch(error => {
        // Handle network errors
        console.error('Network error:', error);
      });
  };

  console.log(name, email, phone, position);

  useEffect(() => {
    setIsActive(email.length && phone.length && name.length);
  }, [email, phone, name]);

  const reset = () => {
    setName('');
    setEmail('');
    setPhone('+380');
    setPosition('');
    setDataUri('');
  }

  return (
    <div className="post" id="post">
      <div className="container">
        <div className="post__body">
          <h1 className="post__title">Working with POST request</h1>
          <form
            id="formElem"
            className="post__form"
            onSubmit={(e) => {
              handleSubmit(e);
              reset();
            }}>
            
            <input
              type="text"
              className="post__input"
              placeholder="Your name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              min={2}
              max={60}
              required
            />

              <input
                type="email"
                name="email"
                className="post__input"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
              />


            <label>
              <input
                type="phone"
                className="post__input"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
              <p className="post__input--val">
                +38 (XXX) XXX - XX - XX
              </p>
            </label>
            <div className="post__input--pos">
              Select your position
              {positions.map(p => (
                <div className="post__form--pos" key={p.id}>
                  <label>
                  <input
                    type="radio"
                    name="position_id"
                    value={p.id}
                    onChange={(e) => { setPosition(e.target.value) }}
                  />
                    {p.name}
                  </label>
                </div>
              ))}
            </div>
            <label className="post__file">
              <input
                type="file"
                className="post__file--input"
                onChange={onPhotoChange}
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