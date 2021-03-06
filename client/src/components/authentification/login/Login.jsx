import React from 'react'
import { useState } from 'react'
import './login.css'
import Input from '../../UI/input/Input'
import { login } from '../../../actions/user'
import { useDispatch } from 'react-redux'
import { store } from '../../../reducers'
import { setUser } from '../../../reducers/userReducer'
import ModalBoxDeposit from '../../UI/ModalBox/ModalBoxDeposit'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  return (
    <div className="login">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit}>
        <div className="deposit_pop_up">
          <div>Вход не выполнен. Проверьте правильность заполнения полей</div>
        </div>
      </ModalBoxDeposit>

      <div className="login__header">Вход</div>
      <div className="login"></div>
      <div className="login__input_name">Электронная почта</div>
      <div className="login__input">
        <Input className="auth" value={username} setValue={setUsername} type="text" placeholder="Username" />{' '}
      </div>
      <div className="login__input_name">Пароль</div>
      <div className="login__input">
        <Input className="auth" value={password} setValue={setpassword} type="password" placeholder="********" />{' '}
      </div>
      <button
        className="button button__normal login__button"
        onClick={async () => {
          await dispatch(login(username, password))
          console.log(store.getState(setUser).user.isAuth)
          if (store.getState(setUser).user.isAuth) {
            props.sVisible(false)
          } else setmodalBoxDeposit(true)
        }}
      >
        Войти
      </button>
    </div>
  )
}

export default Login
