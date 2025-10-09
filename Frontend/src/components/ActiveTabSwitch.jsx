import React from 'react'
import { useChatStore } from '../store/useChatStore';

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className='tabs tabs-boxed p-2 m-2 bg-transparent'>
      <button
      onClick={() => setActiveTab('chats')}
      className={`tab ${activeTab === 'chats' ? "bg-purple-800/20 text-white" : "text-purple-400"}`}
      >
        Chats
      </button>

      <button
      onClick={() => setActiveTab('contacts')}
      className={`tab ${activeTab === 'contacts' ? "bg-purple-800/20 text-white" : "text-purple-400"}`}
      
      >
        Contacts
      </button>
    </div>
  )
}

export default ActiveTabSwitch