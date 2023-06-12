import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useUserContext } from '../../../App';
import { User } from '../home';

type ChatScreenProps = {
  route: {
    params: {
      user: User;
    };
  };
};

export default function ChatScreen({ route: { params: { user } } }: ChatScreenProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { currentUser } = useUserContext();

  const getAllMessages = () => {
    const uid = user.uid;
    const chatId = uid > currentUser.uid ? currentUser.uid + '-' + uid : uid + '-' + currentUser.uid;
    return firestore().collection('Chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((doc) => {
        if (doc) {
          setMessages(doc.docs.map(docSanp => {
            return {
              ...docSanp.data() as IMessage,
              createdAt: docSanp.data().createdAt?.toDate()
            };
          }));
        }
      });
  };

  useEffect(() => {
    return getAllMessages();
  }, []);

  const onSend = async (newMessages: IMessage[]) => {
    const [msg] = newMessages;

    const uid = user.uid;
    const userMsg = {
      ...msg,
      sentBy:    currentUser.uid,
      sentTo:    uid,
      createdAt: new Date()
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, [msg]));
    const chatId = uid > currentUser.uid ? currentUser.uid + '-' + uid : uid + '-' + currentUser.uid;

    await firestore().collection('Chats')
      .doc(chatId)
      .collection('messages')
      .add(userMsg);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id:  currentUser.uid,
        name: `${currentUser.firstName} ${currentUser.lastName}`
      }}
    />
  );
}
