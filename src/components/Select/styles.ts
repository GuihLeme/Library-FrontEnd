import styled, { css } from 'styled-components';

interface SelectContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const SelectContainer = styled.div<SelectContainerProps>`
  height: 3rem;
  width: 20rem;

  display: flex;
  align-items: center;
  justify-content: left ;

  border-radius: 4px;
  background: #363636;

  padding: 1rem;

  ${props => props.isErrored && css`
    color: #e83f5b;
    border-color: #e83f5b;
  `}

  ${props => props.isFocused && css`
    color: var(--main);
    border: 2px solid var(--main);
  `}

  ${props => props.isFilled && css`
    color: var(--main);
  `}

  select {
    background: transparent;
    border: none;
    color: var(--text);
    margin-left: 1rem;
    width: 100%;
    font-size: 1rem;
  }
`

