import styled from 'styled-components';

export const Container = styled.div`
  width: auto;
  height: 100vh;

  background: url('Bibliophile-bro.svg') no-repeat right;
  background-size: 50%;

  display: flex;
  align-items: center;
  justify-content: center;



  .content {
    width: fit-content;
    margin: 0 auto;
    background: var(--component-background);

    display: flex;
    flex-direction: column;

    padding: 2rem;

    border-radius: 4px;

    h1 {
      margin-bottom: 1rem;
    }

    .input + .input {
      margin-top: 1rem;
    }

    button {
      border-radius: 4px;
      border: none;
      color: var(--detail);
      background: var(--main);

      height: 2.5rem;
      width: 5rem;
      padding: .5rem;

      margin-top: 1rem;

      font-weight: bold;

      cursor: pointer;

      transition: background 200ms;

      &:hover {
        background: var(--main-op);
      }
    }

    .register {
      padding-top: 1rem;

      a {
        margin-left: .5rem;
        text-decoration: none;
        color: var(--main)
      }
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











//

// .title {
//   margin-bottom: 2rem;
// }

// .input {
//   margin-top: 1rem;
// }

// .content button {
//   border-radius: 4px;
//   border: none;
//   color: var(--detail);
//   background: var(--main);

//   height: 2.5rem;
//   padding: .5rem;

//   margin-top: 1rem;

//   font-weight: bold;

//   cursor: pointer;

//   transition: background 200ms;
// }

// .content button:hover {
//   background: var(--main-op);
// }

// @keyframes appearFromLeft {
//   from {
//     opacity: 0;
//     transform: translateX(-50px);
//   } to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

// .animation {
//   animation: appearFromLeft 1.5s;
// }
