// src/components/admin/AdminLayout.js
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./navbar/NavBar";

import { connect, disconnect } from "../../services/websocketService";
import NotificationManager from "../../services/NotificationManager";

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const AdminLayout = () => {
  useEffect(() => {
    connect(); // 웹소켓 연결

    return () => {
      disconnect(); // 컴포넌트 언마운트 시 웹소켓 연결 해제
    };
  }, []);

  return (
    <LayoutContainer>
      <NavBar />
      <ContentContainer>
        <NotificationManager /> {/* 알림 관리자 추가 */}
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default AdminLayout;
