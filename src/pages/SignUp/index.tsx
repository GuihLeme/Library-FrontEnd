import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from '../../components/Input';

import { Container } from '../../styles/pages/SignUp';
import { useToast } from '../../hooks/ToastContext';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useHistory } from 'react-router';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  pasword_confirmation: string;
}

const SignUp:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
        pasword_confirmation: Yup.string().required('Confirme sua senha')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/admin/', data)

      history.push('/')

      addToast({
        type: 'success',
        title: 'Login realizado com sucesso',
      });

    } catch(err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <div className='animation'>
        <div className='content'>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <h1>Cadastrar</h1>
            <div className='input'>
              <Input type="text" icon={FiUser} name="name" placeholder="Nome"/>
            </div>
            <div className='input'>
              <Input type="text" icon={FiMail} name="email" placeholder="E-mail"/>
            </div>
            <div className='input'>
              <Input type="password" icon={FiLock} name="password" placeholder="Senha"/>
            </div>
            <div className='input'>
              <Input type="password" icon={FiLock} name="pasword_confirmation" placeholder="Confirmar senha"/>
            </div>

            <button type="submit">Cadastrar</button>


          </Form>
        </div>
      </div>
    </Container>
  )
}

export default SignUp;
