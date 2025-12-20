export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;

  try {
    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
    // If parsing fails, treat it as if no user is logged in
    localStorage.removeItem("user");
  }

  if (user && user.accessToken) {
    // For Spring Boot back-end
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

