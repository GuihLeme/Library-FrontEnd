import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiMail, FiUser } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container } from './styles'
import Select from '../../components/Select';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/ToastContext';

interface UserFormData {
  user_id: string;
  name: string;
  email: string;
  phone: string;
}

interface selectedUserData {
  name: string;
  email: string;
  phone: string;
}

const UpdateUser:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<selectedUserData>();

  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    api.get('/users/index').then((response) => {
      setUsers(response.data)
    })
  }, [])

  const handleValueSelected = useCallback(() => {
    const selectedValue = formRef.current?.getFieldValue("user")

    api.get(`/users/${selectedValue}`).then((response) => {
      setSelectedUser(response.data)
    })
  }, [])

  const handleSubmit = useCallback(async (data: UserFormData) => {
    try {
      formRef.current?.setErrors({});
      const user_id = formRef.current?.getFieldValue("user")

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
        phone: Yup.string ().required('Telefone obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.put(`/users/${user_id}`, data)

      addToast({
        type: 'success',
        title: 'Usuário atualizado com sucesso',
      });

      history.push('/');
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors)
    }
  }, [addToast, history]);

  const handleDeleteSelectedUser = useCallback(() => {
    const user_id = formRef.current?.getFieldValue("user")
    console.log(user_id)
    api.delete(`/users/${user_id}/delete`)
  },[])


  return (
    <div>
      <Header />

      <Container>
        <div className="animation">
          <div className="content">
            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={
                !!selectedUser ?
                {
                  name: selectedUser.name,
                  email: selectedUser.email,
                  phone: selectedUser.phone,
                } : {}
              }
            >
              <h1 className="title">Atualizar usuário</h1>

              <div className="select">
                <Select name="user" icon={FiUser} defaultValue="" onChange={handleValueSelected} >
                  <option value="" key="" disabled>Selecione um usuário</option>
                  {users.map((user) => (
                    <option
                      className="option"
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="input">
                <Input name="name" icon={FiUser} placeholder="Nome"/>
              </div>
              <div className="input">
                <Input name="email" icon={FiMail} placeholder="E-mail" />
              </div>
              <div className="input">
                <Input name="phone" mask="phone" icon={FaWhatsapp} placeholder="WhatsApp" />
              </div>

              <div className="buttons">
                <button type="submit">Atualizar usuário</button>
                {!!selectedUser ? (
                  <button className="delete" onClick={handleDeleteSelectedUser}>Deletar usuário</button>
                ) : (<button className="delete"  >Deletar usuário</button>)}
              </div>


            </Form>
          </div>
        </div>
      </Container>


    </div>
  )
}

export default UpdateUser;
