(async () => {
  const PAUSE_BETWEEN_STEPS = 3000;
  const waitFor = (milliseconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("waited");
        resolve();
      }, milliseconds);
    });
  };

  waitFor(PAUSE_BETWEEN_STEPS);
  const courseNumber = "186.832";
  const courseNumberFromURL = new URLSearchParams(location.search).get(
    "courseNr"
  );

  const courseRegistrationURL = "/education/course/courseRegistration.xhtml";
  const currentURL = window.location.href.slice(
    (location.protocol + "//" + location.host).length
  );

  const signUpButton =
    document.querySelector("input[type=submit][value=Anmelden]") ||
    document.querySelector("[type=submit][value=Voranmeldung]");

  // on first page
  if (
    currentURL.includes(courseRegistrationURL) &&
    courseNumberFromURL === courseNumber.replace(/\./g, "")
  ) {
    signUpButton.click();
    return;
  }

  // on second page
  const isOnSignUpPage = currentURL === courseRegistrationURL;
  if (isOnSignUpPage) {
    signUpButton.click();
    return;
  }

  waitFor(PAUSE_BETWEEN_STEPS);
  location.reload();
})();
