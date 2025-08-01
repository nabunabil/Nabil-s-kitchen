// Nabil's Kitchen Chatbot
class NabilKitchenChatbot {
    constructor() {
        this.chatButton = document.getElementById('chat-button');
        this.chatWindow = document.getElementById('chat-window');
        this.closeButton = document.getElementById('close-chat');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-button');
        
        this.init();
    }

    init() {
        // Event listeners
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.closeButton.addEventListener('click', () => this.closeChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick reply buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const message = e.target.getAttribute('data-message');
                this.handleQuickReply(message);
            }
        });
    }

    toggleChat() {
        const isVisible = this.chatWindow.style.display !== 'none';
        this.chatWindow.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            this.chatInput.focus();
        }
    }

    closeChat() {
        this.chatWindow.style.display = 'none';
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message) {
            this.addUserMessage(message);
            this.chatInput.value = '';
            setTimeout(() => this.processMessage(message), 500);
        }
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.innerHTML = `<p>${message}</p>`;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message, showQuickReplies = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        
        let html = `<p>${message}</p>`;
        
        if (showQuickReplies) {
            html += `
                <div class="quick-replies">
                    <button class="quick-reply" data-message="menu">View Menu</button>
                    <button class="quick-reply" data-message="hours">Opening Hours</button>
                    <button class="quick-reply" data-message="location">Location</button>
                    <button class="quick-reply" data-message="reservations">Reservations</button>
                </div>
            `;
        }
        
        messageDiv.innerHTML = html;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    handleQuickReply(message) {
        this.addUserMessage(this.getQuickReplyText(message));
        setTimeout(() => this.processMessage(message), 500);
    }

    getQuickReplyText(message) {
        const replies = {
            'menu': 'View Menu',
            'hours': 'Opening Hours',
            'location': 'Location',
            'reservations': 'Reservations'
        };
        return replies[message] || message;
    }

    processMessage(message) {
        const response = this.getBotResponse(message.toLowerCase());
        this.addBotMessage(response.text, response.showQuickReplies);
    }

    getBotResponse(message) {
        // Menu related keywords
        if (this.containsKeywords(message, ['menu', 'food', 'dish', 'pasta', 'eat', 'order'])) {
            return {
                text: "🍝 Our specialty is authentic pasta! We offer:<br><br>• <strong>Rigatoni Carbonara</strong> - Classic Italian favorite<br>• <strong>Tagliatelle Cacio e Pepe</strong> - Simple and delicious<br>• <strong>Spaghetti with Tomato</strong> - Fresh and flavorful<br><br>All dishes are made with fresh ingredients and traditional recipes! Would you like to know about anything else?",
                showQuickReplies: true
            };
        }

        // Hours related keywords
        if (this.containsKeywords(message, ['hours', 'open', 'close', 'time', 'when'])) {
            return {
                text: "🕐 Our opening hours:<br><br>• <strong>Monday - Thursday:</strong> 11:00 AM - 10:00 PM<br>• <strong>Friday - Saturday:</strong> 11:00 AM - 11:00 PM<br>• <strong>Sunday:</strong> 12:00 PM - 9:00 PM<br><br>We're here to serve you delicious pasta throughout the week!",
                showQuickReplies: true
            };
        }

        // Location related keywords
        if (this.containsKeywords(message, ['location', 'address', 'where', 'find', 'directions'])) {
            return {
                text: "📍 You can find us at:<br><br><strong>123 Culinary Street</strong><br>Food City, FL 12345<br><br>📞 Phone: (123) 456-7890<br><br>We're located in the heart of Food City, easily accessible by car or public transport!",
                showQuickReplies: true
            };
        }

        // Reservations related keywords
        if (this.containsKeywords(message, ['reservation', 'book', 'table', 'reserve', 'booking'])) {
            return {
                text: "🍽️ We'd love to have you dine with us!<br><br>To make a reservation:<br>• <strong>Call us:</strong> (123) 456-7890<br>• <strong>Visit us:</strong> 123 Culinary Street<br>• <strong>Online:</strong> Use our contact form below<br><br>We recommend booking in advance, especially for weekends!",
                showQuickReplies: true
            };
        }

        // Price related keywords
        if (this.containsKeywords(message, ['price', 'cost', 'expensive', 'cheap', 'affordable'])) {
            return {
                text: "💰 Our pasta dishes are affordably priced:<br><br>• Most pasta dishes: $12 - $18<br>• We often have special offers up to 50% off!<br>• Great value for authentic, fresh Italian cuisine<br><br>Quality ingredients at reasonable prices - that's our promise!",
                showQuickReplies: true
            };
        }

        // Greeting keywords
        if (this.containsKeywords(message, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            return {
                text: "Hello! 👋 Welcome to Nabil's Kitchen! We're delighted you're here. How can I help you today?",
                showQuickReplies: true
            };
        }

        // Thank you keywords
        if (this.containsKeywords(message, ['thank', 'thanks', 'appreciate'])) {
            return {
                text: "You're very welcome! 😊 We're always happy to help. Is there anything else you'd like to know about Nabil's Kitchen?",
                showQuickReplies: true
            };
        }

        // Default response
        return {
            text: "I'd be happy to help you! 🍝 I can provide information about our menu, opening hours, location, and reservations. What would you like to know?",
            showQuickReplies: true
        };
    }

    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NabilKitchenChatbot();
});