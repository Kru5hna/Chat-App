import { useState } from 'react'
import { ChatPage } from './Pages/ChatPage'
import { LoginPage } from './Pages/LoginPage'
import { Route, Routes } from 'react-router' 
import { SignUpPage } from './Pages/SignupPage'
import { useAuthStore } from './store/useAuthStore'

function App() {

  const {authUser, isLoggedIn, login} = useAuthStore();

  console.log(authUser);
  console.log(isLoggedIn)

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080803d_1px,transparent_1px),linear-gradient(to_bottom,#8080803d_1px,transparent_1px)] bg-[size:14px_24px]" />

{/* Top left glow - Brighter pink/purple */}
<div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-40 blur-[120px] animate-pulse" />

{/* Bottom right glow - Brighter cyan */}
<div className="absolute bottom-0 -right-4 size-96 bg-cyan-400 opacity-40 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

{/* Additional middle glow for more pop */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-purple-500 opacity-25 blur-[150px]" />

<button onClick={login} className='z-10'>click me</button>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={ <SignUpPage /> } />
      </Routes>

      
    </div>
  );
}

export default App