import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

export const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 ">
      <div className="relative w-full max-w-6xl h-[710px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex overflow-hidden rounded-lg bg-zinc-950">
            {/* Left Sidebar - Contacts/Chats */}
            <div className="w-80 bg-zinc-950 flex flex-col border-r border-purple-500/10">
              {/* Profile Header */}
              <div className="p-4 border-b border-purple-500/10">
                <ProfileHeader />
              </div>

              {/* Tab Switch */}
              <div className="p-4 border-b border-purple-500/10">
                <ActiveTabSwitch />
              </div>

              {/* Scrollable List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-purple-600/30 scrollbar-track-transparent">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* Right Side - Chat Container */}
            <div className="flex-1 flex flex-col bg-zinc-950">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoConversationPlaceholder />
              )}
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};