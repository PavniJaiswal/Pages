import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PenFriendContextType {
  penFriends: string[]; // Array of author names
  addPenFriend: (authorName: string) => void;
  removePenFriend: (authorName: string) => void;
  isPenFriend: (authorName: string) => boolean;
}

const PenFriendContext = createContext<PenFriendContextType>({
  penFriends: [],
  addPenFriend: () => {},
  removePenFriend: () => {},
  isPenFriend: () => false,
});

export const usePenFriends = () => useContext(PenFriendContext);

interface PenFriendProviderProps {
  children: ReactNode;
}

export const PenFriendProvider: React.FC<PenFriendProviderProps> = ({ children }) => {
  const [penFriends, setPenFriends] = useState<string[]>([]);

  const addPenFriend = (authorName: string) => {
    setPenFriends((prev) => {
      if (!prev.includes(authorName)) {
        return [...prev, authorName];
      }
      return prev;
    });
  };

  const removePenFriend = (authorName: string) => {
    setPenFriends((prev) => prev.filter((name) => name !== authorName));
  };

  const isPenFriend = (authorName: string) => {
    return penFriends.includes(authorName);
  };

  return (
    <PenFriendContext.Provider value={{ penFriends, addPenFriend, removePenFriend, isPenFriend }}>
      {children}
    </PenFriendContext.Provider>
  );
};

