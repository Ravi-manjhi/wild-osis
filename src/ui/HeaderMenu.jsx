import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiMoon, HiOutlineUser, HiSun } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGlobalDarkContext } from "../contextApi/useGlobalContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const { isDark, toddleDarkMode } = useGlobalDarkContext();
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon title="Account" onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon title="Dark Mode" onClick={toddleDarkMode}>
          {isDark ? <HiMoon /> : <HiSun />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
