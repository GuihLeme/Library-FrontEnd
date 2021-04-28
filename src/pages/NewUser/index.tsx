import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FiMail, FiUser } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import { useToast } from '../../hooks/ToastContext'


import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import Input from '../../components/Input';

import styles from '../../styles/pages/NewUser.module.css';

interface UserFormData {
  name: string;
  email: string;
  phone: string;
}

const NewUser:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast()
  const history = useHistory();

  const handleSubmit = useCallback(async (data: UserFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
        phone: Yup.string ().required('Telefone obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/users/create', data)

      addToast({
        type: 'success',
        title: 'Novo usuário cadastrado com sucesso',
        description: 'O usuário já pode emprestar livros'
      });

      history.push('/dashboard');

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
  }, [addToast, history]);


  return (
    <div>
      <Header />
      <div className={styles.animation}>
        <div className={styles.content}>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <h1 className={styles.title}>Novo usuário</h1>

            <div className={styles.input} >
              <Input name="name" icon={FiUser} placeholder="Nome" />
            </div>
            <div className={styles.input} >
              <Input name="email" icon={FiMail} placeholder="E-mail" />
            </div>
            <div className={styles.input}>
              <Input name="phone" icon={FaWhatsapp} mask='phone' placeholder="WhatsApp" />
            </div>

            <button type="submit">Cadastrar usuário</button>

          </Form>
        </div>
      </div>

    </div>
  )
}

export default NewUser;
