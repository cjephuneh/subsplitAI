import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from '@/hooks/use-toast'

interface WaitlistData {
  firstName: string
  lastName: string
  email: string
  company?: string
  role?: string
  interestedTools: string[]
  useCase?: string
  budget?: string
  notifications: boolean
  updates: boolean
}

export function useWaitlist() {
  const [loading, setLoading] = useState(false)

  const joinWaitlist = async (data: WaitlistData) => {
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            company: data.company || null,
            role: data.role || null,
            interested_tools: data.interestedTools,
            use_case: data.useCase || null,
            budget: data.budget || null,
            notifications: data.notifications,
            updates: data.updates,
          }
        ])

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation (email already exists)
          toast({
            title: "Already on the waitlist",
            description: "This email is already registered for early access.",
            variant: "destructive",
          })
          return { success: false, error: 'Email already exists' }
        }
        throw error
      }

      toast({
        title: "Welcome to the waitlist!",
        description: "You'll be notified when we launch with exclusive early access.",
      })

      return { success: true, error: null }
    } catch (error) {
      console.error('Error joining waitlist:', error)
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support if the problem persists.",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const getWaitlistCount = async () => {
    try {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

      if (error) throw error
      return count || 0
    } catch (error) {
      console.error('Error getting waitlist count:', error)
      return 0
    }
  }

  return {
    joinWaitlist,
    getWaitlistCount,
    loading,
  }
}