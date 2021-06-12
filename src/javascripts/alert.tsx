import * as React from "react";
import styled from "styled-components";

const AlertComponent = styled.div`
  background-color: green;
  color: #fff;
  padding: 1rem;
`;

const Alert: React.FC<{ message: string }> = ({ message }) => {
  return <AlertComponent>{message}</AlertComponent>;
};

export default Alert;
