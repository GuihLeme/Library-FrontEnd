import React, { useEffect } from 'react';
import {
  FiAlertCircle, FiCheckCircle, FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/ToastContext';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} hasDescription={Number(!!message.description)}>
      <div className="iconContainer">
      {icons[message.type || 'error']}
      </div>

      <div className="messageWrapper">
        <div>
          <strong>{message.title}</strong>
          {message.description && <p>{message.description}</p>}
        </div>

        <button onClick={() => {}} type="button">
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>

  );
};

export default Toast;
