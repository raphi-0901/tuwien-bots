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

  const reloadPage = async () => {
    await waitFor(PAUSE_BETWEEN_STEPS);
    location.reload();
  };

  const wantedGroups = ["1.Test"];
  const courseNumber = "192.134";
  const courseNumberFromURL = new URLSearchParams(location.search).get(
    "courseNr"
  );

  const groupRegistrationURL = "/education/course/examDateList.xhtml";
  const currentURL = window.location.href.slice(
    (location.protocol + "//" + location.host).length
  );

  // on first page
  if (
    currentURL.includes(groupRegistrationURL) &&
    courseNumberFromURL === courseNumber.replace(/\./g, "")
  ) {
    await waitFor(PAUSE_BETWEEN_STEPS);
    const groupWrappers = document.querySelectorAll(".groupWrapper");

    for (const wantedGroup of wantedGroups) {
      for (const groupWrapper of groupWrappers) {
        const toggler = groupWrapper.querySelector(".groupHeaderWrapper");
        const heading = groupWrapper
          .querySelector(
            ".groupHeaderWrapper .header_element.titleCol.titleColStudent.groupHeadertrigger > span"
          )
          ?.textContent.trim();

        if (!heading || heading !== wantedGroup) {
          continue;
        }

        toggler.click();
        toggler.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        const submitButton =
          groupWrapper.querySelector("[type=submit][value=Anmelden]") ||
          groupWrapper.querySelector("[type=submit][value=Voranmeldung]");
        if (!submitButton) {
          // only collaps if it is not the last group that gets checked
          if (wantedGroup !== wantedGroups[wantedGroups.length - 1]) {
            toggler.click();
          }
          console.info(`There is no space left in ${heading}.`);
          continue;
        }

        submitButton.focus();
        submitButton.click();
      }
    }
    await reloadPage();
  }

  // on second page
  const isOnSignUpPage = currentURL === groupRegistrationURL;
  if (isOnSignUpPage) {
    await waitFor(PAUSE_BETWEEN_STEPS);
    const signUpButton = document.querySelector(
      "input[type=submit][value=Anmelden]"
    );
    signUpButton.click();
    await reloadPage();
  }
})();
