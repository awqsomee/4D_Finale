import React, { useEffect, useState } from 'react'
// import History from '../history/History'
import Balance from '../balance/Balance'
import Convert from '../convert/Convert'
import axios from 'axios'
import History from '../history/History'
import './walletList.css'
const serverAddress = 'https://afternoon-gorge-59782.herokuapp.com'

// const serverAddress = 'http://localhost:5000'

const WalletList = (props) => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = async () => {
    try {
      const responce = await axios.get(`${serverAddress}/transactions`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
      })
      responce.data.transactions.reverse()
      setTransactions(responce.data.transactions)
      console.log(transactions)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="stockList">
      <div className="title">{props.title1}</div>
      <div className="list">
        <Balance btnText="Пополнить (₽)" type={'Deposit'} />
        <Balance btnText="Снять (₽)" type={'Withdraw'} />
        <Convert btnText="Обменять" type={'Convert'} />
      </div>
      <div className="title">{props.title2}</div>
      <div className="flow_list">
        {transactions.map((history) => (
          <History history={history} key={history['_id']} />
        ))}
      </div>
      {/* </div> */}
    </div>
  )
}

export default WalletList
