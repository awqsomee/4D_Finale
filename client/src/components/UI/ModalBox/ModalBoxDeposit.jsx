import React, { useState } from 'react'
import cl from './ModalBox.module.css'



const ModalBoxDeposit = ({ children, visible, setVisible }) => {
    const rootClasses = [cl.modalBox]
    if (visible) {
      rootClasses.push(cl.active)
    }
  
    return (
      <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
        <div className={cl.setmodalBoxDeposit} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    )
  }
export default ModalBoxDeposit