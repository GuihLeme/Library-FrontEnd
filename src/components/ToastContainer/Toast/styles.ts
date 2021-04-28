import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info',
  hasDescription: number,
}

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  margin-top: 8px;
  background: #4d4c4c;


  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: start;

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
    flex:1;
    background: #4d4c4c;
    height: 92px;
    border-radius: 0 4px 4px 0;

    display: flex;
    align-items: center;
    justify-content: left;
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
`;
