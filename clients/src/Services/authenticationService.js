const currentUserSubject = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUserSubject);

// authentication service
export const authenticationService = {
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
