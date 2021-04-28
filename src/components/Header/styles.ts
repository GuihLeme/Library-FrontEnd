import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 5rem;

  background-color: var(--component-background);

  .content {
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;

    display: flex;

    align-items: center;
    justify-content: space-between;

    padding: 0 2rem;
  }

  @media(max-width: 960px) {
    height: 8rem;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding : 1rem;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid var(--main);

    margin-right: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: row;

      align-items: center;
      justify-content: center;
      margin-top: .25rem;

      p {
        margin-left: .5rem;
      }
    }
  }

  @media(max-width: 960px) {
    div > div {
      display: none;
    }
  }

`

export const Actions = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }

  .user,
  .book,
  .new-borrow {
    cursor: pointer;
  }

  .user,
  .book {
    border-radius: 4px;
    border: none;
    color: var(--detail);
    background: #363636;
    padding: .25rem;
    width: 140px;


    display: flex;
    align-items: center;
    justify-content: space-around;

    position: relative;

    transition: background 200ms;

    span {
      margin-right: .5rem;
      background: #4d4c4c;
      padding: .25rem .25rem;
      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dropMenu {
      display: none;
    }

    &:hover {
      background: #4d4c4c;
      border-radius: 4px 4px 0 0;
      border-bottom: 1px solid var(--background);

      .dropMenu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        position: absolute;

        top: 37px;
        left: 0;

        background: #4d4c4c;
        border-radius: 0 0 4px 4px;
        width: 140px;
        padding: .25rem;

        box-shadow: 0px 8px 10px 0px rgba(0,0,0,0.25);

        z-index: 1;

        div {
          display: flex;
          align-items: center;
          justify-content: end;

          height: 34px;

          a {
            color: var(--detail)
          }

          & + div {
            border-top: 1px solid var(--background)
          }
        }
      }
    }
  }

  .new-borrow {
    border-radius: 4px;
    border: none;
    color: var(--detail);
    background: var(--main);
    padding: .25rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background 200ms;

    span {
      margin-right: .5rem;
      background: #7526d6;
      padding: .25rem .25rem;
      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      background: #7526d6;
    }
  }


  .book,
  .new-borrow {
    margin-left: 1rem;
  }

  @media(max-width: 960px) {
    margin-top: 1rem;

    .user,
    .book,
    .new-borrow {
      padding: .5rem;
    }


    .user span,
    .book span,
    .new-borrow span {
      display: none;
    }
  }


`
