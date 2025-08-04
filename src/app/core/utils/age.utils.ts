export function calculateAgeInYears(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function formatAge(birthDate: Date): string {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} jours`;
  } else if (diffDays < 730) { // Less than 24 months (approx 2 years)
    const diffMonths = Math.floor(diffDays / 30.44);
    return `${diffMonths} mois`;
  } else {
    const diffYears = Math.floor(diffDays / 365.25);
    return `${diffYears} ans`;
  }
}

export function calculateAgeInMonths(birthDate: Date, referenceDate?: Date): number {
  const refDate = referenceDate || new Date();
  let age = (refDate.getFullYear() - birthDate.getFullYear()) * 12;
  age -= birthDate.getMonth();
  age += refDate.getMonth();
  return age <= 0 ? 0 : age;
}

export function formatShortDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
