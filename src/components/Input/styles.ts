import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface InputContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  height: 3rem;
  width: 20rem;

  display: flex;
  align-items: center;
  justify-content: left ;

  border-radius: 4px;
  background: #363636;

  padding: 1rem;

  ${props => props.isErrored && css`
    border: 2px solid #e83f5b;
    color: #e83f5b;
  `}

  ${props => props.isFocused && css`
    color: var(--main);
    border: 2px solid var(--main);
  `}

  ${props => props.isFilled && css`
    color: var(--main);
  `}

  input {
    background: transparent;
    border: none;
    color: var(--text);
    margin-left: 1rem;
    width: 100%;
  }
`

export const Error = styled(Tooltip)`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    background: #e83f5b;

    &::before {
      border-color: transparent #e83f5b ;
    }
  }
`




