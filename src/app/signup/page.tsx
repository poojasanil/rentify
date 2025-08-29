'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

export default function SignUpPage() {

     const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phonenumber: '',
    role: 'tenant' // Default role
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')

    // if (formData.password.length < 6) {
    //   setError('Password must be at least 6 characters long')
    //   return
    // }

    try {
      setLoading(true)
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phonenumber: formData.phonenumber,
          role: formData.role
        })
      })

      const data = await res.json()
        console.log(data)
        console.log(res)
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      // Auto login after successful signup
      if (data.success && data.user) {
        localStorage.setItem('rentify_user', JSON.stringify(data.user))
        router.push('/')
        router.refresh()
      }

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    console.log("NAme", e.target.name, "Value", e.target.value, "FD", formData)
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign up Page</h2>

          {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {loading && (
        <div className="text-blue-500 mb-4">Loading...</div>)}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
            <input type="name" id="name" className="w-full p-2 border border-gray-300 rounded" required name="name"
            onChange={handleChange}
            value={formData.name}/>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" required name="email"
            onChange={handleChange}
            value={formData.email} />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" required name="password"
            onChange={handleChange}
            value={formData.password}/>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="phonenumber">Phone number</label>
            <input type="phonenumber" id="phonenumber" className="w-full p-2 border border-gray-300 rounded" required name="phonenumber"
            onChange={handleChange}
            value={formData.phonenumber}/>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Role</label>
            <select name="role" id="role" className="w-full p-2 border border-gray-300 rounded" required onChange={handleChange} value={formData.role}>
              <option value="tenant">Tenant</option>
              <option value="owner">Owner</option>
                <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" onClick={handleSubmit}>SUBMIT</button>
        </form>
      </div>
    </div>
  );
}
