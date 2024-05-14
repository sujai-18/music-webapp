import React, { memo, useEffect, useMemo } from "react";
import { message } from "antd";
import { useAppSelector } from "../../hooks/reduxhooks";

const MessageComponent: React.FC<any> = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { messageContent, favouriteList, queueListUrl, clearTabs } =
    useAppSelector((state) => state.commonReducer);
  // Memoizing the message content
  const memoizedMessageContent = useMemo(
    () => messageContent,
    [messageContent]
  );

  const success = () => {
    messageApi.open({
      type: "success",
      content: memoizedMessageContent,
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
