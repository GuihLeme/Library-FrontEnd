import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FiBook, FiHome, FiImage, FiUser } from 'react-icons/fi';

import { useToast } from '../../hooks/ToastContext'

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container } from './styles'
import Select from '../../components/Select';

interface BookFormData {
  book_id: string;
  name: string;
  author: string;
  publisher: string;
  cover: string;
}

interface selectedBookData {
  book_id: string;
  name: string;
  author: string;
  publisher: string;
  cover: string;
}

const UpdateBook:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<selectedBookData>();

  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    api.get('/books/index').then((response) => {
      setBooks(response.data)
    })
  }, [])

  const handleValueSelected = useCallback(() => {
    const selectedValue = formRef.current?.getFieldValue("book")

    console.log(selectedValue)

    api.get(`/books/${selectedValue}`).then((response) => {
      setSelectedBook(response.data)
    })
  }, [])

  const handleSubmit = useCallback(async (data: BookFormData) => {
    try {
      formRef.current?.setErrors({});
      const book_id = formRef.current?.getFieldValue("book")

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        author: Yup.string().required('Nome do(a) autor(a) obrigatório'),
        publisher: Yup.string().required('Editora obrigatório'),
        cover: Yup.string().required('Capa obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.put(`/books/${book_id}`, data)

    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors)
    }

    addToast({
      type: 'success',
      title: 'Livro atualizado com sucesso',
    });

    history.push('/');
  }, [addToast, history]);

  const handleDeleteSelectedBook = useCallback(() => {
    const book_id = formRef.current?.getFieldValue("book")
    console.log(book_id)
    api.delete(`/books/${book_id}/`)
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
                !!selectedBook ?
                {
                  name: selectedBook.name,
                  author: selectedBook.author,
                  publisher: selectedBook.publisher,
                  cover: selectedBook.cover,
                } : {}
              }
            >
              <h1 className="title">Atualizar livro</h1>

              <div className="select">
                <Select name="book" icon={FiBook} defaultValue="" onChange={handleValueSelected} >
                  <option value="" key="" disabled>Selecione um livro</option>
                  {books.map((book) => (
                    <option
                      className="option"
                      key={book.id}
                      value={book.id}
                    >
                      {book.name}
                    </option>
                  ))}
                </Select>
              </div>

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

              <div className="buttons">
                <button type="submit">Atualizar livro</button>
                {!!selectedBook ? (
                  <button className="delete" onClick={handleDeleteSelectedBook}>Deletar livro</button>
                ) : (<button className="delete"  >Deletar livro</button>)}
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default UpdateBook;
