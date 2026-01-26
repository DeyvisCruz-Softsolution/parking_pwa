import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "Datos incompletos" }),
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1️⃣ Crear usuario en Auth
    const { data: userData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !userData.user) {
      return new Response(
        JSON.stringify({ error: authError?.message }),
        { status: 400 }
      );
    }

    // 2️⃣ Insertar rol en tabla users
    const { error: dbError } = await supabaseAdmin
      .from("users")
      .insert({
        id: userData.user.id,
        email,
        role,
      });

    if (dbError) {
      return new Response(
        JSON.stringify({ error: dbError.message }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Error interno" }),
      { status: 500 }
    );
  }
});
