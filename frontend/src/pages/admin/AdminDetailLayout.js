import React from "react";
import styled from "styled-components";

const DetailPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AdminDetailLayout = ({ children }) => {
  return <DetailPageContainer>{children}</DetailPageContainer>;
};

export default AdminDetailLayout;
