import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/auth/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CheckLogin({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/");
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated) return children;
}
