import styled from "styled-components";

const ErrorMessageWrapper = styled.p`
  background-color: rgba(255, 0, 0, 0.644);
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  font-size: 1.4rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;

  i {
    font-size: 2rem;
    margin-right: 1rem;
  }
`;

const ErrorMessage: React.FC<{ msg: string }> = ({ msg }) => {
  return (
    <ErrorMessageWrapper>
      <i className="fas fa-times" />
      {msg}
    </ErrorMessageWrapper>
  );
};

export default ErrorMessage;
