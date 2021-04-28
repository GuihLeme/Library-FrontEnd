import styled, { css } from 'styled-components';

interface ToastProps {
  type?: 'success' | 'error';
  hasDescription?: boolean;
}

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 40px;
  overflow: hidden;
`

export const Toast = styled.div<ToastProps>`
  width: 360px;
  margin-top: 8px;


  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .iconContainer {
    width: 60px;
    height: 92px;
    border-radius: 4px 0 0 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(232, 63, 91, 0.7);

    ${props => props.type === 'success' && css`
      background: rgba(76, 214, 43, 0.7);
    `}
  }

  .messageWrapper {
    background: #4d4c4c;
    height: 92px;
    border-radius: 0 4px 4px 0;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;

    position: relative;

    p {
      margin-top: 8px;
    }

    button {
      border: none;
      background: transparent;
      color: rgba(232, 63, 91, 0.7);

      ${props => props.type === 'success' && css`
        color: rgba(76, 214, 43, 0.7);
      `}

      position: absolute;
      top: 15px;
      right: 8px;
    }
  }
`

