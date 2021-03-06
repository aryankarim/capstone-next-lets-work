export function firebaseErrors(error) {
  switch (error) {
    case "Firebase: Error (auth/user-not-found).":
      return "Incorrect Email";
    case "Firebase: Error (auth/email-already-in-use).":
      return "Incorrect Email";
    case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
      return "Too many attempts, try again later.";
    case "Firebase: Error (auth/wrong-password).":
      return "Wrong password, try again.";
    case "Firebase: Error (auth/network-request-failed).":
      return "Check your internet connection and try again.";
    case "Firebase: Error (auth/popup-closed-by-user).":
      return "Google Sign In Aborted";
    case "Firebase: Error (auth/cancelled-popup-request).":
      return "Google Sign In Aborted";
    case "Firebase: Error (profile/profile-data-fetch-error).":
      return "Failed getting profile data from server.";
    default:
      return "Something went wrong.";
  }
}
