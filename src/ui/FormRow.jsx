import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;
  

  
  
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    }
    ${(props) =>
      props.type === "four" &&
      css`
        grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--color-grey-100);
          padding-bottom: 0;
          padding-top: 0
      `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, type }) {
  return (
    <StyledFormRow type = {type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
