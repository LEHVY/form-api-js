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
const cancelButton = document.getElementById("cancelButton");
const url = "https://usersapi.osinachi.me/users";
const displayForm = document.querySelector(".displayForm");
const form = document.getElementById("mainForm")
const formBlur = document.querySelector(".form-blur")
const loadingUsers = document.getElementById("loading-users")



//Display form
displayForm.onclick = () => {
  form.style.display = "flex"
  form.style.flexDirection = "column"
  formBlur.style.display = "flex"
}
// Clear form
formBlur.onclick = () => {
  form.style.display = "none";
  formBlur.style.display = "none";
}

// Add user
submit.addEventListener("click", async (event) => {
  event.preventDefault();
  //loading animation
  loadingUsers.style.display = "flex"


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
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    displayList();
  } catch (error) {
    console.error("Error adding user:", error);
  }
});

// Load users when the page opens
window.onload = displayList;

async function displayList() {
  loadingUsers.style.display = "flex"
  try {
    const res = await fetch(url);
    const data = await res.json();
    const tableBody = document.querySelector(".listOfUsersTable");

    // Clear previous rows except the header
    tableBody.querySelectorAll(".tableRow").forEach(row => row.remove());

    data.forEach(user => {
      const tr = document.createElement("tr");
      tr.className = "tableRow";

      const tdFirstname = document.createElement("td");
      const tdLastname = document.createElement("td");
      const tdEmail = document.createElement("td");
      const tdActions = document.createElement("td");

      tdFirstname.textContent = user.first_name;
      tdLastname.textContent = user.last_name;
      tdEmail.textContent = user.email;

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
            modal.style.display = "none";
            displayList();
          } catch (error) {
            console.error("Error updating user:", error);
          }
        };
      });

      // Cancel button
      cancelButton.onclick = (e) => {
        e.preventDefault();
        modal.style.display = "none";
      };

      // Delete icon
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash";
      deleteIcon.style.color = "red";
      deleteIcon.style.cursor = "pointer";
      deleteIcon.style.marginLeft = "15px";
      deleteIcon.addEventListener("click", async () => {
        try {
          await fetch(`${url}/${user.id}`, { method: "DELETE" });
          tr.remove();
          alert("User Deleted")
        } catch (err) {
          console.error("Error deleting user:", err);
        }
      });

      tdActions.append(editIcon, deleteIcon);
      tr.append(tdFirstname, tdLastname, tdEmail, tdActions);
      tableBody.appendChild(tr);
      formBlur.style.display = "none"
      form.style.display = "none"
      loadingUsers.style.display = "none"

    });
  } catch (error) {
    console.error("Error getting users:", error);
  }
}

