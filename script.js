const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const submit = document.getElementById("submitButton");
const userDetails = document.getElementById("userDetails");
const modal = document.getElementById("editModal");
const firstnameModal = document.getElementById("firstname_modal");
const lastnameModal = document.getElementById("lastname_modal");
const emailModal = document.getElementById("email_modal");
const updateButton = document.getElementById("updateButton");
const cancelButton = document.getElementById("cancelButton")
const url = "https://usersapi.osinachi.me/users";

// add user
submit.addEventListener("click", async (event) => {
  event.preventDefault();
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value
      })
    });
    alert("User added!");
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    displayList();
  } catch (error) {
    console.error("Error adding user:", error);
  }
});

//upload users by default
window.onload = displayList;

async function displayList() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    userDetails.innerHTML = "";

    data.forEach(user => {
      const li = document.createElement("li");

      const firstSpan = document.createElement("span");
      firstSpan.textContent = user.first_name;

      const secondSpan = document.createElement("span");
      secondSpan.textContent = user.last_name;

      const emailSpan = document.createElement("span");
      emailSpan.textContent = user.email;

      const actionsSpan = document.createElement("span");

      // Edit icon
      const editIcon = document.createElement("i");
      editIcon.className = "fas fa-pen";
      editIcon.style.color = "#6c757d";
      editIcon.style.cursor = "pointer";
      editIcon.addEventListener("click", () => {
        modal.style.display = "flex";
        firstnameModal.value = user.first_name;
        lastnameModal.value = user.last_name;
        emailModal.value = user.email;

        updateButton.onclick = async (e) => {
          e.preventDefault();
          try {
            await fetch(`${url}/${user.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                first_name: firstnameModal.value,
                last_name: lastnameModal.value,
                email: emailModal.value
              })
            });
            alert("User updated!");
            modal.style.display = "none";
            displayList();
          } catch (error) {
            console.error("Error updating user:", error);
          }
        };
      });
      cancelButton.onclick = (e) => {
        e.preventDefault();
        modal.style.display ="none"
      }

      // delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash";
      deleteIcon.style.color = "red";
      deleteIcon.style.cursor = "pointer";
      deleteIcon.style.marginLeft = "15px";
      deleteIcon.addEventListener("click", async () => {
        try {
          await fetch(`${url}/${user.id}`, { method: "DELETE" });
          li.remove();
        } catch (err) {
          console.error("Error deleting user:", err);
        }
      });

      actionsSpan.append(editIcon, deleteIcon);
      li.append(firstSpan, secondSpan, emailSpan, actionsSpan);
      userDetails.appendChild(li);
    });
  } catch (error) {
    console.error("Error getting users:", error);
  }
}
