// run document.querySelectorAll(".groupWrapper") in console and put the desired number here
// for LVA registration set to 0
const WANTED_GROUP = 12;
const COURSE_NUMBER = "280.239";
const TIME_OF_REGISTRATION = new Date("2025-03-10 11:07:20");
console.log(TIME_OF_REGISTRATION)
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
          sessionStorage.getItem("alreadyReloaded") == 1 && [...document.querySelectorAll(".groupWrapper")].length
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

function logHumanReadableRelativeTime() {
  const diffInMs = TIME_OF_REGISTRATION - new Date();
  const diffInSeconds = Math.round(diffInMs / 1000)
  const diffInMinutes = Math.round(diffInMs / (1000 * 60));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  let output = ''
  if (Math.abs(diffInSeconds) < 60 * 3) {
    output = new Intl.RelativeTimeFormat("de-DE").format(
        diffInSeconds,
        'second'
    )
  } else if (Math.abs(diffInSeconds) < 60 * 60) {
    output = new Intl.RelativeTimeFormat("de-DE").format(
        diffInMinutes,
        'minute'
    )
  } else {
    output = new Intl.RelativeTimeFormat("de-DE").format(
        diffInHours,
        'hour'
    )
  }

  console.log(output);
}

function needToReload() {
  logHumanReadableRelativeTime()
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
    console.error("Your desired group does not exist! - Change the WANTED_GROUP variable")
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
