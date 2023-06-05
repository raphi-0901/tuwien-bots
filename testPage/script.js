// run document.querySelectorAll(".groupWrapper") in console and put the desired number here
const WANTED_GROUP = 1;
const WANTED_DROPDOWN = 2;
const COURSE_NUMBER = "185.A92";
console.log(TIME_OF_REGISTRATION);
const TIME_OF_LOAD = new Date();
const RELOAD_TIMER_TO_KEEP_SESSION = 15;

const courseNumberFromURL = new URLSearchParams(location.search).get(
  "courseNr"
);
const currentURL = location.href.slice(
  (location.protocol + "//" + location.host).length
);

//first page
//make sure we are on the right page
if (courseNumberFromURL === COURSE_NUMBER.replace(/\./g, "")) {
  if (
    currentURL.includes("/education/course/groupList.xhtml") ||
    currentURL.includes("/education/course/courseRegistration.xhtml") ||
    currentURL.includes("/education/course/examDateList.xhtml")
  ) {
    if (new Date() > TIME_OF_REGISTRATION) {
      // Registrierung ist offen
      if (
        sessionStorage.getItem("alreadyReloaded") == 1 &&
        [...document.querySelectorAll(".groupWrapper")].length
      ) {
        // reset to 0, so it does not end in a loop after reloading
        sessionStorage.removeItem("alreadyReloaded");

        register();
      }
    } else {
      setInterval(checkTime, 100);
      setInterval(needToReload, 1000);
    }
  }
}

//second page
if (
  currentURL.endsWith("/education/course/groupList.xhtml") ||
  currentURL.endsWith("/education/course/courseRegistration.xhtml") ||
  currentURL.endsWith("/education/course/examDateList.xhtml")
) {
  if (sessionStorage.getItem("wantsToRegister") == 1) {
    if (WANTED_DROPDOWN !== -1) {
      const select = document.querySelector("select");
      if (select !== null) {
        const option = select.querySelector(
          `option:nth-child(${WANTED_DROPDOWN})`
        );
        select.value = option.value;
      }
    }

    const submitButton = document.querySelector("input");
    submitButton.click();
    sessionStorage.removeItem("wantsToRegister");
  }
}

function checkTime() {
  if (new Date() > TIME_OF_REGISTRATION) {
    sessionStorage.setItem("alreadyReloaded", 1);
    location.reload();
  } else {
    sessionStorage.setItem("alreadyReloaded", 0);
  }
}

function needToReload() {
  console.log(
    new Intl.RelativeTimeFormat("de-DE").format(
      Math.round((TIME_OF_REGISTRATION - new Date()) / 1000),
      "second"
    )
  );

  const timeToReload = new Date(TIME_OF_LOAD).setMinutes(
    TIME_OF_LOAD.getMinutes() + RELOAD_TIMER_TO_KEEP_SESSION
  );

  if (new Date() > timeToReload) {
    location.reload();
  }
}

function register() {
  const groups = [...document.querySelectorAll(".groupWrapper")];
  const wantedGroup = groups[WANTED_GROUP];

  if (!groups.length || !wantedGroup) {
    return;
  }

  const headerOfGroup = wantedGroup.querySelector(".groupHeaderWrapper");
  headerOfGroup.click();
  headerOfGroup.scrollIntoView();

  const buttonOfGroup = wantedGroup.querySelector("input");
  buttonOfGroup.focus();
  buttonOfGroup.scrollIntoView();
  buttonOfGroup.click();
  sessionStorage.setItem("wantsToRegister", 1);
}
