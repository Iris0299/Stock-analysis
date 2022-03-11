import '../css/index.css'

const { useEffect, useState } = require('react')
const {postLogin} = require('./getdata')

const User = () => {
  const [posts, setPosts] = useState('')
  const [inputLogin, setInputLogin] = useState()
  const [inputInfo, setInputInfo] = useState({username:'', password: ''})

  const handleLogin = () => {
    setInputLogin(inputInfo)
    setInputInfo('')
  }
  useEffect(() => {
    postLogin('http://localhost:3456/api/users/login', inputLogin)
      .then(body => {
        const {token} = body.data
        setPosts(token)
        console.log(body)
      });
  }, [inputLogin])

  window.localStorage.setItem("token", posts);

  return (
    <div>
      <label htmlFor='username'>User name: </label>
      <input
        className='userName'
        type='text' 
        name='username' 
        id='username' 
        onChange={e => setInputInfo({...inputInfo, username:e.target.value})} 
        value={inputInfo.username}
      /> <br/>
      <label htmlFor='password'>Password: </label> 
      <input
        className='password'
        type='text' 
        password='password' 
        id='password' 
        onChange={e => setInputInfo({...inputInfo, password:e.target.value})} 
        value={inputInfo.password}
      /> <br/>
      {posts && alert('login sucessful')}
      <button 
        className='login'
        onClick={handleLogin}
      >
        Login
      </button> <br/>

      <a className='signup' href='/user'>Sign up ?</a> <br/>

      <button 
        className='getInfor' 
        onClick={() => {}}
      >Get infor</button>
    </div>
  )
}

export default User
