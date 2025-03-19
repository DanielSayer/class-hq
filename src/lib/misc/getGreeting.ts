export function getGreeting() {
  const time = new Date();
  const hour = time.getHours();

  if (hour < 12) {
    return "Good morning!";
  }

  if (hour < 18) {
    return "Good afternoon!";
  }

  return "Good evening!";
}
