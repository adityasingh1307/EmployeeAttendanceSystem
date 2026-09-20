// ==================================================
// LIVE CLOCK (display only)
// ==================================================

(function () {

    const clock = document.getElementById("liveClock");
    const dateLine = document.getElementById("liveDate");

    if (!clock) return;


    clock.innerHTML =
        '<span></span><span class="colon">:</span><span></span><span class="seconds"></span>';

    const parts = clock.querySelectorAll("span");
    const hours = parts[0];
    const minutes = parts[2];
    const seconds = parts[3];


    const pad = value => String(value).padStart(2, "0");


    function updateClock() {

        const now = new Date();

        hours.textContent = pad(now.getHours());
        minutes.textContent = pad(now.getMinutes());
        seconds.textContent = pad(now.getSeconds());

        if (dateLine) {

            dateLine.textContent = now.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });

        }

    }


    updateClock();

    setInterval(updateClock, 1000);

})();