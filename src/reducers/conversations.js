const initialState = {
  conversations: {},
  messages: {},
  unreadMessagesCount: {},
  activeConversation: '', // sessionStorage.getItem('activeConversation') || '',
}

const conversations = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.conversations }

    case 'SET_ACTIVE_CONVERSATION':
      // sessionStorage.setItem('activeConversation', action.activeConversation)
      return { ...state, activeConversation: action.activeConversation }

    case 'SET_UNREAD_MESSAGES_COUNT': {
      const { id, count } = action.payload
      const updates = { ...state, unreadMessagesCount: { ...state.unreadMessagesCount, [id]: count } }
      const all = Object.values(updates.unreadMessagesCount).reduce((prev, current) => prev + +current, 0)
      document.title = `Chat App ${all ? `(${all})` : ''}`
      return updates
    }

    case 'SET_MESSAGES':
      const { id, messages } = action.payload

      return {
        ...state,
        messages: {
          ...state.messages,
          [id]: { ...state.messages[id], ...messages },
        },
      }
    default:
      return state
  }
}

export default conversations
