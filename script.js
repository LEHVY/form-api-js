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
const listAll = document.getElementById("listAll");

getButton.addEventListener("click", displayList);
async function displayList(event) {
    event.preventDefault();
    const url = "https://usersapi.osinachi.me/users";

    try {
        const res = await fetch(url);
        const data = await res.json();
        listAll.innerHTML = "";

        const ul = document.createElement("ul");

        data.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `firstname: ${user.first_name}, lastname: ${user.last_name}, email: ${user.email} `;

            // delete icon
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fa-solid fa-trash";
            deleteIcon.addEventListener("click", async () => {
                try {
                    await fetch(`${url}/${user.id}`, { method: "DELETE" });
                    li.remove();
                } catch (err) {
                    console.error("Error deleting user:", err);
                }
            });
            li.appendChild(deleteIcon);
            ul.appendChild(li);
        });

        listAll.appendChild(ul);

    } catch (error) {
        console.error("Error:", error);
        listAll.innerHTML = "Error getting users";
    }
}
