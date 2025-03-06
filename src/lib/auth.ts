import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
};

export const login = async (
  email: string,
  password: string,
): Promise<UserProfile> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase login error:", error);
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("User not found");
  }

  console.log("Supabase login successful:", data);

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "",
  };
};

export const signup = async (
  name: string,
  email: string,
  password: string,
): Promise<UserProfile> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Failed to create user");
  }

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: name || data.user.email?.split("@")[0] || "",
  };
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error getting session:", error);
    return null;
  }

  console.log("Current session data:", data);

  if (!data.session?.user) {
    console.log("No active session found");
    return null;
  }

  const user = data.session.user;
  console.log("Active user found:", user);

  return {
    id: user.id,
    email: user.email || "",
    name: user.user_metadata?.name || user.email?.split("@")[0] || "",
  };
};

export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
