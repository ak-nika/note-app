// Get the items
const textareas = document.querySelectorAll("textarea");
const titleTextarea = document.getElementById("title");
const contentTextarea = document.getElementById("content");
const backButton = document.getElementById("back");
const fontSize = document.getElementById("font");
let activeAlignButton = null;
let activeTextarea = null;
let isBoldActive = false;
let isItalicActive = false;
let isUnderlineActive = false;

// Event listener to track the active textarea
titleTextarea.addEventListener("focus", () => {
  activeTextarea = titleTextarea;
});
contentTextarea.addEventListener("focus", () => {
  activeTextarea = contentTextarea;
});

// Remove active state when focus is lost
// titleTextarea.addEventListener("blur", () => {
//   activeTextarea = null;
// });
// contentTextarea.addEventListener("blur", () => {
//   activeTextarea = null;
// });

// Set the back button to take the user back to the home page
backButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// Apply a function to make the text area expand while typing in it instead of getting a scroll bar
textareas.forEach((textarea) => {
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });
});

// Set text alignment
const setTextAlign = (alignment) => {
  // Ensure there is an active text area
  if (!activeTextarea) return;

  // Set the text align
  activeTextarea.style.textAlign = alignment;

  // Set the class name to active
  updateActiveButton(alignment);
};

const updateActiveButton = (alignment) => {
  // Remove active class from the current button
  if (activeAlignButton) {
    activeAlignButton.classList.remove("active");
  }

  // Add active class to clicked button
  activeAlignButton = document.getElementById(`align-${alignment}`);
  activeAlignButton.classList.add("active");
};

// Set text formatting
const toggleBold = () => {
  isBoldActive = !isBoldActive; // Toggle bold state

  updateActiveFormatting("bold", isBoldActive);
};

const toggleItalic = () => {
  isItalicActive = !isItalicActive; // Toggle Italic state

  updateActiveFormatting("italic", isItalicActive);
};

const toggleUnderline = () => {
  isUnderlineActive = !isUnderlineActive; // Toggle underline state

  updateActiveFormatting("underline", isUnderlineActive);
};

const updateActiveFormatting = (formatType, isActive) => {
  // Ensure there is an active textarea
  if (!activeTextarea) return;

  // Apply or remove the formatting based on the active state
  if (isActive) {
    if (formatType === "bold") {
      activeTextarea.style.fontWeight = "bold";
    } else if (formatType === "italic") {
      activeTextarea.style.fontStyle = "italic";
    } else if (formatType === "underline") {
      activeTextarea.style.textDecoration = "underline";
    }
  } else {
    // Reset the style to normal when toggled off
    if (formatType === "bold") {
      activeTextarea.style.fontWeight = "normal";
    } else if (formatType === "italic") {
      activeTextarea.style.fontStyle = "normal";
    } else if (formatType === "underline") {
      activeTextarea.style.textDecoration = "none";
    }
  }

  // Update the active button class for visual feedback
  const buttonId = formatType + "Button";
  const button = document.getElementById(buttonId);
  button.classList.toggle("active", isActive); // Add/remove 'active' class
};

// Edit font size
fontSize.addEventListener("change", () => {
  if (!activeTextarea) return;

  activeTextarea.style.fontSize = `${fontSize.value}px`;
});
