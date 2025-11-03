'use client';

import dynamic from 'next/dynamic';

const BubbleChat = dynamic(
    () => import('flowise-embed-react').then((mod) => mod.BubbleChat),
    {
        ssr: false,
    }
);

export default function ChatAssistant() {
    return (
        <BubbleChat
            chatflowid="ca79636c-3db2-4497-a2a1-dfb2c8c3bb54"
            apiHost="https://cloud.flowiseai.com"
            theme={{
                button: {
                    backgroundColor: '#6366f1',
                    right: 20,
                    bottom: 20,
                    size: 56,
                    dragAndDrop: true,
                    iconColor: 'white',
                    autoWindowOpen: {
                        autoOpen: true,
                        openDelay: 0,
                        autoOpenOnMobile: false
                    }
                },
                tooltip: {
                    showTooltip: true,
                    tooltipMessage: 'Hi there! ',
                    tooltipBackgroundColor: '#1f2937',
                    tooltipTextColor: 'white',
                    tooltipFontSize: 14
                },
                chatWindow: {
                    showTitle: true,
                    showAgentMessages: true,
                    title: 'AI Assistant',
                    titleAvatarSrc: 'https://tse3.mm.bing.net/th/id/OIP.GLSyJpQBG_tgcJfKa1G3nAHaFs?rs=1&pid=ImgDetMain&o=7&rm=3 ',
                    welcomeMessage: 'Hello! How can I help you today?',
                    errorMessage: 'Oops! Something went wrong. Please try again.',
                    backgroundColor: '#111827',
                    height: 500,
                    width: 300,
                    fontSize: 12,
                    starterPrompts: [
                        "What can you help me with?",
                        "How does this work?"
                    ],
                    starterPromptFontSize: 11,
                    clearChatOnReload: true,
                    renderHTML: true,
                    botMessage: {
                        backgroundColor: '#1f2937',
                        textColor: '#e5e7eb',
                        showAvatar: true,
                        avatarSrc: 'https://tse3.mm.bing.net/th/id/OIP.GLSyJpQBG_tgcJfKa1G3nAHaFs?rs=1&pid=ImgDetMain&o=7&rm=3'
                    },
                    userMessage: {
                        backgroundColor: '#6366f1',
                        textColor: '#ffffff',
                        showAvatar: true,
                        avatarSrc: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
                    },
                    textInput: {
                        placeholder: 'Type your message...',
                        backgroundColor: '#1f2937',
                        textColor: '#f3f4f6',
                        sendButtonColor: '#6366f1',
                        maxChars: 100,
                        maxCharsWarningMessage: 'Message too long. Please keep it under 100 characters.',
                        autoFocus: true,
                    },
                    feedback: {
                        color: '#6b7280'
                    },
                    dateTimeToggle: {
                        date: false,
                        time: true
                    },
                    footer: {
                        textColor: '#6b7280',
                        text: 'Powered by',
                        company: 'Transecta',
                        companyLink: 'https://transecta.repox.me'
                    }
                }
            }}
        />
    )
}