import React, { useCallback, useEffect, useState } from 'react';
import { FiRepeat } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/ToastContext';

import Header from '../../components/Header'

import api from '../../services/api';

import { Container, BorrowBar } from './styles';

const Dashboard:React.FC = () => {
  const [borrows, setBorrows] = useState<any[]>([]);

  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    api.get('/borrows/index').then((response) => {
      setBorrows( response.data)
    })
  }, []);

  const handleRenewBorrow = useCallback((borrow_id: string) => {
    api.post(`/borrows/${borrow_id}/renew`)

    addToast({
      type: 'success',
      title: 'Empréstimo renovado com sucesso',
      });

    history.push('/')
  },[addToast, history])

  const handleReturnedBorrow = useCallback((borrow_id: string) => {
    api.post(`/borrows/${borrow_id}/returned`)

    addToast({
      type: 'success',
      title: 'Livro devolvido 👍',
      });

    history.push('/')
  },[addToast, history])

  return (
    <div>
      <Header />

      <Container>
        <div className="animation">
          <main className="content">

          {borrows.map((borrow) => {
            const returnAtDay = new Date(borrow.return_at).getUTCDate();
            const returnAtMonth = new Date(borrow.return_at).getUTCMonth();
            const returnAtYear = new Date(borrow.return_at).getUTCFullYear();

            const parsedReturnAt = new Date(returnAtYear, returnAtMonth, returnAtDay).toLocaleDateString('pt-BR')

            const borrowAtDay = new Date(borrow.borrow_at).getUTCDate();
            const borrowAtMonth = new Date(borrow.borrow_at).getUTCMonth();
            const borrowAtYear = new Date(borrow.borrow_at).getUTCFullYear();

            const parsedBorrowAt = new Date(borrowAtYear, borrowAtMonth, borrowAtDay).toLocaleDateString('pt-BR')

            return (
              <BorrowBar key={borrow.id}>
                <div className="book">
                  <img src={borrow.book.cover} alt="Harry Potter e a pedra filosofal"/>
                  <div>
                    <strong>{borrow.book.name}</strong>
                    <strong>{borrow.book.author}</strong>
                  </div>
                </div>
                <div className="borrowTo">
                  <p>Emprestado para:</p>
                  <strong>{borrow.user.name}</strong>
                </div>
                <div className="borrowAt">
                  <p>Emprestado em:</p>
                  <strong>{parsedBorrowAt}</strong>
                </div>
                <div className="returnAt">
                  <p>Devolver em:</p>
                  <strong>{parsedReturnAt}</strong>
                </div>
                <div className="renew">
                  <button onClick={() => handleRenewBorrow(borrow.id)} >
                    <strong>Renovar</strong>
                    <span><FiRepeat size={20} /></span>
                  </button>
                </div>
                <div className="returned">
                  <button onClick={() => handleReturnedBorrow(borrow.id)}>
                    <strong>
                      Devolvido
                    </strong>
                  </button>
                </div>

              </BorrowBar>
            )
          }
          )}

          </main>
        </div>
      </Container>

    </div>
  )
}

export default Dashboard;
