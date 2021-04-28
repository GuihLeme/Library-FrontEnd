import styled from 'styled-components';

export const Container = styled.div`
  .content {
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: space-between;

    padding: 0 2rem;
  }

  @keyframes appearFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    } to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animation {
    animation: appearFromLeft 1.5s;
  }

  @media(max-width: 940px) {
    max-width: 900px;
    margin: 0 auto;
  }
`

export const BorrowBar = styled.div`
  height: 4rem;
  width: 100%;
  background: #4d4c4c;

  padding: .5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 4px;

  margin-top: 1rem;

  .book {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    margin-right: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    width: 19.5rem;

    img {
      height: 3rem;
      width: 1.9rem;
      margin-right: 1rem;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-self: center;
    }
  }

  .borrowTo,
  .borrowAt,
  .returnAt,
  .renew,
  .returned {
    border-left: 1px solid var(--background);
    padding-left: 1rem;
    height: 2.5rem;
  }

  .borrowTo,
  .borrowAt,
  .returnAt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-self: center;

    width: 10rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .borrowAt,
  .returnAt {
    width: 8.7rem;
  }

  .renew button {
    padding: .5rem;
    width: 5rem;
    border-radius: 4px;
    border: none;

    color: var(--text);

    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--main);

    span {
      display: none;
    }

    &:hover {
      background: var(--main-op);
      cursor: pointer;
    }
  }

  .returned {
    button {
      padding: .5rem;
      width: 6rem;
      border-radius: 4px;
      border: none;

      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(76, 214, 43, 0.7);
      color: var(--text);

      &:hover {
        background: rgba(76, 214, 43, 0.5);
        cursor: pointer;
      }
    }
  }

  @media(max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .book {
      max-width: 13rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .borrowTo,
    .borrowAt,
    .returnAt {
      padding-left: 1rem;

      border-left: 1px solid var(--background);
      height: 2.5rem;
    }

    .renew {
      margin-left: 1rem;
      border-left: 1px solid var(--background);
      height: 2.5rem;

      div {
        max-width: 3.75rem;
        font-size: 20px;

        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .renew div strong {
      display: none;
    }

    .renew div span {
      display: block;
    }
  }

  @media(max-width: 840px) {
    .borrowAt {
      display: none;
    }
  }

`


