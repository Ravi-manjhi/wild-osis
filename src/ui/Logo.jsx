import styled from "styled-components";
import { useGlobalDarkContext } from "../contextApi/useGlobalContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDark } = useGlobalDarkContext();
  const imgUrl = isDark ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={imgUrl} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
