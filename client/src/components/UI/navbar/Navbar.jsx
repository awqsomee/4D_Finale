import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import Logo from '../../../assets/Icons/logo.svg'
import поиск from '../../../assets/Icons/поиск.svg'
import ModalBox from '../ModalBox/ModalBox'
import ModalBoxAcc from '../ModalBox/ModalBoxAcc'
import Registration from '../../authentification/registration/Registration.jsx'
import Login from '../../authentification/login/Login'
import SearchHeader from '../search/SearchHeader.jsx'
import '../buttons/buttons.css'
import { logout } from '../../../reducers/userReducer'
import UserProfile from '../../../assets/Icons/user.svg'
import Wallet from '../../../assets/Icons/wallet.svg'
import Portfolio from '../../../assets/Icons/portfolio.svg'
import { store } from '../../../reducers'
import { setUser } from '../../../reducers/userReducer'
// import '../../balance/balance.css'

const Navbar = (props) => {
  const user = store.getState(setUser).user.currentUser
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()
  const [modalBoxReg, setModalBoxReg] = useState(false)
  const [modalBoxLog, setModalBoxLog] = useState(false)
  const [modalBoxAcc, setModalBoxAcc] = useState(false)

  return (
    <div className="navbar">
      <ModalBox visible={modalBoxLog} setVisible={setModalBoxLog}>
        <Login sVisible={setModalBoxLog} />
      </ModalBox>
      <ModalBox visible={modalBoxReg} setVisible={setModalBoxReg}>
        <Registration sVisible={setModalBoxReg} />
      </ModalBox>

      {isAuth && (
        <ModalBoxAcc visible={modalBoxAcc} setVisible={setModalBoxAcc}>
          <div className="acc_pop_up">
            <NavLink to="/wallet" className="acc_pop_up acc_pop_up__b" onClick={() => setModalBoxAcc(false)}>
              <div className="acc_pop_up acc_pop_up__b">{`${new Intl.NumberFormat('ru-RU').format(
                store.getState(setUser).user.currentUser.balanceUSD
              )} $`}</div>
            </NavLink>
          </div>

          <div className="acc_pop_up">
            <NavLink to="/account" className="acc_in" onClick={() => setModalBoxAcc(false)}>
              <div>Аккаунт</div>
            </NavLink>
          </div>
          <div
            className="acc_pop_up"
            onClick={() => {
              dispatch(logout())
              setModalBoxAcc(false)
            }}
          >
            Выйти
          </div>
        </ModalBoxAcc>
      )}
      <div className="container">
        <div className="navbar__logo">
          <NavLink to="/news">
            <img src={Logo} alt="logo_img" width={150} />
          </NavLink>
        </div>

        <div className="navbar__search">
          <div className="searchWrapper">
            <div className="search_img">
              {' '}
              <img src={поиск} width={50} />{' '}
            </div>

            <SearchHeader
              className="searchStroke"
              value={props.search}
              type="text"
              placeholder="Поиск..."
            ></SearchHeader>
          </div>
        </div>

        {!isAuth && (
          <div className=" button button__normal " onClick={() => setModalBoxLog(true)}>
            Войти
          </div>
        )}
        {!isAuth && (
          <div className=" button button__normal navbar__registration" onClick={() => setModalBoxReg(true)}>
            Регистрация
          </div>
        )}
        {isAuth && (
          <div className="navbar__wallet">
            <NavLink to="/wallet">
              <img src={Wallet} alt="Кошелек" width={45} />
            </NavLink>
          </div>
        )}
        {/* {isAuth && (
          <div className="navbar__portfolio">
            <NavLink to="/currency">
              <img src={Portfolio} alt="Валюта" width={45} />
            </NavLink>
          </div>
        )} */}
        {isAuth && (
          <div className="navbar__account" onClick={() => setModalBoxAcc(true)}>
            <img src={UserProfile} alt="Аккаунт" width={70} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
