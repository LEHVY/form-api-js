const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const submit = document.getElementById("submitButton");

submit.style.color = "red";

// POST METHOD
submit.addEventListener("click", async (event) => {
    event.preventDefault();

    const url = "https://usersapi.osinachi.me/users";

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value
            })
        });

        let data = await res.json();
        alert("User uploaded successfully!");
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
        alert("Error uploading user");
    }
});

// GET METHOD
const getButton = document.getElementById("getButton");
const userDetails = document.getElementById("userDetails");

getButton.addEventListener("click", displayList);

async function displayList(event) {
    event.preventDefault();
    const url = "https://usersapi.osinachi.me/users";

    try {
        const res = await fetch(url);
        const data = await res.json();
        userDetails.innerHTML = "";

        const ul = document.createElement("ul");

        data.forEach(user => {
            const li = document.createElement("li");

            const firstSpan = document.createElement("span");
            firstSpan.className = "firstname";
            firstSpan.textContent = user.first_name;

            const secondSpan = document.createElement("span");
            secondSpan.className = "secondname";
            secondSpan.textContent = user.last_name;

            const emailSpan = document.createElement("span");
            emailSpan.className = "email";
            emailSpan.textContent = user.email;


            const actionsSpan = document.createElement("span");
            actionsSpan.className = "actions";


            // EDITICON
            const editIcon = document.createElement("i");
            editIcon.className = "fas fa-pen"
            editIcon.style.color = "#6c757d"
            editIcon.style.cursor = "pointer"
            editIcon.addEventListener("click", async () => {
                submit.innerHTML = 'UPDATE <i class="fas fa-check"></i>';
                firstName.value = user.first_name;
                lastName.value = user.last_name;
                email.value = user.email;
                submit.onclick = async (event) => {
                    event.preventDefault();
                    try {
                        const res = await fetch(`${url}/${user.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                first_name: firstName.value,
                                last_name: lastName.value,
                                email: email.value
                            })
                        });
                        const data = await res.json();
                        console.log("Updated user:", data);
                        alert("User updated successfully!");
                        // Refresh
                        displayList(event);
                        submit.innerHTML = 'Add <i class="fas fa-add"></i>';
                    } catch (error) {
                        console.error("Edit failed:", error);
                        alert("Edit failed");
                    }
                };
            });
            //delete icon
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fas fa-trash";
            deleteIcon.style.color = "red"
            deleteIcon.style.cursor = "pointer";
            deleteIcon.style.paddingLeft ="22px"
            deleteIcon.addEventListener("click", async () => {
                try {
                    await fetch(`${url}/${user.id}`, { method: "DELETE" });
                    li.remove();
                } catch (err) {
                    console.error("Error deleting user:", err);
                }
            });


            actionsSpan.appendChild(editIcon);
            actionsSpan.appendChild(deleteIcon);


            li.append(firstSpan, secondSpan, emailSpan, actionsSpan);
            ul.appendChild(li);
        });

        userDetails.appendChild(ul);

    } catch (error) {
        console.error("Error:", error);
        userDetails.innerHTML = "Error getting users";
    }
}

