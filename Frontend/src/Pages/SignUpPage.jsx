import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore' 
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';

export const SignUpPage = () => {

  const [formData, setFormData] = useState({fullName:  "", email: "", password: ""});

  const {signUp, isSignUp} = useAuthStore();

  const handleSubmit = (e) => {
    
  }

  return (
   <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>

          
        </BorderAnimatedContainer>

         </div>

      </div>
  )
}
