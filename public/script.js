document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById("loginForm");
      const botStateInput = document.getElementById('botState');
      const prefixInput = document.getElementById('prefix');
      const adminUidInput = document.getElementById('adminUid');
      const guideButton = document.getElementById('toggleGuide');
      const guideSection = document.getElementById('guideSection');
      const commandList = document.getElementById('commands');
      const sessionList = document.getElementById('sessionList');
      const commandModal = document.getElementById('commandModal');
      const openModalButton = document.getElementById('openModal');
      const closeModalButton = document.querySelector('.close');

      const prevPageButton = document.getElementById('prevPage');
      const nextPageButton = document.getElementById('nextPage');

      let currentPage = 1;
      const commandsPerPage = 5;
      let commandsData = [];
      
      guideButton.addEventListener('click', () => {
        if (guideSection.style.display === 'none' || guideSection.style.display === '') {
          guideSection.style.display = 'block';
          guideButton.textContent = 'Hide Guide';
        } else {
          guideSection.style.display = 'none';
          guideButton.textContent = 'Show Guide';
        }
      });
      
      async function checkIfLoggedIn() {
  const response = await fetch("/active-sessions");
  const sessions = await response.json();
  return Object.keys(sessions).length > 0;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const alreadyLoggedIn = await checkIfLoggedIn();
  if (alreadyLoggedIn) {
    alert("You are already logged in. Please logout before trying to log in again.");
    return;
  }

  const botState = document.getElementById("botState").value;
  const prefix = document.getElementById("prefix").value;
  const adminUID = document.getElementById("adminUID").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ botState, prefix, adminUID }),
    });

    if (response.ok) {
      alert("Logged in successfully!");
      document.getElementById("botState").value = "";
      document.getElementById("prefix").value = "";
      document.getElementById("adminUID").value = "";
    } else {
      alert("Failed to login.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
      
      async function fetchCommands() {
        try {
          const response = await fetch('/commands');
          if (!response.ok) {
            throw new Error('Failed to fetch commands');
          }
          const commands = await response.json();
          commandsData = Object.keys(commands).map((name) => ({
            name,
            description: commands[name].description,
          }));
          displayCommands();
        } catch (error) {
          console.error('Error fetching commands:', error);
          alert('Failed to fetch commands. Please try again.');
        }
      }

      function displayCommands() {
        commandList.innerHTML = '';

        const startIndex = (currentPage - 1) * commandsPerPage;
        const endIndex = startIndex + commandsPerPage;
        const currentCommands = commandsData.slice(startIndex, endIndex);

        currentCommands.forEach((command) => {
          const li = document.createElement('li');
          li.className = 'command-item';
          li.innerHTML = `
            <div class="command-name">${command.name}</div>
            <div class="command-description">${command.description}</div>
          `;
          commandList.appendChild(li);
        });

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = endIndex >= commandsData.length;
      }

      prevPageButton.addEventListener('click', () => {
        currentPage--;
        displayCommands();
      });

      nextPageButton.addEventListener('click', () => {
        currentPage++;
        displayCommands();
      });

      async function fetchActiveSessions() {
        try {
          const response = await fetch('/active-sessions');
          if (!response.ok) {
            throw new Error('Failed to fetch active sessions');
          }
          const sessions = await response.json();
          displayActiveSessions(sessions);
        } catch (error) {
          console.error('Error fetching active sessions:', error);
          alert('Failed to fetch active sessions. Please try again.');
        }
      }

      function displayActiveSessions(sessions) {
        sessionList.innerHTML = '';

        Object.keys(sessions).forEach((uid) => {
          const session = sessions[uid];
          const li = document.createElement('li');
          li.className = 'session-item';
          li.innerHTML = `
            <div class="session-name">UserID: ${session.userID}</div>
            <div class="session-description">Prefix: ${session.prefix}</div>
          `;
          sessionList.appendChild(li);
        });
      }

      openModalButton.addEventListener('click', () => {
        commandModal.style.display = 'block';
      });

      closeModalButton.addEventListener('click', () => {
        commandModal.style.display = 'none';
      });

      window.addEventListener('click', (event) => {
        if (event.target === commandModal) {
          commandModal.style.display = 'none';
        }
      });

      fetchCommands();
      fetchActiveSessions();
    });