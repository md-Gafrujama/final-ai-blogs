'use client'

import React, { useState } from 'react'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    companyProfile: '',
    companyImage: null,
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessType: '',
    companyAddress: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState(null) // null, 'pending', 'approved', 'rejected'
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const businessTypes = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Consulting',
    'Real Estate',
    'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          companyImage: 'Please upload a valid image file (JPEG, PNG, or WebP)'
        }))
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          companyImage: 'Image size should be less than 5MB'
        }))
        return
      }

      if (errors.companyImage) {
        setErrors(prev => ({
          ...prev,
          companyImage: ''
        }))
      }

      setFormData(prev => ({
        ...prev,
        companyImage: file
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      companyImage: null
    }))
    setImagePreview(null)
    const fileInput = document.getElementById('companyImage')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }

    if (!formData.companyProfile.trim()) {
      newErrors.companyProfile = 'Company profile is required'
    } else if (formData.companyProfile.length < 50) {
      newErrors.companyProfile = 'Company profile must be at least 50 characters'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required'
    }

    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = 'Company address is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const submitData = new FormData()
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          submitData.append(key, formData[key])
        }
      })

      // Simulate API call to register company
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Set status to pending approval
      setRegistrationStatus('pending')
      setShowSuccessModal(true)
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        companyProfile: '',
        companyImage: null,
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        businessType: '',
        companyAddress: ''
      })
      setImagePreview(null)
      
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="text-2xl">⏰</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Your company registration has been submitted successfully. A super admin will review your application and you'll receive an email notification about the approval status.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center">
            <span className="text-xl mr-2">⏱️</span>
            <span className="text-sm font-medium text-yellow-800">Status: Pending Approval</span>
          </div>
        </div>
        <button
          onClick={() => setShowSuccessModal(false)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Got it!
        </button>
      </div>
    </div>
  )

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: '⏱️', text: 'Pending Approval' },
      approved: { color: 'bg-green-100 text-green-800', icon: '✅', text: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: '❌', text: 'Rejected' }
    }
    
    const config = statusConfig[status]
    if (!config) return null
    
    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="text-3xl text-white">🏢</div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Registration</h1>
            <p className="text-lg text-gray-600">
              Join our platform and grow your business
            </p>
            {registrationStatus && (
              <div className="mt-4">
                <StatusBadge status={registrationStatus} />
              </div>
            )}
          </div>

          {/* Main Form */}
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Information Section */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2 text-blue-600">👤</span>
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400">📞</span>
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">❌</span>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company Information Section */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2 text-blue-600">🏢</span>
                    Company Information
                  </h3>

                  {/* Company Name */}
                  <div className="mb-4">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Acme Corporation"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">❌</span>
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* Business Type */}
                  <div className="mb-4">
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.businessType ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.businessType && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">❌</span>
                        {errors.businessType}
                      </p>
                    )}
                  </div>

                  {/* Company Address */}
                  <div className="mb-4">
                    <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Address *
                    </label>
                    <textarea
                      id="companyAddress"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                        errors.companyAddress ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="123 Business Street, City, State, ZIP"
                    />
                    {errors.companyAddress && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">❌</span>
                        {errors.companyAddress}
                      </p>
                    )}
                  </div>

                  {/* Company Profile */}
                  <div className="mb-4">
                    <label htmlFor="companyProfile" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Profile *
                    </label>
                    <textarea
                      id="companyProfile"
                      name="companyProfile"
                      value={formData.companyProfile}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                        errors.companyProfile ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Describe your company, services, and what makes you unique... (minimum 50 characters)"
                    />
                    <div className="mt-1 flex justify-between items-center">
                      {errors.companyProfile ? (
                        <p className="text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.companyProfile}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          {formData.companyProfile.length}/50 characters minimum
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Logo */}
                  <div>
                    <label htmlFor="companyImage" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      errors.companyImage ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                    }`}>
                      {imagePreview ? (
                        <div className="relative">
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <img
                              src={imagePreview}
                              alt="Company logo preview"
                              className="w-full h-full object-cover rounded-xl shadow-lg"
                            />
                          </div>
                          <p className="text-sm text-gray-600 mb-4 font-medium">{formData.companyImage?.name}</p>
                          <div className="flex gap-3 justify-center">
                            <label
                              htmlFor="companyImage"
                              className="cursor-pointer bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors font-medium flex items-center"
                            >
                              <span className="mr-2">📷</span>
                              Change Logo
                            </label>
                            <button
                              type="button"
                              onClick={removeImage}
                              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors font-medium flex items-center"
                            >
                              <span className="mr-2">🗑️</span>
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-6xl text-gray-400 mb-4">📷</div>
                          <div className="mb-4">
                            <label
                              htmlFor="companyImage"
                              className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-blue-700 transition-colors font-medium inline-flex items-center"
                            >
                              <span className="mr-2">📤</span>
                              Upload Company Logo
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, WebP up to 5MB
                          </p>
                        </div>
                      )}
                    </div>

                    <input
                      type="file"
                      id="companyImage"
                      name="companyImage"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    {errors.companyImage && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="mr-1">❌</span>
                        {errors.companyImage}
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Information Section */}
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2 text-purple-600">🔒</span>
                    Account Security
                  </h3>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        placeholder="john@company.com"
                      />
                      <span className="absolute left-4 top-3.5 text-gray-400">✉️</span>
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <span className="mr-1">❌</span>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="Create a strong password"
                        />
                        <span className="absolute left-4 top-3.5 text-gray-400">🔒</span>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-12 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                            errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <span className="absolute left-4 top-3.5 text-gray-400">🔒</span>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <span className="mr-1">❌</span>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white transition-all transform hover:scale-105 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed scale-100' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting Registration...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-2">✅</span>
                        Submit Registration
                      </div>
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-colors">
                      Sign in here
                    </a>
                  </p>
                </div>

              </form>
            </div>
          </div>

         
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal />}
    </div>
  )
}

export default RegistrationForm