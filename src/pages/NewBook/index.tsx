import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FiBook, FiHome, FiImage, FiUser } from 'react-icons/fi';

import { useToast } from '../../hooks/ToastContext'

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface BookFormData {
  name: string;
  author: string;
  publisher: string;
  cover: string;
}

const NewBook:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast()
  const history = useHistory();


  const handleSubmit = useCallback(async (data: BookFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        author: Yup.string().required('Nome do(a) autor(a) obrigatório'),
        publisher: Yup.string().required('Editora obrigatório'),
        cover: Yup.string().required('Capa obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/books/create', data)

      addToast({
        type: 'success',
        title: 'Novo livro cadastrado com sucessos',
        description: 'Seu novo livro já pode ser usado'
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
    <>
      <Header />

      <Container>
        <div className="animation">
          <div className="content">
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <h1>Novo livro</h1>

              <div className="input" >
                <Input type="text" icon={FiBook} name="name" placeholder="Título"/>
              </div>
              <div className="input" >
                <Input type="text" icon={FiUser} name="author" placeholder="Autor"/>
              </div>
              <div className="input">
                <Input type="text" icon={FiHome} name="publisher" placeholder="Editora"/>
              </div>
              <div className="input">
                <Input type="link" icon={FiImage} name="cover" placeholder="Capa"/>
              </div>

              <button type="submit">Cadastrar livro</button>

            </Form>
          </div>
        </div>

      </Container>
    </>
  )
}

export default NewBook;
