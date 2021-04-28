import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiCalendar, FiAlertCircle, FiUser } from 'react-icons/fi';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import { Container, Profile, Actions } from './styles';


const Header: React.FC = () => {
  const [booksShouldBeReturnedThisWeek, setBooksShouldBeReturnedThisWeek] = useState<string>('')

  useEffect(() => {
    api.get('/borrows/return_this_week').then((response) => {
      setBooksShouldBeReturnedThisWeek(response.data)
    })
  }, [])

  const { user } = useAuth();

  return (
    <Container>
      <div className="content">
        <Profile>
          <Link to="/">
            <img src="https://pbs.twimg.com/profile_images/1325159183914848256/oGSYMoxJ_400x400.jpg" alt="avatar"/>
          </Link>

          <div>
            <strong>Olá, {user.name}</strong>
            { Number(booksShouldBeReturnedThisWeek) === 1 && (
              <div>
                <FiAlertCircle size={16} color={'var(--main)'}/>
                <p>{booksShouldBeReturnedThisWeek} livro deve ser devolvido essa semana</p>
              </div>
            )}

            { Number(booksShouldBeReturnedThisWeek) > 1 && (
              <div>
                <FiAlertCircle size={16} color={'var(--main)'}/>
                <p>{booksShouldBeReturnedThisWeek} livros devem ser devolvidos essa semana</p>
              </div>
            )}
          </div>
        </Profile>

        <Actions>
            <div className="user">
              <span>
                <FiUser size={20} />
              </span>
              <p>Usuários</p>
              <div className="dropMenu">
                <div>
                  <Link to="/new-user">Novo usuário</Link>
                </div>
                <div>
                  <Link to="/update-user">Atualizar usuário</Link>
                </div>
              </div>
            </div>
            <div className="book">
              <span>
                <FiBook size={20} />
              </span>
              <p>Livros</p>
              <div className="dropMenu">
                <div>
                  <Link to="/new-book">
                    Novo livro
                  </Link>
                </div>
                <div>
                  <Link to="/update-book">Atualizar livro</Link>
                </div>
              </div>
            </div>
              <Link to='/new-borrow'>
                <div className="new-borrow">
                    <span>
                      <FiCalendar size={20} />
                    </span>
                      Novo empréstimo
                </div>
              </Link>
        </Actions>
      </div>

    </Container>
  )
}

export default Header;
