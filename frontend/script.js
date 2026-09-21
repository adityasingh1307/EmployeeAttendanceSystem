// ==================================================
// ROLE SELECTION
// ==================================================

function showEmployeeLogin() {

    document.getElementById("loginForm").style.display =
        "block";

    document.getElementById("adminLoginForm").style.display =
        "none";


    document.getElementById("employeeRoleBtn")
        .classList.add("active");

    document.getElementById("adminRoleBtn")
        .classList.remove("active");


    document.getElementById("message").textContent = "";

}


function showAdminLogin() {

    document.getElementById("loginForm").style.display =
        "none";

    document.getElementById("adminLoginForm").style.display =
        "block";


    document.getElementById("adminRoleBtn")
        .classList.add("active");

    document.getElementById("employeeRoleBtn")
        .classList.remove("active");


    document.getElementById("message").textContent = "";

}



// ==================================================
// EMPLOYEE LOGIN
// ==================================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const email =
                document.getElementById("email").value;

            const password =
                document.getElementById("password").value;

            const message =
                document.getElementById("message");


            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/login",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })

                        }
                    );


                const result =
                    await response.text();


                if (
                    result ===
                    "Login successful"
                ) {


                    // Get employee information

                    const employeeResponse =
                        await fetch(
                            "http://localhost:8080/api/employees"
                        );


                    const employees =
                        await employeeResponse.json();


                    const employee =
                        employees.find(
                            emp =>
                                emp.email === email
                        );


                    if (employee) {


                        localStorage.setItem(
                            "employeeId",
                            employee.id
                        );


                        localStorage.setItem(
                            "employeeName",
                            employee.name
                        );


                        window.location.href =
                            "employee.html";

                    }


                } else {

                    message.textContent =
                        result;

                    message.style.color =
                        "red";

                }


            } catch (error) {

                console.error(
                    "Error:",
                    error
                );


                message.textContent =
                    "Cannot connect to server";

                message.style.color =
                    "red";

            }

        }
    );

}



// ==================================================
// ADMIN LOGIN
// ==================================================

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document.getElementById(
                    "adminUsername"
                ).value;


            const password =
                document.getElementById(
                    "adminPassword"
                ).value;


            const message =
                document.getElementById(
                    "message"
                );


            // Basic project admin credentials

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );


                window.location.href =
                    "admin.html";


            } else {

                message.textContent =
                    "Invalid admin username or password.";

                message.style.color =
                    "red";

            }

        }
    );

}



// ==================================================
// MARK ATTENDANCE
// ==================================================

async function markAttendance() {

    const employeeId =
        localStorage.getItem(
            "employeeId"
        );


    const message =
        document.getElementById(
            "dashboardMessage"
        );


    if (!employeeId) {

        message.textContent =
            "Employee information not found. Please login again.";

        message.style.color =
            "red";

        return;

    }


    try {

        const response =
            await fetch(
                "http://localhost:8080/api/attendance",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        employeeId:
                            Number(employeeId),

                        status:
                            "Present"

                    })

                }
            );


        if (!response.ok) {
            throw new Error("Request failed");
        }


        const result =
            await response.json();


        console.log(
            "Attendance:",
            result
        );


        // Disable the button for the rest of the day

        lockMarkButton(result);


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        message.textContent =
            "Could not mark attendance.";

        message.style.color =
            "red";

    }

}



// ==================================================
// DISABLE MARK BUTTON ONCE MARKED TODAY
// ==================================================

function getTodayDate() {

    const now = new Date();

    const year = now.getFullYear();

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function lockMarkButton(record) {

    const button =
        document.querySelector(".punch-btn");

    const message =
        document.getElementById("dashboardMessage");

    if (!button) {
        return;
    }

    button.disabled = true;

    button.textContent = "Attendance Marked";

    message.textContent =
        "Attendance marked for today" +
        (record && record.status
            ? " (" + record.status + ")."
            : ".");

    message.style.color = "green";

}


function unlockMarkButton() {

    const button =
        document.querySelector(".punch-btn");

    if (!button || !button.disabled) {
        return;
    }

    button.disabled = false;

    button.textContent = "Mark Attendance";

    document.getElementById("dashboardMessage")
        .textContent = "";

}


async function checkTodayAttendance() {

    const employeeId =
        localStorage.getItem("employeeId");

    if (!employeeId) {
        return;
    }

    try {

        const response =
            await fetch(
                `http://localhost:8080/api/attendance/${employeeId}`
            );

        const records =
            await response.json();

        const todayRecord =
            Array.isArray(records)
                ? records.find(
                    record =>
                        record.date === getTodayDate()
                )
                : null;

        if (todayRecord) {
            lockMarkButton(todayRecord);
        } else {
            unlockMarkButton();
        }

    } catch (error) {

        console.error("Error:", error);

    }

}


// Employee dashboard only: check on load, then every minute
// (so the button unlocks by itself on the next day)

if (document.querySelector(".punch-btn")) {

    checkTodayAttendance();

    setInterval(checkTodayAttendance, 60000);

}



// ==================================================
// VIEW ATTENDANCE
// ==================================================

async function viewAttendance() {

    const employeeId =
        localStorage.getItem(
            "employeeId"
        );


    const tableBody =
        document.getElementById(
            "attendanceTableBody"
        );


    if (!employeeId) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="2">
                    Employee information not found.
                    Please login again.
                </td>
            </tr>
        `;

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/attendance/${employeeId}`
            );


        const attendance =
            await response.json();


        tableBody.innerHTML = "";


        if (
            !Array.isArray(attendance) ||
            attendance.length === 0
        ) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="2">
                        No attendance records found.
                    </td>
                </tr>
            `;

            return;

        }


        attendance.forEach(
            record => {

                const row =
                    document.createElement(
                        "tr"
                    );


               row.innerHTML = `
    <td>
        ${record.date}
    </td>

    <td>
        ${formatTime(record.time)}
    </td>

    <td>
        <span class="status ${
            record.status === "Present"
                ? "present"
                : "late"
        }">
            ${record.status}
        </span>
    </td>
`;

                tableBody.appendChild(
                    row
                );

            }
        );


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="3">
                    Could not load attendance.
                </td>
            </tr>
        `;

    }

}
function formatTime(time) {

    if (!time) {
        return "-";
    }

    const parts = time.split(":");

    const hour = Number(parts[0]);
    const minute = parts[1];
    const second = parts[2];

    const ampm = hour >= 12 ? "PM" : "AM";

    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minute}:${second} ${ampm}`;
}



// ==================================================
// EMPLOYEE WELCOME MESSAGE
// ==================================================

const welcomeMessage =
    document.getElementById(
        "welcomeMessage"
    );


if (welcomeMessage) {

    const employeeName =
        localStorage.getItem(
            "employeeName"
        );


    if (employeeName) {

        welcomeMessage.textContent =
            "Welcome, " +
            employeeName +
            "!";

    }

}



// ==================================================
// EMPLOYEE LOGOUT
// ==================================================

function logout() {

    localStorage.removeItem(
        "employeeId"
    );

    localStorage.removeItem(
        "employeeName"
    );


    window.location.href =
        "index.html";

}