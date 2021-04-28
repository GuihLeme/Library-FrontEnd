import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLock, FiMail } from 'react-icons/fi';
// import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import { Container } from '../../styles/pages/Home';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

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
  }, [signIn, addToast]);

  return (
    <Container>
      <div className='animation'>
        <div className='content'>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <h1>Entrar</h1>
            <div className='input'>
              <Input type="text" icon={FiMail} name="email" placeholder="E-mail"/>
            </div>
            <div className='input'>
              <Input type="password" icon={FiLock} name="password" placeholder="Senha"/>
            </div>

            <button type="submit">Entrar</button>
            <div className="register">
              <p>
                Não possui uma conta ainda?
                <a href="/SignUp">Criar conta </a>
              </p>
            </div>

          </Form>
        </div>
      </div>
    </Container>
  )
}

export default SignIn;
