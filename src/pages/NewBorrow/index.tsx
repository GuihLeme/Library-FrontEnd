import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FiUser, FiBook } from 'react-icons/fi';

import { useToast } from '../../hooks/ToastContext'


import api from '../../services/api';

import Header from '../../components/Header';

import styles from '../../styles/pages/NewBorrow.module.css';
import Select from '../../components/Select';
import getValidationErrors from '../../utils/getValidationErrors';

interface BorrowFormData {
  user: string;
  book: string;
}

const NewBorrow:React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast()
  const history = useHistory();

  let date = new Date()
  date.setDate(date.getUTCDate() + 15)

  const day = date.getUTCDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getUTCFullYear()

  useEffect(() => {
    api.get('/users/index').then((response) => {
      setUsers(response.data)
    })

    api.get('/books/available/index').then((response) => {
      setBooks(response.data)
    })
  }, []);

  const handleSubmit = useCallback(async (data: BorrowFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        user: Yup.string().required('Usuário obrigatório'),
        book: Yup.string().required('Livro obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/borrows/create', data)

      addToast({
        type: 'success',
        title: 'Empréstimo criado com sucesso',
        description: `Devolver em ${day} de ${month} de ${year}🤓`
      });

      history.push('/');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Ocorreu um erro',
      });
    }
  }, [addToast, history, day, month, year]);

  return (
    <div>
      <Header />
      <div className={styles.animation}>
        <div className={styles.content}>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <h1 className={styles.title}>Novo empréstimo</h1>

            <div className={styles.selectContainer}>
              <div className={styles.select}>
                <Select name="user" icon={FiUser} defaultValue="" >
                  <option value="" key="" disabled>Selecione um usuário</option>
                  {users.map((user) => (
                    <option
                      className={styles.option}
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className={styles.select}>
              <Select name="book" icon={FiBook} defaultValue="">
                <option value="" key="" disabled>Selecione um livro</option>
                {books.map((book) => (
                  <option
                    className={styles.option}
                    key={book.id}
                    value={book.id}
                  >
                    {book.name}
                  </option>
                ))}
              </Select>
            </div>



            <button type="submit">Cadastrar usuário</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default NewBorrow;
