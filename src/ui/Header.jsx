import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.5rem;
  border-bottom: 1px solid var(--color-grey-200);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
