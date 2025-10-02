let firstName = document.getElementById("firstname");
let lastName = document.getElementById("lastname");
let email = document.getElementById("email");
let submit = document.getElementById("submitButton");

submit.style.color = "red";

submit.addEventListener("click", async (event) => {
    event.preventDefault();

    let url = "https://usersapi.osinachi.me/users";

    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value
            })
        });

        let data = await res.json();
        alert("Uploaded");
        console.log(data)
    } catch (error) {
        console.error("Error:",error);
        alert("Error");
    }
});
