import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// 👇 Styled React Route Dom Link Component
export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

// 👇 Styled Box Component for error messages
export const ErrorItem = styled.div`
    padding: 1rem;
    background-color: #f8d7da;
    border: 1px solid #f5c2c7;
    border-radius: 0.25rem;
    color: #721c24;
    margin-bottom: 1rem;

    &:hover {
      background-color: #f5c6cb;
      border-color: #f1b0b7;
      box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      }
    `;

