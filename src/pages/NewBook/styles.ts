import styled from 'styled-components';

export const Container = styled.div`
  .content {
    height: auto;
    width: fit-content;
    margin: 0 auto;
    background: var(--component-background);

    display: flex;
    flex-direction: column;

    padding: 2rem;
    margin-top: 3rem;

    border-radius: 4px;
  }

  h1 {
    margin-bottom: 2rem;
  }

  .input {
    margin-top: 1rem;
  }

  button {
    border-radius: 4px;
    border: none;
    color: var(--detail);
    background: var(--main);

    height: 2.5rem;
    padding: .5rem;

    margin-top: 1rem;

    font-weight: bold;

    cursor: pointer;

    transition: background 200ms;

    &:hover {
      background: var(--main-op);
    }
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

`


