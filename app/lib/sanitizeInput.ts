export function sanitizeAndValidateEmail(input: string) {
  // Trim whitespace and convert to lowercase
  const sanitizedEmail = input.trim().toLowerCase();
  
  // Basic validation
  if (!sanitizedEmail) return false;
  
  // Use regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitizedEmail);
}

export function sanitizeInput(input: string) {
  return input
    .trim() // Always trim first to remove whitespace
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>&"']/g, '')
    .replace(/\\/g, ""); // Remove backslashes
}

export function sanitizeEmail(email: string) {
  if (!email) return null;

  return email
    .trim() // Remove leading & trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w@.-]/g, ""); // Remove unwanted special characters
}