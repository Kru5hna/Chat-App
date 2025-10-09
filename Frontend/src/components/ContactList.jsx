import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ContactList = () => {
  const { getAllContacts, allContacts, isUserLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;
  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-purple-700/10 p-4 cursor-pointer rounded-lg hover:bg-purple-700/20 transition-colors"
          onClick={() => {
            setSelectedUser(contact);
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers?.includes(contact._id) ? "online" : "offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.fullName}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-200 font-medium truncate">
                {contact.fullName}
              </h4>
              <p className="text-slate-400 text-sm truncate">
                {onlineUsers?.includes(contact._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;