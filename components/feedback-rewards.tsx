'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Gift, Sparkles, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FeedbackRewardsProps {
  walletAddress: string
}

export default function FeedbackRewards({ walletAddress }: FeedbackRewardsProps) {
  const [rating, setRating] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating || !feedback.trim()) return

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      
      toast({
        title: 'Feedback Submitted',
        description: '25 tokens sent to your wallet.',
      })

      setTimeout(() => {
        setRating('')
        setFeedback('')
        setSubmitted(false)
      }, 3000)
    }, 2000)
  }

  const availableSurveys = [
    {
      title: 'Recent Purchase Experience',
      reward: 25,
      time: '2 min',
      description: 'Share your latest shopping experience',
    },
    {
      title: 'Product Quality Feedback',
      reward: 50,
      time: '5 min',
      description: 'Detailed feedback about product quality',
    },
    {
      title: 'Service Improvement',
      reward: 35,
      time: '3 min',
      description: 'Help us improve customer service',
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="glass-light border border-border/50 p-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Share Feedback</h2>
            <p className="leading-relaxed text-muted-foreground">
              Complete surveys and earn tokens for your insights.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-foreground px-3 py-2">
            <Gift className="h-4 w-4 text-background" />
            <span className="text-sm font-semibold text-background">+25</span>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-foreground">Rate your recent experience</Label>
              <RadioGroup value={rating} onValueChange={setRating} className="space-y-3">
                {['Excellent', 'Good', 'Average', 'Poor'].map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.toLowerCase()} id={option.toLowerCase()} />
                    <Label htmlFor={option.toLowerCase()} className="cursor-pointer font-normal text-foreground">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="feedback" className="text-foreground">
                Tell us more
              </Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px] resize-none border-border/50"
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground">
                {feedback.length}/500
              </p>
            </div>

            <Button
              type="submit"
              disabled={!rating || !feedback.trim() || isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4" />
                  Submit & Claim Reward
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle2 className="mb-4 h-12 w-12 text-success" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">Thank you</h3>
            <p className="text-center text-muted-foreground">
              25 tokens sent to your wallet
            </p>
          </div>
        )}
      </Card>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">More Surveys</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {availableSurveys.map((survey, index) => (
            <Card key={index} className="glass-light border border-border/50 p-5 transition-all hover:border-foreground/30">
              <div className="mb-3 flex items-start justify-between">
                <h4 className="font-semibold leading-snug text-foreground">{survey.title}</h4>
                <span className="rounded-lg bg-foreground px-2 py-1 text-xs font-medium text-background">
                  +{survey.reward}
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{survey.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{survey.time}</span>
                <Button variant="outline" size="sm" className="border-border/50">
                  Start
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="glass-light border border-border/50 bg-muted/20 p-6">
        <h3 className="mb-2 font-semibold text-foreground">Why feedback matters</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your insights help businesses improve. In return, you receive tokens directly to your wallet. All feedback contributes to your reputation score.
        </p>
      </Card>
    </div>
  )
}
