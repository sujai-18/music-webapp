import React, { useState } from "react";
import { Button, Card, Input, Modal } from "antd";
import { useAppSelector } from "../../hooks/reduxhooks";
import store from "../../redux/store";
import actions from "../../redux/common/actions";
import { createPlaylist } from "../../utils/helper";

const { Meta } = Card;

const CommonModal: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const { playlistModal, yourPlaylist, playlistData } = useAppSelector(
    (state) => state.commonReducer
  );

  const handleCancel = () => {
    // Dispatching an action to close the playlist modal
    store.dispatch({
      type: actions.PLAYLIST_MODAL,
      payload: false,
    });
  };

  const onClick = (key: string, data: string) => {
    console.log({ key, data });
    // Dispatching an action to close the playlist modal
    store.dispatch({
      type: actions.PLAYLIST_MODAL,
      payload: false,
    });
    store.dispatch({
      type: actions.ADD_TAB,
      payload: { title: data, key },
    });
  };

  return (
    <>
      <Modal
        title={
          <div>
            <div>Your Playlist</div>
            <Input
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />
            <Button
              onClick={() => {
                createPlaylist(value);
                setValue("");
              }}
            >
              Add Playlist
            </Button>
          </div>
        }
        open={playlistModal}
        onCancel={handleCancel}
        footer={null}
      >
        {playlistData.map((data: { id: string; title: string }) => (
          <Card key={data.id} onClick={() => onClick(data.id, data.title)}>
            <Meta title={data.title} />
          </Card>
        ))}
      </Modal>
    </>
  );
};

export default CommonModal;
