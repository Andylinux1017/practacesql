document.addEventListener('DOMContentLoaded', function() {
    loadMessages();

    document.getElementById('messageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitMessage();
    });
});

function submitMessage() {
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;

    fetch('submit_message.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nickname=${encodeURIComponent(nickname)}&message=${encodeURIComponent(message)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadMessages();
        document.getElementById('message').value = '';
    })
    .catch(error => console.error('Error:', error));
}

function loadMessages() {
    fetch('get_messages.php')
    .then(response => response.json())
    .then(data => {
        const messageList = document.getElementById('messageList');
        messageList.innerHTML = '';
        data.forEach(msg => {
            const msgElement = document.createElement('div');
            msgElement.className = 'message';
            msgElement.innerHTML = `
                <span class="nickname">${escapeHtml(msg.nickname)}</span>
                <span class="time"> 於 ${msg.created_at} 說:</span><br>
                ${escapeHtml(msg.message)}
            `;
            messageList.appendChild(msgElement);
        });
    })
    .catch(error => console.error('Error:', error));
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
