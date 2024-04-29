import React, { memo, useEffect } from "react";
import { message } from "antd";
import { useAppSelector } from "../../hooks/reduxhooks";

const MessageComponent: React.FC<any> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { messageContent, favouriteList, queueListUrl, clearTabs } =
    useAppSelector((state) => state.commonReducer);

  const success = () => {
    messageApi.open({
      type: "success",
      content: messageContent,
    });
  };

  // useEffect hook to trigger message display when messageContent changes
  useEffect(() => {
    if (messageContent) {
      success();
    }
  }, [favouriteList.length, queueListUrl.length, clearTabs, messageContent]);

  return contextHolder;
};
const MemoizedMessageComponent = memo(MessageComponent);
export default MemoizedMessageComponent;
