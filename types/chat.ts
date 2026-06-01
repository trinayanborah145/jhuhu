export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}

export interface LeadData {
  name: string | null
  phone: string | null
  email: string | null
  projectType: string | null
  projectDescription: string | null
  budgetRange: string | null
  timeline: string | null
  location: string | null
  bestTimeToCall: string | null
  capturedAt: string
  conversationSummary: string
}

export type ConversationStage =
  | 'greeting'
  | 'qualifying'
  | 'collecting_details'
  | 'collecting_contact'
  | 'confirming'
  | 'complete'

export interface ConversationState {
  stage: ConversationStage
  leadData: Partial<LeadData>
  isLeadCaptured: boolean
}
