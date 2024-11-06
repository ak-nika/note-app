const editButton = document.getElementById("edit");

// Function to get the note key from the URL
const getNoteKeyFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("key");
};

const loadNoteToEdit = () => {
  const noteKey = getNoteKeyFromUrl();
  if (!noteKey) {
    alert("Note not found 😢💔");
    window.location.href = "../index.html";
  }

  const noteData = JSON.parse(localStorage.getItem(noteKey));
  if (!noteData) {
    alert("Note not found 😢💔");
    window.location.href = "../index.html";
  }

  // Get title and content text areas
  const titleTextarea = document.getElementById("title");
  const contentTextarea = document.getElementById("content");

  // Apply title and content with formatting
  titleTextarea.value = noteData.title.text;
  titleTextarea.style.fontSize = noteData.title.fontSize;
  titleTextarea.style.fontWeight = noteData.title.bold ? "bold" : "normal";
  titleTextarea.style.fontStyle = noteData.title.italic ? "italic" : "normal";
  titleTextarea.style.textDecoration = noteData.title.underline
    ? "underline"
    : "none";
  titleTextarea.style.textAlign = noteData.title.alignment;

  contentTextarea.value = noteData.content.text;
  contentTextarea.style.fontSize = noteData.content.fontSize;
  contentTextarea.style.fontWeight = noteData.content.bold ? "bold" : "normal";
  contentTextarea.style.fontStyle = noteData.content.italic
    ? "italic"
    : "normal";
  contentTextarea.style.textDecoration = noteData.content.underline
    ? "underline"
    : "none";
  contentTextarea.style.textAlign = noteData.content.alignment;
};

loadNoteToEdit();

editButton.addEventListener("click", () => {
  const key = getNoteKeyFromUrl();
  const date = new Date();
  const lastSaved = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

  const noteData = {
    title: {
      text: titleTextarea.value,
      fontSize: titleTextarea.style.fontSize || "20px",
      bold: titleTextarea.style.fontWeight === "bold",
      italic: titleTextarea.style.fontStyle === "italic",
      underline: titleTextarea.style.textDecoration === "underline",
      alignment: titleTextarea.style.textAlign || "left",
    },
    content: {
      text: contentTextarea.value,
      fontSize: contentTextarea.style.fontSize || "16px",
      bold: contentTextarea.style.fontWeight === "bold",
      italic: contentTextarea.style.fontStyle === "italic",
      underline: contentTextarea.style.textDecoration === "underline",
      alignment: contentTextarea.style.textAlign || "left",
    },
    lastSaved,
  };

  localStorage.setItem(key, JSON.stringify(noteData));
  alert("Note edited successfully!!");
  window.location.href = "../index.html";
});
