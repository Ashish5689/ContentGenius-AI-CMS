import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Create a Supabase client with cookies enabled
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
    const cookieStore = cookies();

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: "supabase-auth",
        storage: {
          getItem: (key) => {
            const cookie = cookieStore.get(key);
            return cookie?.value;
          },
          setItem: (key, value) => {
            // This is handled by Supabase's cookie handling
          },
          removeItem: (key) => {
            // This is handled by Supabase's cookie handling
          },
        },
      },
    });

    // Sign in with email and password
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

    // Return the user data
    const user = {
      id: data.user.id,
      email: data.user.email || "",
      name:
        data.user.user_metadata?.name || data.user.email?.split("@")[0] || "",
    };

    // Create a response with the user data
    const response = NextResponse.json({ user, success: true });

    // The cookies are automatically handled by Supabase
    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Invalid credentials" },
      { status: 401 },
    );
  }
}
