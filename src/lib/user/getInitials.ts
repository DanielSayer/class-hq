export const getInitials = (
  firstName: string | null,
  lastName: string | null,
) => {
  if (!firstName && !lastName) {
    return "HQ";
  }

  const firstInitial = firstName?.[0]?.toUpperCase();
  const lastInitial = lastName?.[0]?.toUpperCase();

  return `${firstInitial ?? ""}${lastInitial ?? ""}`;
};
