const newNoteBtn = document.getElementById("new-note");
const notesContainer = document.getElementById("notes");

newNoteBtn.addEventListener("click", () => {
  window.location.href = "./new-note.html";
});

const displayNotes = () => {
  // Clear the notes container at first
  notesContainer.innerHTML = "";

  // Loop through each item in the local storage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Check if the key starts with "note_" to identify saved notes
    if (key.startsWith("note_")) {
      const noteData = JSON.parse(localStorage.getItem(key));

      // Display the note
      notesContainer.innerHTML += `
      <main onclick="loadNoteToEdit('${key}')">
        <span>Last saved ${noteData.lastSaved}</span>
        <h3 style="text-align: ${noteData.title.alignment}; font-weight: ${
        noteData.title.bold ? "bold" : "normal"
      }; font-style: ${
        noteData.title.italic ? "italic" : "normal"
      }; text-decoration: ${
        noteData.title.underline ? "underline" : "none"
      }; font-size: ${noteData.title.fontSize};">${noteData.title.text}</h3>
        <p style="text-align: ${noteData.title.alignment}; font-weight: ${
        noteData.content.bold ? "bold" : "normal"
      }; font-style: ${
        noteData.content.italic ? "italic" : "normal"
      }; text-decoration: ${
        noteData.content.underline ? "underline" : "none"
      }; font-size: ${noteData.content.fontSize}">${
        noteData.content.text.length > 100
          ? noteData.content.text.substring(0, 100) + "..."
          : noteData.content.text
      }</p>
      </main>
    `;
    }
  }
};

const loadNoteToEdit = (key) => {
  window.location.href = "./edit-note.html?key=" + key;
};

window.addEventListener("load", () => {
  displayNotes();
});
