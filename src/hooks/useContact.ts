import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from '@/hooks/use-toast'

interface ContactData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export function useContact() {
  const [loading, setLoading] = useState(false)

  const submitContact = async (data: ContactData) => {
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            subject: data.subject,
            message: data.message,
          }
        ])

      if (error) {
        throw error
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      return { success: true, error: null }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly at support@subsplit.com",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    submitContact,
    loading,
  }
}