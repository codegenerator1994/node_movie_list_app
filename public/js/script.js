const deleteForms = document.querySelectorAll(".delete-form");
deleteForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) {
      e.preventDefault();
    }
  });
});

const castInput = document.getElementById("cast");
if (castInput) {
  castInput.addEventListener("blur", () => {
    const castValue = castInput.value.trim();
    const castArray = castValue.split(",").map((item) => item.trim());
    castInput.value = castArray.join(", ");
  });
}
