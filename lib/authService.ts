import { signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "./firebase"

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    // Store auth token in localStorage and cookies for persistence
    const token = await userCredential.user.getIdToken()
    localStorage.setItem("auth_token", token)

    // Also set a cookie for the middleware to read
    document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days

    return userCredential.user
  } catch (error: any) {
    console.error("Sign in error:", error)
    throw error
  }
}

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    // Clear both localStorage and cookie
    localStorage.removeItem("auth_token")
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"

    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Sign out error:", error)
    throw error
  }
}

// Get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    // Check if user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()

      if (user) {
        resolve(user)
      } else {
        // If no user from Firebase, check localStorage token
        const token = localStorage.getItem("auth_token")
        if (token) {
          // If token exists but no user, force refresh auth state
          auth.authStateReady().then(() => {
            resolve(auth.currentUser)
          })
        } else {
          resolve(null)
        }
      }
    })
  })
}

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  // In a real app, you would check against a list of admin emails or roles in Firestore
  // For simplicity, we'll just check if the user is authenticated
  return !!user
}
