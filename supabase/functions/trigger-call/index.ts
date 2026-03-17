import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone } = await req.json();

    // Validate E.164
    if (!phone || !/^\+\d{10,15}$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number. Must be E.164 format." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert lead into database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("leads").insert({ phone });
    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Trigger VAPI call
    const vapiKey = Deno.env.get("VAPI_API_KEY");
    if (!vapiKey) {
      console.error("VAPI_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Call service not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const vapiResponse = await fetch("https://api.vapi.ai/call/phone", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vapiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: { number: phone },
        assistantId: "9a7fdfab-bda6-4d30-95e5-dbab28758917",
      }),
    });

    const vapiData = await vapiResponse.json();
    console.log("VAPI response:", JSON.stringify(vapiData));

    if (!vapiResponse.ok) {
      console.error(`VAPI API failed [${vapiResponse.status}]:`, JSON.stringify(vapiData));
      return new Response(
        JSON.stringify({ error: "Failed to initiate call.", details: vapiData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, callId: vapiData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
