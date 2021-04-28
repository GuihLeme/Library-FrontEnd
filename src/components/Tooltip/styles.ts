import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 11rem;
    background: var(--main);
    color: var(--detail);
    padding: .5rem;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;

    opacity: 0;
    visibility: hidden;
    transition: 400ms;

    position: absolute;
    left: 220%;

    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      border-style: solid;
      border-color: transparent var(--main) ;
      border-width: 6px 6px 6px 0;
      top: 50%;
      position: absolute;
      left: -3%;
      transform: translateY(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }




`
