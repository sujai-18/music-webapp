import styled from 'styled-components';

export const MusicCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
`;

export const SiderContainer = styled.div`
  background: #252526;
  .ant-menu {
  background: #252526;
  }
  .ant-menu-title-content {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const HeaderContainer = styled.div`
  background: #2c2c2c;
  .ant-layout-header, .ant-menu {
  background: #2c2c2c;
  }
`;

export const ContentContainer = styled.div`
  .ant-layout-content {
    background: #21201f !important;
    border-radius: 0 !important;
  }
  .ant-card {
    height: 290px;
    background: #1f1f1f !important;
    font-family: Roboto;
    border: 1px solid transparent;
    &:hover {
        box-shadow: 0 1px 5px #ffffff;
    }
    .ant-card-meta {
        margin: 0;
    }
    .ant-card-meta-title {
        font-size: 12px;
        color: #ffffff;
    }
  }
  .ant-card-cover {
    height: 230px;
    overflow: hidden;
  }
  .ant-card-body {
    padding: 5px 10px;
    font-size: 10px;
    color: #ffffff;
    &:hover {
        text-decoration: underline;
    }
  }
`;

export const MusicListContainer = styled.div`
    a {
        color: #d5c8c8 !important;
    }
  .ant-table-header .ant-table-cell {
    background-color: #1f1f1f; 
    color: #fef8f8;
    &::before {
        background: #ffffff !important;
        height: 0.6em !important;
    }
  }
  .ant-table-row:nth-child(odd) .ant-table-cell {
    background-color: #232323; 
  }
  .ant-table-row:nth-child(even) .ant-table-cell {
    background-color: #1f1f1f; 
  }
  .ant-table-wrapper .ant-table-tbody-virtual .ant-table-cell, .ant-table-wrapper .ant-table-thead >tr>th, .ant-table-wrapper .ant-table-thead >tr>td {
    border-bottom: none;
  }
`;

export const TabsContainer = styled.div`
.ant-tabs {
    .ant-tabs-tab-btn {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ant-tabs-tab {
        color: #b1d7e9;
    }
} 
.ant-tabs-top >.ant-tabs-nav::before {
    border-bottom: 1px solid transparent;
}
.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #e9ecf1;
}
`;