import styled from 'styled-components';

export const MusicCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  height: calc(100vh - 150px);
  overflow: auto;
  padding: 10px 5px;
`;

export const SiderContainer = styled.div`
  background: #252526;
  .ant-menu {
    padding: 75px 0;
  background: #252526;
  .ant-menu-item {
    svg path {
      fill: #ffffff;
    }
    .ant-menu-title-content {
      color: #f1f1f3;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .ant-menu-item-selected {
    background-color: inherit;
  }
  }
  .ant-menu-title-content {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
  .title {
    display: flex;
    gap: 12px;
    color: #ffffff;
    position: absolute;
    top: 12px;
    left: 30px;
    font-size: 20px;
    font-weight: 700;
    align-items: center;
  }
  @media (max-width: 768px) {
    .ant-layout-sider {
      width: 75px !important;
      min-width: 75px !important;
      .ant-menu-title-content {
        display: none !important;
      }
    }
    .title div:last-child {
      display: none !important;
    }
  }
`;

export const HeaderContainer = styled.div`
  background: #2c2c2c;
  .ant-layout-header, .ant-menu {
  background: #2c2c2c;
  }
`;

export const ContentContainer = styled.div`
height: 100%;
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
    .ant-table-wrapper .ant-table {
      background: transparent;
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
  .ant-table-wrapper .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: inherit;
}
.ant-table-wrapper .ant-table-thead th.ant-table-column-sort {
  background: inherit;
}

.ant-table-column-sorter-inner {
  .anticon-caret-down {
    font-size: 20px;
    color: #a19481;
  }
}
  .favourites {
    svg {
      font-size: 20px;
      color: #5f9ea0;
    }
  }
  .favourites, .queue {
    cursor: pointer;
  }
  .queue svg {
    fill: #5f9ea0;
  }
  .relative {
    position: relative;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
      .absolute {
        visibility: visible;
      }
    }
  }
  .absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
  }
  .ant-table-cell {
    background: #21201f;
  }
  .ant-empty-description {
    color: #ffffff;
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

export const MusicTrackerContainer = styled.div`
  min-height: 50px;
  background: #2c2c2c;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 24px;
  position: relative;
  svg {
    font-size: 22px;
    cursor: pointer;
  }
  input {
    margin: -5px 5px 0 24px;
    max-width: 200px;
    height: 2px;
  }
  .relative {
    position: relative;
    display: flex;
  }
  .start-time, .end-time {
    position: absolute;
    top: 6px;
    color: #7a7b7b;
    }
    .start-time {
      left: 25px;
    }
    .end-time {
      right: 5px;
    }
    .ant-typography {
      font-size: 16px;
      color: #a8a2a2;
      .ant-typography-copy {
        padding: 5px !important;
        color: #a8a2a2;
      }
    }
    .icon-relative {
      position: relative;
    }
    .icon-absolute {
      position: absolute;
      top: 0;
      left: 0;
      transform: rotate(45deg);
    }
    .shuffle-icon {
      svg {
        font-size: 18px;
      }
    }
    .ant-space {
      width: 100%;
      justify-content: space-between;
    }
    .media-player {
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      .space-container {
       input, .start-time, .end-time {
        display: none;
       }
      }
    }
`;